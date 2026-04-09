import React from 'react';
import curriculumPdf from '../../data/Revised-Curriculum-Effective-2023-2024-Descriptive-Title-1.pdf';

const documents = [
    {
        name: 'Revised Curriculum 2023-2024',
        category: 'Major Program',
        catBg: 'bg-[#5671FF]/10 text-[#5671FF] border border-[#5671FF]/20',
        format: 'PDF',
        url: curriculumPdf,
    },
];

const ProspectusTable = () => {
    return (
        <div className="bg-[#1a2238] rounded-xl border border-[#5671FF]/20 overflow-hidden">
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
                                key={index}
                                className="hover:bg-[#5671FF]/5 transition-colors"
                            >
                                <td className="px-6 py-5">
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-[#5671FF]">
                                            picture_as_pdf
                                        </span>
                                        <span className="text-slate-100 font-medium">
                                            {doc.name}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-5">
                                    <span
                                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${doc.catBg}`}
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
                                            href={doc.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <span className="material-symbols-outlined">
                                                visibility
                                            </span>
                                        </a>
                                        <a
                                            className="flex items-center gap-2 px-4 py-2 bg-[#5671FF] text-white text-xs font-bold rounded-lg hover:bg-[#5671FF]/90 transition-all shadow-md shadow-[#5671FF]/10"
                                            href={doc.url}
                                            download={`${doc.name}.pdf`}
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
        </div>
    );
};

export default ProspectusTable;
