import React, { useMemo } from "react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, startOfToday, isValid } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ClassCalendar({ currentDate, setCurrentDate, selectedDate, setSelectedDate, allClasses = [] }) {
  
  const safeCurrentDate = isValid(new Date(currentDate)) ? new Date(currentDate) : new Date();
  const safeSelectedDate = isValid(new Date(selectedDate)) ? new Date(selectedDate) : new Date();
  const today = startOfToday();

  const eventsMap = useMemo(() => {
    const map = {};
    if (!Array.isArray(allClasses)) return map;
    allClasses.forEach(cls => {
      if (cls.date_scheduled && isValid(new Date(cls.date_scheduled))) {
        const dateKey = format(new Date(cls.date_scheduled), "yyyy-MM-dd");
        if (!map[dateKey]) map[dateKey] = [];
        map[dateKey].push(cls);
      }
    });
    return map;
  }, [allClasses]);

  const days = useMemo(() => {
    const start = startOfWeek(startOfMonth(safeCurrentDate));
    const end = endOfWeek(endOfMonth(safeCurrentDate));
    return eachDayOfInterval({ start, end });
  }, [safeCurrentDate]);

  return (
    <div className="flex flex-col h-full bg-white/5 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 px-2 shrink-0">
        <h2 className="text-xl font-black text-zinc-100 uppercase tracking-tighter">{format(safeCurrentDate, "MMMM yyyy")}</h2>
        <div className="flex items-center gap-2">
          {!isSameMonth(safeCurrentDate, today) && (
            <button onClick={() => { setCurrentDate(today); setSelectedDate(today); }} className="px-3 py-1 bg-white/5 text-zinc-500 text-[10px] font-black rounded-lg hover:bg-power-red/10 hover:text-power-red transition-colors uppercase tracking-widest">Today</button>
          )}
          <div className="flex gap-1 bg-white/5 border border-white/10 rounded-lg p-1">
            <button onClick={() => setCurrentDate(subMonths(safeCurrentDate, 1))} className="p-1 hover:bg-white rounded"><ChevronLeft size={16}/></button>
            <button onClick={() => setCurrentDate(addMonths(safeCurrentDate, 1))} className="p-1 hover:bg-white rounded"><ChevronRight size={16}/></button>
          </div>
        </div>
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 mb-2 shrink-0 bg-white/5 rounded-xl border border-white/5">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
          <div key={d} className="text-center text-[10px] font-black text-zinc-500 uppercase tracking-widest py-2.5">{d}</div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1.5 flex-1 min-h-0 overflow-hidden">
        {days.map((date, i) => {
          const dateKey = format(date, "yyyy-MM-dd");
          const dayEvents = eventsMap[dateKey] || [];
          const isSelected = isSameDay(date, safeSelectedDate);
          const isCurrentMonth = isSameMonth(date, safeCurrentDate);
          const isToday = isSameDay(date, today);

          return (
            <div 
              key={i} onClick={() => isCurrentMonth && setSelectedDate(date)}
              className={`p-2 border-2 rounded-xl cursor-pointer transition-all flex flex-col items-start gap-1.5 relative overflow-hidden group min-h-[70px]
                ${!isCurrentMonth ? 'opacity-20 pointer-events-none bg-white/5 border-transparent' : 'bg-white/5 hover:border-power-red/30'}
                ${isSelected ? 'border-power-red/30 shadow-md scale-[1.02] z-10' : 'border-white/5'}
                ${isToday && !isSelected ? 'bg-power-red/10 border-power-red/30' : ''}
              `}
            >
              <span className={`text-xs font-black w-6 h-6 flex items-center justify-center rounded-md ${isSelected ? 'bg-power-red text-white' : isToday ? 'bg-slate-800 text-white' : 'text-zinc-500'}`}>
                {format(date, "d")}
              </span>
              
              <div className="flex flex-col gap-1 w-full overflow-y-auto no-scrollbar">
                {dayEvents.map((event, idx) => (
                  <div key={idx} className={`px-1.5 py-1 rounded text-[8px] font-bold truncate border ${event.is_completed ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : isSelected ? 'bg-power-red text-white border-transparent' : 'bg-white/5 text-zinc-500 border-white/10 group-hover:border-power-red/30'}`}>
                    {event.topic || `Class ${event.class_number}`}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}