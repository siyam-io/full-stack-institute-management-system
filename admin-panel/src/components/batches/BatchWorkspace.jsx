import React, { useState, useMemo, useEffect } from "react";
import { isSameDay } from "date-fns";
import { Calendar as CalendarIcon, BookOpen, ListChecks } from "lucide-react";

// Components
import ClassCalendar from "./ClassCalendar";
import DayAgendaPanel from "./DayAgendaPanel";
import ClassDetailsPanel from "./ClassDetailsPanel";
import BatchCurriculumList from "./BatchCurriculumList";

import CurriculumBuilderModal from "./CurriculumBuilderModal";
import QuickScheduleModal from "./QuickScheduleModal";

import useAuth from "../../store/useAuth";
import { PERMISSIONS } from "../../config/permissionConfig";

export default function BatchWorkspace({
  batch,
  allClasses,
  selectedDate,
  setSelectedDate,
  currentDate,
  setCurrentDate,
  deleteClass,
  autoSchedule,
  isAutoScheduling,
}) {
  const { hasPermission } = useAuth();
  const [activeTab, setActiveTab] = useState("calendar");
  const [selectedClass, setSelectedClass] = useState(null);
  const [schedulingClass, setSchedulingClass] = useState(null);

  const [modals, setModals] = useState({
    import: false,
    quick: false,
  });

  const canViewCalendar = hasPermission(PERMISSIONS.VIEW_BATCH_CALENDAR);
  const canViewCurriculum = hasPermission(PERMISSIONS.CURRICULUM_MATRIX);

  // 🚀 THE FIX: Sync local `selectedClass` state when React Query fetches fresh data
  useEffect(() => {
    if (selectedClass && allClasses?.length > 0) {
      const freshClassData = allClasses.find((c) => c._id === selectedClass._id);
      if (freshClassData) {
        setSelectedClass(freshClassData); // Automatically updates details & attendance panels!
      }
    }
  }, [allClasses]);

  useEffect(() => {
    if (activeTab === "calendar" && !canViewCalendar) {
      if (canViewCurriculum) setActiveTab("curriculum");
    }
  }, [canViewCalendar, canViewCurriculum]);

  const handleOpenClassDetails = (cls) => {
    if (cls.date_scheduled) {
      setSelectedDate(new Date(cls.date_scheduled));
      setCurrentDate(new Date(cls.date_scheduled));
    }
    setSelectedClass(cls);
  };

  const handleRescheduleTrigger = (cls) => {
    setSchedulingClass(cls);
    setModals((prev) => ({ ...prev, quick: true }));
  };

  const dayClasses = useMemo(() => {
    return allClasses.filter(
      (c) =>
        c.date_scheduled && isSameDay(new Date(c.date_scheduled), selectedDate),
    );
  }, [allClasses, selectedDate]);

  return (
    // 🚀 FIXED: Removed strict h-full for mobile, kept for lg screens
    <div className="flex flex-col lg:flex-row gap-6 lg:h-full">
      {/* 🚀 FIXED: Added min-h-[500px] for mobile so calendar doesn't collapse */}
      <div className="flex-1 flex flex-col min-w-0 bg-white/5 rounded-[2rem] border border-white/10 shadow-sm overflow-hidden min-h-[500px] lg:min-h-0">
        <div className="flex items-center gap-2 p-4 bg-white/5 border-b border-white/5 shrink-0 overflow-x-auto custom-scrollbar">
          {/* Tabs */}
          {canViewCalendar && (
            <button
              onClick={() => setActiveTab("calendar")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === "calendar" ? "bg-white/5 text-power-red shadow-sm border border-white/10" : "text-zinc-500 hover:text-zinc-200"}`}
            >
              <CalendarIcon size={14} /> Calendar
            </button>
          )}

          {canViewCurriculum && (
            <button
              onClick={() => setActiveTab("curriculum")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === "curriculum" ? "bg-white/5 text-power-red shadow-sm border border-white/10" : "text-zinc-500 hover:text-zinc-200"}`}
            >
              <BookOpen size={14} /> Curriculum Matrix
            </button>
          )}

        </div>

        <div className="flex-1 overflow-hidden relative p-4">
          {activeTab === "calendar" && canViewCalendar && (
            <ClassCalendar
              currentDate={currentDate}
              setCurrentDate={setCurrentDate}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              allClasses={allClasses}
            />
          )}
          {activeTab === "curriculum" && canViewCurriculum && (
            <BatchCurriculumList
              batch={batch}
              classes={allClasses}
              onSelectClass={handleOpenClassDetails}
              deleteClass={deleteClass}
              autoSchedule={autoSchedule}
              isAutoScheduling={isAutoScheduling}
              openImport={() => setModals({ ...modals, import: true })}
              onReschedule={handleRescheduleTrigger}
            />
          )}
        </div>
      </div>

      {/* 🚀 FIXED: Added lg:h-full to prevent overlapping on mobile */}
      <div className="w-full lg:w-[400px] flex flex-col gap-6 shrink-0 lg:h-full">
        <div className="flex-1 bg-white/5 rounded-[2rem] border border-white/10 shadow-sm overflow-hidden flex flex-col min-h-[300px]">
          <div className="p-5 bg-white/5 border-b border-white/5 flex items-center justify-between shrink-0">
            <h3 className="font-black text-zinc-100 uppercase tracking-widest text-[10px] flex items-center gap-2">
              <CalendarIcon size={14} className="text-power-red" /> Daily Agenda
            </h3>
            <span className="text-xs font-bold text-zinc-500">
              {selectedDate.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
          <div className="flex-1 overflow-y-auto p-4 custom-scrollbar bg-white/5">
            <DayAgendaPanel
              classes={dayClasses}
              selectedClass={selectedClass}
              onSelectClass={setSelectedClass}
              date={selectedDate}
            />
          </div>
        </div>

        <div className="shrink-0 bg-white/5 rounded-[2rem] border border-white/10 shadow-sm overflow-hidden min-h-[250px]">
          <div className="p-4 bg-white/5 border-b border-white/5 shrink-0">
            <h3 className="font-black text-zinc-100 uppercase tracking-widest text-[10px] flex items-center gap-2">
              <BookOpen size={14} className="text-power-red" /> Operations Desk
            </h3>
          </div>
          <div className="p-4">
            <ClassDetailsPanel
              cls={selectedClass}
            />
          </div>
        </div>
      </div>

      {modals.import && (
        <CurriculumBuilderModal
          batch={batch}
          onClose={() => setModals({ ...modals, import: false })}
        />
      )}
      {modals.quick && schedulingClass && (
        <QuickScheduleModal
          batchId={batch._id}
          classData={schedulingClass}
          onClose={() => setModals({ ...modals, quick: false })}
        />
      )}
      {modals.quick && schedulingClass && (
        <QuickScheduleModal
          batchId={batch._id}
          classData={schedulingClass}
          onClose={() => setModals({ ...modals, quick: false })}
        />
      )}
    </div>
  );
}