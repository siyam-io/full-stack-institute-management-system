import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Clock,
  Edit3,
  Trash2,
  LayoutGrid,
  Search,
  BookOpen,
} from "lucide-react";
import { useBatches, useDeleteBatch } from "../../hooks/useBatches";
import { useBranches } from "../../hooks/useBranches";
import Loader from "../../components/Loader";
import DataTable from "../../components/common/DataTable.jsx";
import useAuth from "../../store/useAuth";
import BranchDropdown from "../../components/common/BranchDropdown";
import PermissionGuard from "../../components/common/PermissionGuard.jsx";
import { PERMISSIONS } from "../../config/permissionConfig.js";
import { confirmDelete } from "../../utils/swalUtils"; // 🚀 Reusable Swal Import

export default function BatchListPage() {
  const navigate = useNavigate();
  const { authUser, hasPermission, isMaster: checkMaster } = useAuth();
  const isSuper = checkMaster();

  const [selectedBranch, setSelectedBranch] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // 🚀 গ্র্যানুলার পারমিশন ফ্ল্যাগস
  const canEditBatch = hasPermission(PERMISSIONS.BATCH_EDIT);
  const canDeleteBatch = hasPermission(PERMISSIONS.BATCH_DELETE);
  const canViewWorkspace = hasPermission(PERMISSIONS.VIEW_BATCH_WORKSPACE);

  const { data: branches = [] } = useBranches({}, { enabled: !!isSuper });

  const queryParams = useMemo(() => {
    if (isSuper)
      return selectedBranch && selectedBranch !== "all" ? { branch: selectedBranch } : {};
    return { branch: authUser?.branch?._id || authUser?.branch };
  }, [isSuper, selectedBranch, authUser]);

  const { data: batchesRes, isLoading } = useBatches(queryParams);
  const { mutate: deleteBatch } = useDeleteBatch();
  const batches = Array.isArray(batchesRes) ? batchesRes : (batchesRes?.data || []);

  const filteredBatches = batches.filter(
    (b) =>
      (b?.batch_name || b?.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (b?.course?.course_name || "").toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleDelete = (id, name) => {
    confirmDelete({
      title: "Delete Batch?",
      text: `Are you sure you want to permanently delete "${name}"? This will erase all schedule and attendance data.`,
      confirmText: "Yes, delete batch",
      onConfirm: () => deleteBatch(id)
    });
  };

  const columns = [
    { label: "Batch Details", className: "w-[40%] pl-6" },
    { label: "Schedule", className: "hidden md:table-cell w-[30%]" },
    { label: "Status", className: "w-[15%]" },
    { label: "Actions", align: "right", className: "w-[15%] pr-6" },
  ];

  const renderBatchRow = (batch) => (
    <tr key={batch._id} className="group hover:bg-white/5 transition-colors border-b border-white/5 last:border-none">
      <td className="px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-xl bg-power-red/10 text-power-red flex items-center justify-center">
            <LayoutGrid size={18} />
          </div>
          <div>
            <p className="font-bold text-white text-sm">{batch.batch_name}</p>
            <p className="text-[10px] font-black text-power-red uppercase">{batch.course?.course_name}</p>
          </div>
        </div>
      </td>
      <td className="hidden md:table-cell px-6 py-4">
        <div className="flex flex-col gap-1 text-[11px] font-bold text-zinc-500">
          <span className="flex items-center gap-1"><Clock size={12} /> {batch.classTimeEn || batch.class_time_en}</span>
          <div className="flex gap-1">
            {batch.schedule_days?.map((d) => (
              <span key={d} className="bg-white/10 px-1 rounded uppercase text-[9px]">{d.slice(0, 3)}</span>
            ))}
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase ${batch.status === "Active" ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"}`}>
          {batch.status}
        </span>
      </td>
      <td className="px-6 py-4 text-right">
        <div className="flex justify-end gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
          {/* 🚀 ওয়ার্কস্পেস পারমিশন */}
          {canViewWorkspace && (
            <button onClick={() => navigate(`/admin/batches/${batch._id}`)} className="p-2 text-zinc-500 hover:text-power-red" title="Open Workspace">
              <BookOpen size={16} />
            </button>
          )}
          
          {/* 🚀 এডিট পারমিশন */}
          {canEditBatch && (
            <button onClick={() => navigate(`/admin/edit-batch/${batch._id}`)} className="p-2 text-zinc-500 hover:text-power-red" title="Edit Batch">
              <Edit3 size={16} />
            </button>
          )}

          {/* 🚀 ডিলিট পারমিশন */}
          {canDeleteBatch && (
            <button onClick={() => handleDelete(batch._id, batch.batch_name)} className="p-2 text-zinc-500 hover:text-power-red" title="Delete Batch">
              <Trash2 size={16} />
            </button>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="p-4 md:p-8 lg:p-10 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-3xl font-black text-white tracking-tight">Batch Inventory</h1>
          <div className="flex flex-wrap items-center gap-3">
            <PermissionGuard requiredPermission={PERMISSIONS.VIEW_BRANCHES}>
              {isSuper && (
                <BranchDropdown
                  isMaster={isSuper}
                  branches={branches}
                  value={selectedBranch}
                  onChange={setSelectedBranch}
                  showAllOption={true}
                  wrapperClassName="w-full sm:w-56 mb-0 mr-4 mr-10"
                />
              )}
            </PermissionGuard>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
              <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 pr-4 py-2 bg-white/5 text-zinc-100 rounded-xl text-sm border border-white/10 outline-none shadow-sm placeholder:text-zinc-500" />
            </div>
            {/* 🚀 নতুন ব্যাচ অ্যাড করা এডিটের আন্ডারে */}
            {canEditBatch && (
              <button onClick={() => navigate("/admin/add-batch")} className="bg-power-red text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-power-red/20 hover:bg-power-red/90 transition-all">
                <Plus size={18} /> New Batch
              </button>
            )}
          </div>
        </div>
        <DataTable columns={columns} data={filteredBatches} renderRow={renderBatchRow} isLoading={isLoading} emptyStateTitle="No Batches Found" />
      </div>
    </div>
  );
}