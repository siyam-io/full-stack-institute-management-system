import React, { useState } from "react";
import {
  Trash2,
  Plus,
  X,
  ShieldCheck,
  UserCog,
  Mail,
  Phone,
  Fingerprint,
} from "lucide-react";
import {
  useUsers,
  useAddUser,
  useDeleteUser,
  useUpdateUser,
} from "../hooks/useUser";
import Loader from "../components/Loader";
import PageHeader from "../components/common/PageHeader";
import DataTable from "../components/common/DataTable";
import { confirmDelete } from "../utils/swalUtils";
import toast from "react-hot-toast";

const ManageAdmins = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "123456",
    full_name: "",
    employee_id: "",
    phone: "",
    role: "admin",
  });

  const { data: adminsRes, isLoading } = useUsers({
    role: "admin",
    limit: 100,
  });
  const admins = adminsRes?.data || [];

  const createMutation = useAddUser();
  const deleteMutation = useDeleteUser();
  const updateMutation = useUpdateUser();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(form).forEach((key) => formData.append(key, form[key]));

    createMutation.mutate(formData, {
      onSuccess: () => {
        setIsModalOpen(false);
        setForm({
          username: "",
          email: "",
          password: "123456",
          full_name: "",
          employee_id: "",
          phone: "",
          role: "admin",
        });
        toast.success("Administrator access granted.");
      },
    });
  };

  const handleDelete = (user) => {
    confirmDelete({
      title: "Revoke Access?",
      text: `Are you sure you want to remove admin privileges for ${user.full_name || user.username}?`,
      onConfirm: () => deleteMutation.mutate(user._id),
    });
  };

  const handleToggleStatus = (id) => {
    updateMutation.mutate({ id, data: { action: "toggle-role" } });
  };

  // ==========================================
  // TABLE CONFIG
  // ==========================================
  const columns = [
    { label: "Administrator Identity", align: "left" },
    { label: "Contact Info", align: "left" },
    { label: "Access Level", align: "center" },
    { label: "Management", align: "right" },
  ];

  const renderRow = (user) => (
    <tr key={user._id} className="hover:bg-white/5 transition-colors group border-b border-white/5">
      <td className="px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-power-red/10 flex items-center justify-center text-power-red border border-power-red/20 shadow-sm">
            <ShieldCheck size={20} />
          </div>
          <div>
            <p className="font-black text-white uppercase tracking-tight text-sm">
              {user.full_name || user.username}
            </p>
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-0.5">
              <Fingerprint size={10} /> {user.employee_id || "No ID"} • @
              {user.username}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-zinc-500">
            <Mail size={12} className="text-zinc-500" /> {user.email}
          </div>
          <div className="flex items-center gap-2 text-[11px] font-medium text-zinc-500">
            <Phone size={12} className="text-zinc-500" /> {user.phone || "N/A"}
          </div>
        </div>
      </td>
      <td className="px-6 py-5 text-center">
        <button
          onClick={() => handleToggleStatus(user._id)}
          className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.1em] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500 hover:text-white transition-all shadow-sm"
        >
          Enabled
        </button>
      </td>
      <td className="px-6 py-5 text-right">
        <button
          onClick={() => handleDelete(user)}
          disabled={deleteMutation.isPending}
          className="p-2.5 text-zinc-500 hover:text-power-red hover:bg-power-red/10 rounded-xl transition-all border border-transparent hover:border-power-red/20"
        >
          <Trash2 size={18} />
        </button>
      </td>
    </tr>
  );

  if (isLoading) return <Loader />;

  return (
    <div className="p-8 max-w-7xl mx-auto min-h-screen">
      <PageHeader
        title="System Administrators"
        subtitle="Manage root-level permissions and staff administrative identities."
        onAdd={() => setIsModalOpen(true)}
        addText="New Admin"
      />

      <DataTable
        columns={columns}
        data={admins}
        renderRow={renderRow}
        isLoading={isLoading}
        emptyStateTitle="No Administrators Defined"
      />

      {isModalOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#0B0B0D] rounded-[2.5rem] w-full max-w-md p-8 shadow-2xl border border-white/10 relative overflow-hidden">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-2 text-zinc-500 hover:text-power-red hover:bg-power-red/10 rounded-full transition-all"
            >
              <X size={20} />
            </button>

            <div className="mb-8">
              <h2 className="text-2xl font-black text-white tracking-tight">
                Access Provisioning
              </h2>
              <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mt-1">
                Register new administrative staff
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-4">
                <input
                  placeholder="Legal Full Name"
                  value={form.full_name}
                  onChange={(e) =>
                    setForm({ ...form, full_name: e.target.value })
                  }
                  required
                  className="w-full bg-white/5 border-2 border-white/10 text-zinc-100 px-5 py-4 rounded-2xl font-bold placeholder:text-zinc-500 focus:bg-white/10 outline-none focus:border-power-red/60 transition-all"
                />

                <div className="grid grid-cols-2 gap-4">
                  <input
                    placeholder="Username"
                    value={form.username}
                    onChange={(e) =>
                      setForm({ ...form, username: e.target.value })
                    }
                    required
                    className="w-full bg-white/5 border-2 border-white/10 text-zinc-100 px-5 py-4 rounded-2xl font-bold placeholder:text-zinc-500 focus:bg-white/10 outline-none focus:border-power-red/60 transition-all"
                  />
                  <input
                    placeholder="Staff ID"
                    value={form.employee_id}
                    onChange={(e) =>
                      setForm({ ...form, employee_id: e.target.value })
                    }
                    required
                    className="w-full bg-white/5 border-2 border-white/10 text-zinc-100 px-5 py-4 rounded-2xl font-bold placeholder:text-zinc-500 focus:bg-white/10 outline-none focus:border-power-red/60 transition-all"
                  />
                </div>

                <input
                  type="email"
                  placeholder="Official Email Address"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  className="w-full bg-white/5 border-2 border-white/10 text-zinc-100 px-5 py-4 rounded-2xl font-bold placeholder:text-zinc-500 focus:bg-white/10 outline-none focus:border-power-red/60 transition-all"
                />
                <input
                  placeholder="Primary Phone"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  required
                  className="w-full bg-white/5 border-2 border-white/10 text-zinc-100 px-5 py-4 rounded-2xl font-bold placeholder:text-zinc-500 focus:bg-white/10 outline-none focus:border-power-red/60 transition-all"
                />
              </div>

              <div className="p-4 bg-amber-500/10 rounded-[1.5rem] border border-amber-500/20 flex items-start gap-4">
                <div className="p-2 bg-black/40 rounded-lg text-amber-400 shadow-sm">
                  <UserCog size={18} />
                </div>
                <p className="text-[11px] text-amber-300/90 font-bold leading-relaxed">
                  SECURITY NOTICE: This identity will be generated with the
                  default system password:{" "}
                  <span className="underline decoration-amber-400/40 px-1">
                    123456
                  </span>
                </p>
              </div>

              <button
                type="submit"
                disabled={createMutation.isPending}
                className="w-full bg-power-red text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-power-red/90 shadow-xl shadow-power-red/20 transition-all disabled:opacity-50 mt-4 active:scale-95"
              >
                {createMutation.isPending
                  ? "Syncing Server..."
                  : "Activate Account"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageAdmins;
