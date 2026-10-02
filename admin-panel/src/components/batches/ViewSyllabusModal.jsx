import React from "react";
import { X, Edit3, Trash2, Calendar, FileText } from "lucide-react";
import { format } from "date-fns";

export default function ViewSyllabusModal({ classes, onClose, onEdit, onDelete }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white/5 w-full max-w-4xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
          <div>
            <h3 className="text-2xl font-black text-zinc-100">Batch Curriculum</h3>
            <p className="text-sm text-zinc-500 font-bold uppercase tracking-tight">
              Total {classes.length} Classes Registered
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white rounded-full transition-all border border-transparent hover:border-white/10">
            <X size={24} className="text-zinc-500" />
          </button>
        </div>

        {/* Content - Table View */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          <table className="table-premium">
            <thead>
              <tr>
                <th>ID</th>
                <th>Topic & Details</th>
                <th>Type</th>
                <th>Scheduled Date</th>
                <th className="text-right pr-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((cls) => (
                <tr key={cls._id} className="bg-white/5 hover:bg-white/5 transition-colors group">
                  <td className="py-4 pl-4 rounded-l-2xl">
                    <span className="px-2 py-1 bg-[#EF233C] text-white text-[10px] font-black rounded uppercase">
                      {cls.class_number}
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="font-bold text-zinc-100 text-sm">{cls.topic}</div>
                    <div className="text-[10px] text-zinc-500 line-clamp-1">{cls.content_details?.join(", ")}</div>
                  </td>
                  <td className="py-4">
                    <span className="text-[10px] font-black text-power-red uppercase bg-power-red/10 px-2 py-1 rounded-md">
                      {cls.class_type}
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-zinc-500">
                      <Calendar size={14} className="text-zinc-400" />
                      {cls.date_scheduled ? format(new Date(cls.date_scheduled), "PPP") : "Not Scheduled"}
                    </div>
                  </td>
                  <td className="py-4 text-right pr-4 rounded-r-2xl">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => onEdit(cls)}
                        className="p-2 text-power-red hover:bg-power-red/10 rounded-xl transition-all"
                      >
                        <Edit3 size={18} />
                      </button>
                      <button 
                        onClick={() => onDelete(cls._id)}
                        className="p-2 text-red-500 hover:bg-red-100 rounded-xl transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {classes.length === 0 && (
            <div className="text-center py-20 opacity-30">
              <FileText size={48} className="mx-auto mb-2" />
              <p className="font-black uppercase text-sm tracking-widest">No classes found in syllabus</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}