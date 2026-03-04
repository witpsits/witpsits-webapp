import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
} from "lucide-react";

const CreateContent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine initial content type from route or default to announcement
  const getInitialType = () => {
    if (location.pathname.includes("/news")) return "news";
    if (location.pathname.includes("/resource")) return "resource";
    return "announcement";
  };

  const [contentType, setContentType] = useState(getInitialType());
  const [formData, setFormData] = useState({
    title: "",
    category: "Events",
    body: "",
    linkUrl: "",
    file: null,
  });

  const handleClose = () => {
    navigate(-1); // Go back to previous page
  };

  const handleTypeChange = (type) => {
    setContentType(type);
    // Update category based on type
    if (type === "announcement") {
      setFormData({ ...formData, category: "Events" });
    } else if (type === "news") {
      setFormData({ ...formData, category: "Campus News" });
    } else if (type === "resource") {
      setFormData({ ...formData, category: "Study Guides" });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, file });
  };

  const handleSubmit = (isDraft = false) => {
    console.log("Submitting:", { ...formData, contentType, isDraft });
    // Add your submit logic here
    // navigate back after submission
    navigate(-1);
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
              <FilePlus className="text-[#5671FF] w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-white">
                Create New Content
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
          <div className="space-y-4">
            <label className="text-xs font-bold uppercase tracking-widest text-[#5671FF]/80 px-1">
              1. Select Content Type
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
            <div className="space-y-2">
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
              <div className="space-y-2">
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
                  File Attachment
                </label>
                <label className="border-2 border-dashed border-[#5671FF]/30 rounded-xl p-4 bg-[#5671FF]/5 hover:bg-[#5671FF]/10 transition-colors group cursor-pointer flex flex-col items-center justify-center gap-2">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="sr-only"
                    accept=".pdf,.zip,.docx"
                  />
                  <Upload className="text-[#5671FF] group-hover:scale-110 transition-transform w-5 h-5" />
                  <p className="text-xs text-slate-400">
                    <span className="font-bold text-[#5671FF]">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-[10px] text-slate-500 uppercase">
                    PDF, ZIP, DOCX (Max 25MB)
                  </p>
                  {formData.file && (
                    <p className="text-xs text-[#5671FF] font-bold mt-1">
                      {formData.file.name}
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
            <span>Content will be visible on the public website after publishing.</span>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => handleSubmit(true)}
              className="flex-1 md:flex-none px-8 py-3 rounded-xl border-2 border-[#5671FF]/50 text-[#5671FF] font-bold text-sm hover:bg-[#5671FF]/5 transition-all active:scale-95"
            >
              Save as Draft
            </button>
            <button
              onClick={() => handleSubmit(false)}
              className="flex-1 md:flex-none px-10 py-3 rounded-xl bg-[#5671FF] text-white font-bold text-sm shadow-lg shadow-[#5671FF]/30 hover:bg-[#5671FF]/90 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <Rocket className="w-4 h-4" />
              Publish Content
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