import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import {
  X,
  FilePlus,
  Megaphone,
  Newspaper,
  BookOpen,
  Bold,
  Italic,
  List,
  Link as LinkIcon,
  Image,
  Upload,
  Rocket,
  Info,
  Loader2,
  Edit,
  Calendar
} from "lucide-react";
import { supabase } from "../../lib/supabaseClient";
import imageCompression from 'browser-image-compression';

const CreateContent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const isEditMode = !!id;
  
  // Determine initial content type from route or default to announcement
  const getInitialType = () => {
    if (location.pathname.includes("/news")) return "news";
    if (location.pathname.includes("/resource")) return "resource";
    return "announcement";
  };

  const [contentType, setContentType] = useState(getInitialType());
  const [formData, setFormData] = useState({
    title: "",
    category: contentType === "resource" ? "Study Guides" : contentType === "news" ? "Campus News" : "Events",
    body: "",
    linkUrl: "",
    file: null,
    existingImageUrl: null,
    eventDate: new Date().toISOString().slice(0, 16) // Default to now in YYYY-MM-DDTHH:MM format
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingData, setLoadingData] = useState(isEditMode);
  const [uploadStatus, setUploadStatus] = useState(null); // 'uploading', 'saving', 'success', 'error'

  useEffect(() => {
    if (isEditMode) {
      fetchExistingData();
    }
  }, [id]);

  const fetchExistingData = async () => {
    try {
      setLoadingData(true);
      // Try fetching from events first
      let { data, error } = await supabase.from('events').select('*').eq('id', id).single();
      
      if (data) {
        setFormData({
          title: data.title || "",
          category: data.category || (data.type === 'news' ? "Campus News" : "Events"),
          body: data.description || "",
          linkUrl: data.image_url || "",
          file: null,
          existingImageUrl: data.image_url,
          eventDate: data.event_date ? new Date(data.event_date).toISOString().slice(0, 16) : new Date().toISOString().slice(0, 16)
        });
        
        // Use the 'type' column definitively if available
        if (data.type) setContentType(data.type);
        else if (data.description && data.description.length > 200) setContentType("news");
        else setContentType("announcement");
      } else {
        // Try prospectuses
        const { data: resData } = await supabase.from('prospectuses').select('*').eq('id', id).single();
        if (resData) {
          setContentType("resource");
          setFormData({
            title: resData.name || "",
            category: resData.category || "Study Guides",
            body: "",
            linkUrl: resData.file_url || "",
            file: null,
            existingImageUrl: resData.file_url
          });
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoadingData(false);
    }
  };

  const handleClose = () => {
    navigate(-1); // Go back to previous page
  };

  const handleTypeChange = (type) => {
    if (isEditMode) return; // Prevent type change in edit mode
    setContentType(type);
    // Update category based on type
    let category = "Events";
    if (type === "news") category = "Campus News";
    else if (type === "resource") category = "Study Guides";
    
    setFormData({ ...formData, category });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, file });
  };

  const handleSubmit = async (isDraft = false) => {
    if (!formData.title) {
        alert("Please enter a title.");
        return;
    }

    setIsSubmitting(true);
    setUploadStatus('uploading');
    
    try {
      let fileUrl = formData.linkUrl || formData.existingImageUrl;
      
      // 1. Upload file if exists
      if (formData.file) {
        setUploadStatus('compressing');
        let fileToUpload = formData.file;
        
        // Compress if it's an image
        if (fileToUpload.type.startsWith('image/')) {
          const options = {
            maxSizeMB: 1, // High quality limit
            maxWidthOrHeight: 2560, // 2K resolution for extra sharpness
            useWebWorker: true,
            initialQuality: 0.9 // High starting point for compression
          };
          fileToUpload = await imageCompression(formData.file, options);
        }

        setUploadStatus('uploading');
        const fileExt = fileToUpload.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const folder = contentType === "resource" ? "prospectuses" : "events";
        const filePath = `${folder}/${fileName}`;
        
        const { error: uploadError } = await supabase.storage
          .from('public-assets')
          .upload(filePath, fileToUpload);
          
        if (uploadError) throw uploadError;
        
        const { data: { publicUrl } } = supabase.storage
          .from('public-assets')
          .getPublicUrl(filePath);
          
        fileUrl = publicUrl;
      }

      setUploadStatus('saving');

      // 2. Insert or Update database
      const updateData = contentType === "resource" ? {
          name: formData.title,
          category: formData.category,
          format: formData.file ? formData.file.name.split('.').pop().toUpperCase() : (formData.existingImageUrl ? 'DOC' : 'URL'),
          file_url: fileUrl
      } : {
          title: formData.title,
          description: formData.body,
          image_url: fileUrl,
          is_published: !isDraft,
          event_date: formData.eventDate ? new Date(formData.eventDate).toISOString() : new Date().toISOString(),
          type: contentType // announcement or news
      };

      if (isEditMode) {
        const table = contentType === "resource" ? 'prospectuses' : 'events';
        const { error: dbError } = await supabase.from(table).update(updateData).eq('id', id);
        if (dbError) throw dbError;
      } else {
        const { error: dbError } = await supabase.from(contentType === "resource" ? 'prospectuses' : 'events').insert([updateData]);
        if (dbError) throw dbError;
      }

      setUploadStatus('success');
      setTimeout(() => navigate(-1), 1500);

    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to save content: " + error.message);
      setUploadStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCategoryOptions = () => {
    switch (contentType) {
      case "announcement":
        return ["Events", "Organization", "Academic", "Finance"];
      case "news":
        return ["Campus News", "Tech Industry", "Student Life", "Awards"];
      case "resource":
        return ["Study Guides", "Reviewers", "Project Templates", "Documentation"];
      default:
        return ["Events"];
    }
  };

  const contentTypes = [
    {
      id: "announcement",
      label: "Announcement",
      icon: Megaphone,
      description: "Important updates and notices",
    },
    {
      id: "news",
      label: "News Article",
      icon: Newspaper,
      description: "Latest news and stories",
    },
    {
      id: "resource",
      label: "Academic Resource",
      icon: BookOpen,
      description: "Study materials and guides",
    },
  ];

  if (loadingData) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0E1528] backdrop-blur-md">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-[#5671FF] animate-spin" />
          <p className="text-slate-400 font-medium">Fetching content data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-[#0E1528]/85 backdrop-blur-sm font-['Space_Grotesk',sans-serif]">
      <div className="bg-[#0E1528] w-full max-w-4xl max-h-[90vh] rounded-[2rem] border border-[#5671FF]/20 shadow-2xl shadow-[#5671FF]/20 flex flex-col overflow-hidden relative">
        
        {/* Decorative Circuit Background Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(86, 113, 255, 0.15) 1px, transparent 0)',
          backgroundSize: '24px 24px'
        }}></div>

        {/* Header */}
        <div className="px-8 py-6 border-b border-[#5671FF]/10 flex items-center justify-between bg-gradient-to-r from-[#5671FF]/5 to-transparent relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#5671FF]/10 flex items-center justify-center border border-[#5671FF]/20">
              {isEditMode ? <Edit className="text-[#5671FF] w-6 h-6" /> : <FilePlus className="text-[#5671FF] w-6 h-6" />}
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-white">
                {isEditMode ? "Edit Existing Content" : "Create New Content"}
              </h2>
              <p className="text-xs text-slate-400 font-medium uppercase tracking-widest">
                Administrator Management Console
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="w-10 h-10 rounded-full hover:bg-white/5 flex items-center justify-center transition-colors text-slate-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 relative z-10">
          {/* Content Type Selection */}
          <div className={`space-y-4 ${isEditMode ? 'opacity-50 pointer-events-none' : ''}`}>
            <label className="text-xs font-bold uppercase tracking-widest text-[#5671FF]/80 px-1">
              1. {isEditMode ? "Content Type (Locked)" : "Select Content Type"}
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {contentTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <label key={type.id} className="relative cursor-pointer group">
                    <input
                      type="radio"
                      name="type"
                      checked={contentType === type.id}
                      onChange={() => handleTypeChange(type.id)}
                      className="peer sr-only"
                    />
                    <div className="flex items-center gap-3 p-4 rounded-2xl border-2 border-white/5 bg-white/5 peer-checked:border-[#5671FF] peer-checked:bg-[#5671FF]/5 transition-all hover:border-[#5671FF]/50">
                      <Icon className="text-slate-400 group-hover:text-[#5671FF] transition-colors peer-checked:text-[#5671FF] w-5 h-5" />
                      <span className="font-bold text-sm text-white">
                        {type.label}
                      </span>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Title and Category */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-[#5671FF]/80 px-1">
                  Content Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full bg-white/5 border border-[#5671FF]/20 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#5671FF]/50 focus:border-[#5671FF] outline-none text-white transition-all placeholder:text-slate-500"
                  placeholder="Enter a descriptive title..."
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-[#5671FF]/80 px-1">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full bg-white/5 border border-[#5671FF]/20 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#5671FF]/50 focus:border-[#5671FF] outline-none text-white transition-all appearance-none cursor-pointer"
                >
                  {getCategoryOptions().map((category) => (
                    <option key={category} value={category} className="bg-[#0E1528]">
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Content Body */}
            <div className={`space-y-2 ${contentType === 'resource' ? 'hidden' : ''}`}>
              <label className="text-xs font-bold uppercase tracking-widest text-[#5671FF]/80 px-1">
                Content Body
              </label>
              <div className="border border-[#5671FF]/20 rounded-xl overflow-hidden">
                <div className="bg-white/5 px-4 py-2 border-b border-[#5671FF]/10 flex items-center gap-4">
                  <button className="text-slate-400 hover:text-[#5671FF] transition-colors">
                    <Bold className="w-4 h-4" />
                  </button>
                  <button className="text-slate-400 hover:text-[#5671FF] transition-colors">
                    <Italic className="w-4 h-4" />
                  </button>
                  <button className="text-slate-400 hover:text-[#5671FF] transition-colors">
                    <List className="w-4 h-4" />
                  </button>
                  <button className="text-slate-400 hover:text-[#5671FF] transition-colors">
                    <LinkIcon className="w-4 h-4" />
                  </button>
                  <button className="text-slate-400 hover:text-[#5671FF] transition-colors">
                    <Image className="w-4 h-4" />
                  </button>
                </div>
                <textarea
                  name="body"
                  value={formData.body}
                  onChange={handleInputChange}
                  className="w-full bg-transparent border-none px-4 py-4 text-sm focus:ring-0 outline-none text-white resize-none placeholder:text-slate-500"
                  placeholder="Write your content here..."
                  rows="6"
                ></textarea>
              </div>
            </div>

            {/* Link URL and File Attachment */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#5671FF]/5">
              <div className={`space-y-2 ${contentType !== 'announcement' ? 'hidden' : ''}`}>
                <label className="text-xs font-bold uppercase tracking-widest text-[#5671FF]/80 px-1">
                  Event Date & Time
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input
                    type="datetime-local"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleInputChange}
                    className="w-full bg-white/5 border border-[#5671FF]/20 rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-[#5671FF]/50 focus:border-[#5671FF] outline-none text-white transition-all [color-scheme:dark]"
                  />
                </div>
              </div>
              <div className={`space-y-2 ${contentType === 'announcement' ? 'hidden' : ''}`}>
                <label className="text-xs font-bold uppercase tracking-widest text-[#5671FF]/80 px-1">
                  Link URL (Optional)
                </label>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input
                    type="url"
                    name="linkUrl"
                    value={formData.linkUrl}
                    onChange={handleInputChange}
                    className="w-full bg-white/5 border border-[#5671FF]/20 rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-[#5671FF]/50 focus:border-[#5671FF] outline-none text-white transition-all placeholder:text-slate-500"
                    placeholder="https://drive.google.com/..."
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-[#5671FF]/80 px-1">
                  File Attachment {isEditMode && "(Optional replacement)"}
                </label>
                <label className="border-2 border-dashed border-[#5671FF]/30 rounded-xl p-4 bg-[#5671FF]/5 hover:bg-[#5671FF]/10 transition-colors group cursor-pointer flex flex-col items-center justify-center gap-2">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="sr-only"
                    accept=".pdf,.zip,.docx,.jpg,.jpeg,.png"
                  />
                  <Upload className="text-[#5671FF] group-hover:scale-110 transition-transform w-5 h-5" />
                  <p className="text-xs text-slate-400">
                    <span className="font-bold text-[#5671FF]">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-[10px] text-slate-500 uppercase">
                    PDF, ZIP, DOCX, Images (Max 25MB)
                  </p>
                  {formData.file && (
                    <p className="text-xs text-[#5671FF] font-bold mt-1">
                      New: {formData.file.name}
                    </p>
                  )}
                  {isEditMode && formData.existingImageUrl && !formData.file && (
                    <p className="text-[10px] text-slate-500 mt-1 truncate max-w-xs">
                      Current: {formData.existingImageUrl.split('/').pop()}
                    </p>
                  )}
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-6 border-t border-[#5671FF]/10 bg-white/5 flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-2 text-slate-500 text-xs">
            <Info className="w-4 h-4" />
            <span>Updates will take effect immediately upon saving.</span>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => handleSubmit(true)}
              disabled={isSubmitting}
              className="flex-1 md:flex-none px-8 py-3 rounded-xl border-2 border-[#5671FF]/50 text-[#5671FF] font-bold text-sm hover:bg-[#5671FF]/5 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              {isEditMode ? "Save as Private" : "Save as Draft"}
            </button>
            <button
              onClick={() => handleSubmit(false)}
              disabled={isSubmitting}
              className="flex-1 md:flex-none px-10 py-3 rounded-xl bg-[#5671FF] text-white font-bold text-sm shadow-lg shadow-[#5671FF]/30 hover:bg-[#5671FF]/90 transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>
                    {uploadStatus === 'compressing' ? 'Compressing...' : 
                     uploadStatus === 'uploading' ? 'Uploading...' : 
                     'Saving...'}
                  </span>
                </>
              ) : (
                <>
                  <Rocket className="w-4 h-4" />
                  <span>{isEditMode ? "Update Changes" : "Publish Content"}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Decorative Corner Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 border-r-2 border-t-2 border-[#5671FF]/10 rounded-tr-[2rem] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 border-[#5671FF]/10 rounded-bl-[2rem] pointer-events-none"></div>
      </div>
    </div>
  );
};

export default CreateContent;