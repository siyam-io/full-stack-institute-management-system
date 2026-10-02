import React, { useState, useEffect } from "react";
import { X, CalendarDays, CheckCircle2 } from "lucide-react";
import { useScheduleClass } from "../../hooks/useClasses";

export default function QuickScheduleModal({ batchId, classData, onClose }) {
  const [selectedDate, setSelectedDate] = useState("");
  const { mutate: scheduleClass, isPending } = useScheduleClass(batchId);

  useEffect(() => {
    if (classData?.date_scheduled) {
      const d = new Date(classData.date_scheduled);
      if (!isNaN(d.getTime())) setSelectedDate(d.toISOString().split("T")[0]);
    }
  }, [classData]);

  const handleSchedule = () => {
    if (!selectedDate) return;
    scheduleClass(
      { classId: classData._id, date_scheduled: new Date(selectedDate).toISOString() },
      { onSuccess: onClose }
    );
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white/5 w-full max-w-sm rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/20">
        <div className="p-5 border-b border-white/5 flex justify-between items-center bg-white/5">
          <div>
            <h3 className="text-lg font-black text-zinc-100">Assign Date</h3>
            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Class {classData?.class_number}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-rose-50 text-zinc-500 hover:text-rose-500 rounded-xl transition-all"><X size={20} /></button>
        </div>

        <div className="p-6 space-y-5">
          <div className="p-3 bg-power-red/10 rounded-2xl border border-power-red/30">
            <p className="text-sm font-bold text-zinc-200 line-clamp-1">{classData?.topic}</p>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Select Schedule Date</label>
            <div className="relative">
              <CalendarDays className="absolute left-4 top-1/2 -translate-y-1/2 text-power-red" size={18} />
              <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="w-full pl-12 pr-4 py-4 bg-white/5 border-2 border-white/5 rounded-2xl text-sm font-bold text-zinc-200 outline-none focus:border-power-red/30 transition-all" />
            </div>
          </div>
          <button onClick={handleSchedule} disabled={isPending || !selectedDate} className="w-full py-4 bg-slate-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl hover:bg-[#C8102E] transition-all flex items-center justify-center gap-2 disabled:opacity-50">
            {isPending ? "Updating..." : <><CheckCircle2 size={18} /> Update Schedule</>}
          </button>
        </div>
      </div>
    </div>
  );
}