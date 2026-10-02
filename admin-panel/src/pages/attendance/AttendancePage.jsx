import React, { useState, useEffect } from "react";
import { 
  CalendarCheck, QrCode, Save, Users, CheckCircle, XCircle, 
  Clock, AlertCircle, RefreshCw, Sparkles, Filter 
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useBatches } from "../../hooks/useBatches";
import { getBatchAttendanceAPI, saveBatchAttendanceAPI } from "../../api/attendance.api";
import QRScannerModal from "../../components/attendance/QRScannerModal";
import Avatar from "../../components/common/Avatar";

export default function AttendancePage() {
  const queryClient = useQueryClient();
  const [selectedBatchId, setSelectedBatchId] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [localRecords, setLocalRecords] = useState({});

  // 1. Fetch available batches
  const { data: batchesData, isLoading: isBatchesLoading } = useBatches({});
  const batches = batchesData?.data || batchesData || [];

  // Default to first batch if none selected
  useEffect(() => {
    if (!selectedBatchId && batches.length > 0) {
      setSelectedBatchId(batches[0]._id || batches[0].id);
    }
  }, [batches, selectedBatchId]);

  // 2. Fetch attendance for selected batch & date
  const { 
    data: attendanceData, 
    isLoading: isAttendanceLoading, 
    refetch: refetchAttendance 
  } = useQuery({
    queryKey: ["batch-attendance", selectedBatchId, selectedDate],
    queryFn: () => getBatchAttendanceAPI(selectedBatchId, selectedDate),
    enabled: Boolean(selectedBatchId),
  });

  // Sync server data to local editable state
  useEffect(() => {
    if (attendanceData?.students) {
      const stateMap = {};
      attendanceData.students.forEach((s) => {
        stateMap[s.id] = {
          status: s.attendance_status === "unmarked" ? "present" : s.attendance_status,
          remarks: s.attendance_remarks || "",
        };
      });
      setLocalRecords(stateMap);
    }
  }, [attendanceData]);

  // 3. Save attendance mutation
  const saveMutation = useMutation({
    mutationFn: (payload) => saveBatchAttendanceAPI(payload),
    onSuccess: () => {
      toast.success("Attendance saved successfully!");
      queryClient.invalidateQueries(["batch-attendance", selectedBatchId, selectedDate]);
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to save attendance");
    },
  });

  const handleStatusChange = (studentId, status) => {
    setLocalRecords((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        status,
      },
    }));
  };

  const handleRemarksChange = (studentId, remarks) => {
    setLocalRecords((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        remarks,
      },
    }));
  };

  const handleMarkAll = (status) => {
    if (!attendanceData?.students) return;
    setLocalRecords((prev) => {
      const updated = { ...prev };
      attendanceData.students.forEach((s) => {
        updated[s.id] = {
          ...updated[s.id],
          status,
        };
      });
      return updated;
    });
    toast.success(`Marked all students as ${status.toUpperCase()}`);
  };

  const handleSaveAttendance = () => {
    if (!selectedBatchId) return toast.error("Please select a batch");
    if (!attendanceData?.students || attendanceData.students.length === 0) {
      return toast.error("No students to mark in this batch");
    }

    const records = Object.entries(localRecords).map(([studentId, data]) => ({
      studentId,
      status: data.status,
      remarks: data.remarks,
    }));

    saveMutation.mutate({
      batchId: selectedBatchId,
      date: selectedDate,
      records,
    });
  };

  const students = attendanceData?.students || [];
  const stats = attendanceData?.stats || {
    total: students.length,
    presentCount: 0,
    absentCount: 0,
    lateCount: 0,
    attendancePercentage: 0,
  };

  // Live count based on local unsaved/saved records
  const localPresent = Object.values(localRecords).filter((r) => r.status === "present").length;
  const localAbsent = Object.values(localRecords).filter((r) => r.status === "absent").length;
  const localLate = Object.values(localRecords).filter((r) => r.status === "late").length;
  const localTotal = students.length;
  const localPercentage = localTotal > 0 ? Math.round((localPresent / localTotal) * 100) : 0;

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto min-h-screen font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black text-zinc-100 tracking-tight flex items-center gap-3">
            <span className="p-2.5 bg-power-red/10 text-power-red rounded-2xl border border-power-red/20">
              <CalendarCheck size={24} />
            </span>
            Daily Attendance & QR Scanner
          </h1>
          <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mt-1">
            Automated Camera Check-In & Classroom Register
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setIsScannerOpen(true)}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-widest bg-emerald-500 hover:bg-emerald-600 text-black shadow-lg shadow-emerald-500/20 transition-all"
          >
            <QrCode size={18} /> Camera QR Scanner
          </button>

          <button
            onClick={handleSaveAttendance}
            disabled={saveMutation.isPending || students.length === 0}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest bg-power-red hover:bg-[#C8102E] text-white shadow-lg shadow-power-red/25 transition-all disabled:opacity-50"
          >
            <Save size={18} />
            {saveMutation.isPending ? "Saving..." : "Save Attendance"}
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white/5 border border-white/10 rounded-3xl p-5 mb-8 flex flex-col md:flex-row items-stretch md:items-center gap-4">
        {/* Batch Selector */}
        <div className="flex-1">
          <label className="block text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1.5">
            Select Batch
          </label>
          <select
            value={selectedBatchId}
            onChange={(e) => setSelectedBatchId(e.target.value)}
            disabled={isBatchesLoading}
            className="w-full bg-zinc-900 border border-white/10 text-zinc-100 text-sm font-bold rounded-2xl px-4 py-3 outline-none focus:border-power-red/50 focus:ring-1 focus:ring-power-red/50"
          >
            {batches.map((b) => (
              <option key={b._id || b.id} value={b._id || b.id}>
                {b.batch_name} — {b.course?.course_name_en || b.course_name || "General"}
              </option>
            ))}
          </select>
        </div>

        {/* Date Selector */}
        <div className="w-full md:w-56">
          <label className="block text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1.5">
            Attendance Date
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full bg-zinc-900 border border-white/10 text-zinc-100 text-sm font-bold rounded-2xl px-4 py-3 outline-none focus:border-power-red/50 focus:ring-1 focus:ring-power-red/50"
          />
        </div>

        {/* Refresh button */}
        <div className="flex items-end">
          <button
            onClick={() => refetchAttendance()}
            title="Refresh Attendance"
            className="p-3 bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-zinc-300 rounded-2xl transition-all"
          >
            <RefreshCw size={20} className={isAttendanceLoading ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Total Enrolled</span>
            <Users size={18} className="text-zinc-400" />
          </div>
          <div className="text-2xl font-black text-zinc-100">{localTotal}</div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Present</span>
            <CheckCircle size={18} className="text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400">{localPresent}</div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-rose-400">Absent</span>
            <XCircle size={18} className="text-rose-400" />
          </div>
          <div className="text-2xl font-black text-rose-400">{localAbsent}</div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-teal-400">Turnout Rate</span>
            <Sparkles size={18} className="text-teal-400" />
          </div>
          <div className="text-2xl font-black text-teal-400">{localPercentage}%</div>
        </div>
      </div>

      {/* Attendance Roster Table */}
      <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <h3 className="text-base font-black text-zinc-100 uppercase tracking-wider flex items-center gap-2">
            Student Roster ({students.length})
          </h3>

          {/* Quick Bulk Actions */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-zinc-500 uppercase mr-1">Quick:</span>
            <button
              onClick={() => handleMarkAll("present")}
              className="px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all"
            >
              All Present
            </button>
            <button
              onClick={() => handleMarkAll("absent")}
              className="px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all"
            >
              All Absent
            </button>
          </div>
        </div>

        {isAttendanceLoading ? (
          <div className="py-20 text-center text-zinc-400">
            <RefreshCw size={28} className="animate-spin mx-auto mb-3 text-power-red" />
            <p className="text-xs font-bold uppercase tracking-widest">Loading Batch Roster...</p>
          </div>
        ) : students.length === 0 ? (
          <div className="py-16 text-center text-zinc-500">
            <AlertCircle size={36} className="mx-auto mb-2 text-zinc-600" />
            <p className="text-sm font-bold text-zinc-300">No active students found in this batch</p>
            <p className="text-xs text-zinc-500 mt-1">Enroll students into this batch to take attendance.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {students.map((student) => {
              const currentStatus = localRecords[student.id]?.status || "present";
              const currentRemarks = localRecords[student.id]?.remarks || "";

              return (
                <div
                  key={student.id}
                  className="p-4 bg-zinc-900/60 hover:bg-zinc-900 border border-white/5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all"
                >
                  {/* Student Info */}
                  <div className="flex items-center gap-3.5 min-w-[240px]">
                    <Avatar
                      src={student.photo_url}
                      alt={student.student_name}
                      sizeClass="w-11 h-11"
                    />
                    <div>
                      <h4 className="text-sm font-black text-zinc-100">{student.student_name}</h4>
                      <p className="text-[11px] font-mono font-bold text-zinc-400">
                        {student.student_id}
                        {student.contact_number && (
                          <span className="text-zinc-500 ml-2">({student.contact_number})</span>
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Status Toggle Buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleStatusChange(student.id, "present")}
                      className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                        currentStatus === "present"
                          ? "bg-emerald-500 text-black shadow-md shadow-emerald-500/20"
                          : "bg-white/5 text-zinc-400 hover:text-zinc-200 border border-white/5"
                      }`}
                    >
                      <CheckCircle size={14} /> Present
                    </button>

                    <button
                      onClick={() => handleStatusChange(student.id, "absent")}
                      className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                        currentStatus === "absent"
                          ? "bg-rose-500 text-white shadow-md shadow-rose-500/20"
                          : "bg-white/5 text-zinc-400 hover:text-zinc-200 border border-white/5"
                      }`}
                    >
                      <XCircle size={14} /> Absent
                    </button>

                    <button
                      onClick={() => handleStatusChange(student.id, "late")}
                      className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                        currentStatus === "late"
                          ? "bg-amber-400 text-black shadow-md shadow-amber-400/20"
                          : "bg-white/5 text-zinc-400 hover:text-zinc-200 border border-white/5"
                      }`}
                    >
                      <Clock size={14} /> Late
                    </button>
                  </div>

                  {/* Remarks Input */}
                  <div className="w-full md:w-56">
                    <input
                      type="text"
                      placeholder="Remarks (optional)..."
                      value={currentRemarks}
                      onChange={(e) => handleRemarksChange(student.id, e.target.value)}
                      className="w-full bg-white/5 border border-white/10 text-zinc-200 text-xs rounded-xl px-3 py-2 outline-none focus:border-power-red/40"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Camera QR Scanner Modal */}
      <QRScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        batchId={selectedBatchId}
        onScanSuccess={() => {
          refetchAttendance();
        }}
      />
    </div>
  );
}
