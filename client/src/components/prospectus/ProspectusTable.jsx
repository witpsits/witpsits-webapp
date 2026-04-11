import React from 'react';

const ProspectusTable = ({ documents = [], loading = false, onDownload }) => {
    return (
        <div className="bg-[#1a2238] rounded-2xl border border-[#5671FF]/10 overflow-hidden min-h-[200px] shadow-xl">
             {loading ? (
                <div className="flex flex-col justify-center items-center h-full py-24 gap-4">
                    <div className="w-10 h-10 rounded-full border-4 border-[#5671FF]/10 border-t-[#5671FF] animate-spin"></div>
                    <p className="text-xs font-bold text-[#5671FF] uppercase tracking-widest animate-pulse">Syncing Database...</p>
                </div>
            ) : documents.length === 0 ? (
                <div className="text-center py-20 bg-white/5">
                    <span className="material-symbols-outlined text-6xl text-[#5671FF]/20 mb-4 block">folder_open</span>
                    <h3 className="text-xl font-black text-white">No Resources Found</h3>
                    <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto">The centralized curriculum and department resources will be populated shortly.</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/5">
                                <th className="px-8 py-5 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                                    Document Name
                                </th>
                                <th className="px-8 py-5 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                                    Category
                                </th>
                                <th className="px-8 py-5 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                                    Format
                                </th>
                                <th className="px-8 py-5 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] text-right">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#5671FF]/5">
                            {documents.map((doc, index) => (
                                <tr
                                    key={doc.id || index}
                                    className="hover:bg-[#5671FF]/5 transition-all duration-300 group"
                                >
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-colors ${doc.format === 'PDF' ? 'bg-red-500/10 border-red-500/20 text-red-500' : 'bg-[#5671FF]/10 border-[#5671FF]/20 text-[#5671FF]'}`}>
                                                <span className="material-symbols-outlined text-xl">
                                                    {doc.format === 'PDF' ? 'picture_as_pdf' : doc.format === 'IMAGE' ? 'image' : 'description'}
                                                </span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-white font-bold text-base group-hover:text-[#5671FF] transition-colors">
                                                    {doc.name}
                                                </span>
                                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                                                    Uploaded {new Date(doc.created_at).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span
                                            className="inline-flex items-center px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider bg-white/5 text-slate-400 border border-white/10 group-hover:border-[#5671FF]/30 group-hover:text-[#5671FF] transition-all"
                                        >
                                            {doc.category}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50"></div>
                                            <span className="text-slate-400 font-bold text-xs">
                                                {doc.format}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex justify-end gap-3 items-center">
                                            <a
                                                className="p-2.5 bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-all"
                                                title="View Transmision"
                                                href={doc.file_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <span className="material-symbols-outlined text-lg">
                                                    visibility
                                                </span>
                                            </a>
                                            <a
                                                className="flex items-center gap-2 px-5 py-2.5 bg-[#5671FF] text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-[#5671FF]/90 transition-all shadow-lg shadow-[#5671FF]/10 active:scale-95"
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
