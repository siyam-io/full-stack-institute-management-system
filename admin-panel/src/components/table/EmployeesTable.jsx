import React, { useState } from "react";
import {
  Edit, Trash2, Briefcase, Mail, Phone, Power, PowerOff, 
  Eye, Award, Loader2, Building2, Shield
} from "lucide-react";
import { API } from "../../api/axios.js";
import toast from "react-hot-toast";
import DataTable from "../common/DataTable.jsx";
import ActionIconButton from "../common/ActionIconButton.jsx";
import Avatar from "../common/Avatar.jsx";
import { PERMISSIONS } from "../../config/permissionConfig.js";
import useAuth from "../../store/useAuth.js";
import { confirmDelete } from "../../utils/swalUtils";

const EmployeesTable = ({
  employees,
  roles = [], 
  currentUserId,
  pagination,
  onDelete,
  onToggleStatus,
  onUpdateRole, 
  onViewProfile,
  onEdit,
  deleteLoading,
  toggleLoading,
  roleLoadingId,
  page,
  onPageChange,
  searchTerm,
  isLoading = false,
}) => {
  const [downloadingId, setDownloadingId] = useState(null);
  const { hasPermission, isMaster } = useAuth();
  
  // 🚀 লগইন করা ইউজার কি সুপার এডমিন?
  const isLoggedInSuperAdmin = isMaster();

  const handleDownloadIDCard = async (employee) => {
    const id = employee.id || employee._id;
    try {
      setDownloadingId(id);
      const response = await API.get(
        `/generate-certificate/employeeid/download/${id}`,
        { responseType: "blob" },
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `ID_Card_${employee.employee_id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      toast.success("ID Card generated successfully");
    } catch (error) {
      toast.error("Failed to generate ID Card");
    } finally {
      setDownloadingId(null);
    }
  };

  const handleDeleteClick = (employeeId, employeeName) => {
    confirmDelete({
      title: "Delete Employee?",
      text: `Are you sure you want to permanently delete ${employeeName}?`,
      confirmText: "Yes, delete employee",
      onConfirm: () => onDelete(employeeId)
    });
  };

  const columns = [
    { label: "Employee Identity", className: "w-[30%]" },
    { label: "Campus", className: "hidden sm:table-cell w-[15%]" }, 
    { label: "Position", className: "hidden md:table-cell w-[20%]" },
    { label: "Contact", className: "hidden lg:table-cell w-[20%]" },
    { label: "Status", className: "hidden sm:table-cell w-[10%]" },
    { label: "Role & Actions", align: "right", className: "w-[20%]" },
  ];

  const renderEmployeeRow = (employee) => {
    const id = employee.id || employee._id;
    const isInactive = employee.status !== "Active";
    const isSelf = id === currentUserId;
    const employeeRoleName = employee.role?.name || "Unassigned";
    
    // 🚀 টার্গেট ইউজার (যাকে তুই টেবিলে দেখছিস) কি সুপার এডমিন?
    const isTargetSuperAdmin = employeeRoleName.toLowerCase() === 'superadmin';

    // 🛡️ রোল আপডেট ড্রপডাউন দেখানোর কন্ডিশন:
    // ১. আমার রোল কন্ট্রোল করার পারমিশন আছে।
    // ২. আমি নিজের রোল নিজে চেঞ্জ করতে পারবো না (!isSelf)।
    // ৩. আমি যদি সুপার এডমিন হই, তবে আমি সবারটা পারবো।
    // ৪. যদি আমি সুপার এডমিন না হই, তবে আমি কোনো সুপার এডমিনের রোল চেঞ্জ করতে পারবো না।
    const canChangeRole = hasPermission(PERMISSIONS.EMPLOYEE_ROLE_CONTROL) && 
                          !isSelf && 
                          (isLoggedInSuperAdmin || !isTargetSuperAdmin);

    const StaticRoleBadge = () => (
      <div className={`px-2.5 py-1 text-[10px] font-black uppercase tracking-widest rounded-md border flex items-center gap-1.5 ${
        isTargetSuperAdmin
          ? "bg-amber-500/10 border-amber-500/20 text-amber-400" 
          : "bg-power-red/10 border-power-red/20 text-power-red"
      }`}>
        {isTargetSuperAdmin && <Shield size={10} />}
        {employeeRoleName}
      </div>
    );

    return (
      <tr key={id} className={`group transition-colors border-b border-white/5 last:border-none hover:bg-white/5 ${isInactive ? "opacity-60" : ""}`}>
        <td className="px-6 py-4">
          <div className="flex items-center gap-4">
            <Avatar src={employee.photoUrl || employee.photo_url} alt={employee.username} fallbackText={employee.fullName || employee.full_name} isInactive={isInactive} sizeClass="h-10 w-10" />
            <div className="flex flex-col">
              <span className="text-[14px] font-bold text-white">{employee.fullName || employee.full_name}</span>
              <span className="text-[11px] text-zinc-500 font-medium">ID: {employee.employee_id} • <span className="text-power-red">@{employee.username}</span></span>
            </div>
          </div>
        </td>

        <td className="px-6 py-4 hidden sm:table-cell">
          <span className="text-[13px] font-bold text-zinc-200">{employee.branch?.branch_name || "Global HQ"}</span>
        </td>

        <td className="px-6 py-4 hidden md:table-cell">
          <div className="flex flex-col">
            <span className="text-[13px] font-medium text-zinc-300">{employee.designation || "N/A"}</span>
            <span className="text-[10px] font-bold uppercase text-zinc-500">{employee.department || "General"}</span>
          </div>
        </td>

        <td className="px-6 py-4 hidden lg:table-cell">
          <div className="flex flex-col text-[12px] text-zinc-400">
            <span>{employee.phone}</span>
            <span className="truncate max-w-[140px]">{employee.email}</span>
          </div>
        </td>

        <td className="px-6 py-4 hidden sm:table-cell text-center">
          <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-md ${employee.status === "Active" ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"}`}>
            {employee.status}
          </span>
        </td>

        <td className="px-6 py-4 text-right">
          <div className="flex flex-col items-end gap-2">
            
            {/* 🚀 রোল আপডেট ড্রপডাউন - এখন কাজ করবে */}
            <div className="flex items-center gap-2">
              {roleLoadingId === id && <Loader2 size={12} className="animate-spin text-power-red" />}
              {canChangeRole ? (
                <select
                  value={employee.role?.id || employee.role?._id || ""}
                  onChange={(e) => onUpdateRole(id, e.target.value)}
                  disabled={roleLoadingId === id}
                  className="cursor-pointer px-2.5 py-1 text-[10px] font-black uppercase bg-white/5 text-zinc-200 border border-white/10 rounded-md outline-none hover:border-power-red/50 transition-all"
                >
                  <option value="" disabled>Select Role</option>
                  {roles.map((r) => (
                    <option key={r.id || r._id} value={r.id || r._id}>{r.name}</option>
                  ))}
                </select>
              ) : (
                <StaticRoleBadge />
              )}
            </div>

            <div className="flex items-center justify-end gap-1 opacity-60 group-hover:opacity-100 transition-opacity duration-200">
              {hasPermission(PERMISSIONS.VIEW_EMPLOYEES) && <ActionIconButton icon={Eye} onClick={() => onViewProfile(employee)} title="View" variant="neutral" />}
              {hasPermission(PERMISSIONS.EMPLOYEE_IDCARD) && <ActionIconButton icon={Award} onClick={() => handleDownloadIDCard(employee)} disabled={downloadingId === id} title="ID Card" variant="neutral" />}
              {hasPermission(PERMISSIONS.EMPLOYEE_ACTIVE_STATUS) && !isSelf && <ActionIconButton icon={employee.status === "Active" ? PowerOff : Power} onClick={() => onToggleStatus(id, employee.status)} title="Status" variant="neutral" />}
              {hasPermission(PERMISSIONS.EMPLOYEE_EDIT) && <ActionIconButton icon={Edit} onClick={() => onEdit(id)} title="Edit" variant="neutral" />}
              {hasPermission(PERMISSIONS.EMPLOYEE_DELETE) && !isSelf && (!isTargetSuperAdmin || isLoggedInSuperAdmin) && (
                <ActionIconButton icon={Trash2} variant="danger" onClick={() => handleDeleteClick(id, employee.fullName || employee.full_name)} title="Delete" />
              )}
            </div>
          </div>
        </td>
      </tr>
    );
  };

  return (
    <DataTable
      columns={columns}
      data={employees}
      renderRow={renderEmployeeRow}
      isLoading={isLoading}
      pagination={pagination}
      page={page}
      onPageChange={onPageChange}
      searchTerm={searchTerm}
    />
  );
};

export default EmployeesTable;