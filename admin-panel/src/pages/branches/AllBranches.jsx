import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search, Edit3, Trash2, Power, PowerOff, MapPin, Mail, Phone, Building2 } from "lucide-react";
import { useBranches, useToggleBranchStatus, useDeleteBranch } from "../../hooks/useBranches.js";
import useAuth from "../../store/useAuth.js";
import { confirmDelete } from "../../utils/swalUtils"; // 🚀 Reusable Swal Import
import DataTable from "../../components/common/DataTable.jsx";
import ActionIconButton from "../../components/common/ActionIconButton.jsx";
import PermissionGuard from "../../components/common/PermissionGuard.jsx";
import { PERMISSIONS } from "../../config/permissionConfig.js";

export default function AllBranches() {
  const navigate = useNavigate();
  const { isMaster, hasPermission } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");

  const { data: branches = [], isLoading } = useBranches();
  const toggleMutation = useToggleBranchStatus();
  const deleteMutation = useDeleteBranch();

  // 🚀 গ্র্যানুলার পারমিশন ফ্ল্যাগস
  const canEdit = hasPermission(PERMISSIONS.BRANCH_EDIT);
  const canToggle = hasPermission(PERMISSIONS.BRANCH_ACTIVE_STATUS);
  const canDelete = hasPermission(PERMISSIONS.BRANCH_DELETE);
  const hasActionAccess = canEdit || canToggle || canDelete;

  const filteredBranches = branches.filter((b) => {
    const name = b.branchName || b.branch_name || "";
    const code = b.branchCode || b.branch_code || "";
    return name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           code.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleDeleteClick = (id, name) => {
    confirmDelete({
      title: "Delete Branch?",
      text: `Are you sure you want to permanently remove "${name}"? This action cannot be undone.`,
      confirmText: "Yes, delete branch",
      onConfirm: () => deleteMutation.mutate(id),
    });
  };

  const columns = [
    { label: "Branch Details", className: "w-[40%] pl-6" },
    { label: "Contact Info", className: "hidden md:table-cell w-[30%]" },
    { label: "Status", className: "text-center w-[15%]" },
    ...(hasActionAccess ? [{ label: "Actions", align: "right", className: "w-[15%] pr-6" }] : [])
  ];

  const renderBranchRow = (branch) => {
    const id = branch.id || branch._id;
    const isActive = branch.isActive !== undefined ? branch.isActive : branch.is_active;
    const name = branch.branchName || branch.branch_name || "";
    const code = branch.branchCode || branch.branch_code || "";
    const email = branch.contactEmail || branch.contact_email || "";
    const phone = branch.contactPhone || branch.contact_phone || "";
    
    return (
      <tr key={id} className={`group transition-colors border-b border-white/5 last:border-none hover:bg-white/5 ${!isActive ? "opacity-60" : ""}`}>
        <td className="px-6 py-4">
          <div className="flex items-center gap-4">
            <div className={`h-12 w-12 rounded-2xl flex items-center justify-center font-black text-sm ${isActive ? 'bg-power-red/10 text-power-red' : 'bg-white/5 text-zinc-500'}`}>
              {code}
            </div>
            <div className="flex flex-col">
              <span className="text-[14px] font-bold text-zinc-100">{name}</span>
              <span className="text-[12px] text-zinc-500 flex items-center gap-1.5"><MapPin size={12} /> {branch.address}</span>
            </div>
          </div>
        </td>
        <td className="px-6 py-4 hidden md:table-cell">
          <div className="flex flex-col space-y-1 text-[12px] text-zinc-500 font-medium">
            {email && <span className="flex items-center gap-1.5"><Mail size={11} /> {email}</span>}
            {phone && <span className="flex items-center gap-1.5"><Phone size={11} /> {phone}</span>}
          </div>
        </td>
        <td className="px-6 py-4 text-center">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-black uppercase ${isActive ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}>
            {isActive ? "Operational" : "Suspended"}
          </span>
        </td>
        
        {hasActionAccess && (
          <td className="px-6 py-4 text-right">
            <div className="flex justify-end gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
              {/* ⚡ অ্যাক্টিভ স্ট্যাটাস কন্ট্রোল */}
              {canToggle && (
                <ActionIconButton 
                  icon={isActive ? PowerOff : Power} 
                  onClick={() => toggleMutation.mutate(id)} 
                  disabled={toggleMutation.isPending}
                  title="Toggle Status"
                />
              )}
              {/* 📝 এডিট ব্রাঞ্চ */}
              {canEdit && (
                <ActionIconButton 
                  icon={Edit3} 
                  onClick={() => navigate(`/admin/update-branch/${id}`)} 
                  title="Edit Branch" 
                />
              )}
              {/* 🗑️ ডিলিট ব্রাঞ্চ */}
              {canDelete && (
                <ActionIconButton 
                  icon={Trash2} 
                  variant="danger" 
                  onClick={() => handleDeleteClick(id, name)} 
                  disabled={deleteMutation.isPending}
                  title="Delete Branch" 
                />
              )}
            </div>
          </td>
        )}
      </tr>
    );
  };

  return (
    <div className="p-4 md:p-8 max-w-[1600px] mx-auto min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-zinc-100 tracking-tight flex items-center gap-3">
            <Building2 className="text-power-red" size={32} /> Branch Directory
          </h1>
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5" />
            <input type="text" placeholder="Search branches..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm focus:ring-2 focus:ring-power-red/40 outline-none" />
          </div>
          {/* 🚀 নতুন ব্রাঞ্চ তৈরি করা এডিট পারমিশনের আন্ডারে */}
          {canEdit && (
            <button onClick={() => navigate("/admin/add-branch")} className="px-5 py-2.5 bg-[#EF233C] hover:bg-[#C8102E] text-white font-bold rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-power-red/20">
              <Plus size={18} /> New Branch
            </button>
          )}
        </div>
      </div>
      <DataTable columns={columns} data={filteredBranches} renderRow={renderBranchRow} isLoading={isLoading} emptyStateTitle="No branches found" />
    </div>
  );
}