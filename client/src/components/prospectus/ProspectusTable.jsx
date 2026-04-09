import React, { useEffect, useState } from 'react';
import { supabase } from "../../lib/supabaseClient";

const ProspectusTable = ({ onDownload }) => {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const { data, error } = await supabase
                    .from('prospectuses')
                    .select('*')
                    .order('created_at', { ascending: false });
                
                if (error) throw error;
                setDocuments(data || []);
            } catch (error) {
                console.error("Error fetching prospectuses:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDocuments();
    }, []);

    return (
        <div className="bg-[#1a2238] rounded-xl border border-[#5671FF]/20 overflow-hidden min-h-[200px]">
             {loading ? (
                <div className="flex justify-center items-center h-full py-20">
                    <div className="w-8 h-8 rounded-full border-4 border-[#5671FF]/30 border-t-[#5671FF] animate-spin"></div>
                </div>
            ) : documents.length === 0 ? (
                <div className="text-center py-16">
                    <span className="material-symbols-outlined text-5xl text-[#5671FF]/30 mb-4 block">folder_open</span>
                    <h3 className="text-lg font-bold text-slate-300">No Documents Uploaded</h3>
                    <p className="text-sm text-slate-500 mt-1">Academics will populate this area shortly.</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#5671FF]/10">
                                <th className="px-6 py-4 text-slate-100 text-sm font-bold uppercase tracking-wider">
                                    Document Name
                                </th>
                                <th className="px-6 py-4 text-slate-100 text-sm font-bold uppercase tracking-wider">
                                    Category
                                </th>
                                <th className="px-6 py-4 text-slate-100 text-sm font-bold uppercase tracking-wider">
                                    Format
                                </th>
                                <th className="px-6 py-4 text-slate-100 text-sm font-bold uppercase tracking-wider text-right">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#5671FF]/20">
                            {documents.map((doc, index) => (
                                <tr
                                    key={doc.id || index}
                                    className="hover:bg-[#5671FF]/5 transition-colors"
                                >
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-3">
                                            <span className={`material-symbols-outlined ${doc.format === 'PDF' ? 'text-red-500' : 'text-[#5671FF]'}`}>
                                                {doc.format === 'PDF' ? 'picture_as_pdf' : doc.format === 'IMAGE' ? 'image' : 'description'}
                                            </span>
                                            <span className="text-slate-100 font-medium">
                                                {doc.name}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span
                                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-[#5671FF]/10 text-[#5671FF] border border-[#5671FF]/20"
                                        >
                                            {doc.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 text-slate-400 font-mono text-sm">
                                        {doc.format}
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex justify-end gap-3 items-center">
                                            <a
                                                className="p-2 text-slate-400 hover:text-[#5671FF] transition-colors flex items-center"
                                                title="View"
                                                href={doc.file_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <span className="material-symbols-outlined">
                                                    visibility
                                                </span>
                                            </a>
                                            <a
                                                className="flex items-center gap-2 px-4 py-2 bg-[#5671FF] text-white text-xs font-bold rounded-lg hover:bg-[#5671FF]/90 transition-all shadow-md shadow-[#5671FF]/10 cursor-pointer"
                                                href={doc.file_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={() => onDownload && onDownload()}
                                            >
                                                <span className="material-symbols-outlined text-sm">
                                                    download
                                                </span>
                                                Download
                                            </a>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ProspectusTable;
