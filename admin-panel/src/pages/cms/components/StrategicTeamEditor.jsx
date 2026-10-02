import React, { useState } from "react";
import { useTeamMembers, useCreateTeamMember, useUpdateTeamMember, useDeleteTeamMember } from "../../../hooks/useCms";
import Loader from "../../../components/Loader";
import Swal from "sweetalert2";
import { AlertCircle } from "lucide-react";
import { API } from "../../../api/axios";
import { apiURL } from "../../../../Constant";
import toast from "react-hot-toast";

const uploadImageFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await API.post("/cms/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data.data.url;
};

const StrategicTeamEditor = () => {
  const { data: members, isLoading } = useTeamMembers();
  const createTM = useCreateTeamMember();
  const updateTM = useUpdateTeamMember();
  const deleteTM = useDeleteTeamMember();

  const [employees, setEmployees] = useState([]);
  React.useEffect(() => {
    API.get("/users/all?limit=100")
      .then((res) => {
        const list = res.data?.data?.users || res.data?.data || [];
        setEmployees(list);
      })
      .catch((err) => console.error("Error fetching employees:", err));
  }, []);

  const [newForm, setNewForm] = useState({
    userId: "",
    nameEn: "",
    nameBn: "",
    designationEn: "",
    designationBn: "",
    bioEn: "",
    bioBn: "",
    image_url: "",
    facebook: "",
    linkedin: "",
    sort_order: 0,
  });
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [editorMode, setEditorMode] = useState("visual");
  const [jsonInput, setJsonInput] = useState("");

  const [isUploadingNew, setIsUploadingNew] = useState(false);
  const [isUploadingEdit, setIsUploadingEdit] = useState(false);

  // Preview state
  const [previewLocale, setPreviewLocale] = useState("en");

  const handleNewImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsUploadingNew(true);
    try {
      const url = await uploadImageFile(file);
      setNewForm((p) => ({ ...p, image_url: url }));
      toast.success("Image uploaded!");
    } catch (err) {
      console.error(err);
      toast.error("Upload failed");
    } finally {
      setIsUploadingNew(false);
    }
  };

  const handleEditImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsUploadingEdit(true);
    try {
      const url = await uploadImageFile(file);
      setEditForm((p) => ({ ...p, imageUrl: url }));
      toast.success("Image uploaded!");
    } catch (err) {
      console.error(err);
      toast.error("Upload failed");
    } finally {
      setIsUploadingEdit(false);
    }
  };

  const handleCreate = () => {
    if (!newForm.nameEn || !newForm.designationEn) {
      toast.error("English Name and Designation are required!");
      return;
    }
    createTM.mutate({
      user_id: newForm.userId || null,
      name_en: newForm.nameEn,
      name_bn: newForm.nameBn || newForm.nameEn,
      designation_en: newForm.designationEn,
      designation_bn: newForm.designationBn || newForm.designationEn,
      bio_en: newForm.bioEn,
      bio_bn: newForm.bioBn || newForm.bioEn,
      image_url: newForm.image_url,
      facebook: newForm.facebook,
      linkedin: newForm.linkedin,
      sort_order: newForm.sort_order,
    });
    setNewForm({
      userId: "",
      nameEn: "",
      nameBn: "",
      designationEn: "",
      designationBn: "",
      bioEn: "",
      bioBn: "",
      image_url: "",
      facebook: "",
      linkedin: "",
      sort_order: 0,
    });
  };

  const startEdit = (m) => {
    setEditId(m.id);
    setEditForm({
      id: m.id,
      userId: m.userId || "",
      nameEn: m.nameEn || m.name,
      nameBn: m.nameBn || m.name,
      designationEn: m.designationEn || m.designation,
      designationBn: m.designationBn || m.designation,
      bioEn: m.bioEn || m.bio || "",
      bioBn: m.bioBn || m.bio || "",
      imageUrl: m.imageUrl || "",
      facebook: m.facebook || "",
      linkedin: m.linkedin || "",
      sortOrder: m.sortOrder || 0,
      isActive: m.isActive !== false,
    });
  };

  const cancelEdit = () => setEditId(null);

  const handleUpdate = () => {
    updateTM.mutate({
      id: editId,
      data: {
        user_id: editForm.userId || null,
        name_en: editForm.nameEn,
        name_bn: editForm.nameBn,
        designation_en: editForm.designationEn,
        designation_bn: editForm.designationBn,
        bio_en: editForm.bioEn,
        bio_bn: editForm.bioBn,
        image_url: editForm.imageUrl,
        facebook: editForm.facebook,
        linkedin: editForm.linkedin,
        sort_order: editForm.sortOrder,
        is_active: editForm.isActive,
      },
    });
    setEditId(null);
  };

  const handleModeChange = (mode) => {
    if (mode === "visual") {
      // Query refetches automatically
    } else {
      const cleanList = (members || []).map((m) => ({
        id: m.id,
        userId: m.userId || null,
        nameEn: m.nameEn || m.name,
        nameBn: m.nameBn || m.name,
        designationEn: m.designationEn || m.designation,
        designationBn: m.designationBn || m.designation,
        bioEn: m.bioEn || m.bio || "",
        bioBn: m.bioBn || m.bio || "",
        imageUrl: m.imageUrl || "",
        facebook: m.facebook || "",
        linkedin: m.linkedin || "",
        sortOrder: m.sortOrder || 0,
        isActive: m.isActive !== false,
      }));
      setJsonInput(JSON.stringify(cleanList, null, 2));
    }
    setEditorMode(mode);
  };

  const handleApplyBulkJson = async () => {
    try {
      const parsed = JSON.parse(jsonInput.trim());
      if (!Array.isArray(parsed)) throw new Error("Must be a JSON array");

      const existingMap = new Map((members || []).map((m) => [m.id, m]));
      const newIds = new Set(parsed.map((item) => item.id).filter(Boolean));

      for (const m of members || []) {
        if (!newIds.has(m.id)) {
          await deleteTM.mutateAsync(m.id);
        }
      }

      for (const item of parsed) {
        const payload = {
          user_id: item.userId || null,
          name_en: item.nameEn,
          name_bn: item.nameBn || item.nameEn,
          designation_en: item.designationEn,
          designation_bn: item.designationBn || item.designationEn,
          bio_en: item.bioEn || "",
          bio_bn: item.bioBn || "",
          image_url: item.imageUrl,
          facebook: item.facebook || "",
          linkedin: item.linkedin || "",
          sort_order: item.sortOrder || 0,
          is_active: item.isActive !== false,
        };

        if (item.id && existingMap.has(item.id)) {
          await updateTM.mutateAsync({ id: item.id, data: payload });
        } else {
          await createTM.mutateAsync(payload);
        }
      }

      Swal.fire({ icon: "success", title: "JSON Applied!", timer: 1000, showConfirmButton: false });
      setEditorMode("visual");
    } catch (e) {
      Swal.fire("Error", e.message || "Invalid JSON", "error");
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Editor Mode Header */}
      <div className="flex justify-between items-center bg-white/5 px-6 py-4 rounded-[1.5rem] border border-white/10">
        <span className="text-sm font-bold text-zinc-200">Editor Mode:</span>
        <div className="flex space-x-1 bg-white/10 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => handleModeChange("visual")}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition duration-200 ${
              editorMode === "visual" ? "bg-white/5 text-power-red shadow-sm" : "text-zinc-500"
            }`}
          >
            Visual Builder
          </button>
          <button
            type="button"
            onClick={() => handleModeChange("json")}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition duration-200 ${
              editorMode === "json" ? "bg-white/5 text-power-red shadow-sm" : "text-zinc-500"
            }`}
          >
            Bulk JSON Editor
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
        {/* Left Side: Forms */}
        <div className="space-y-6">
          {editorMode === "visual" ? (
            <div className="space-y-8">
              {/* Add New Section */}
              <div className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-6">
                <h4 className="font-bold text-zinc-200 uppercase text-xs tracking-wider border-b pb-2">Add Team Member</h4>
                
                {employees.length > 0 && (
                  <div className="mb-4 bg-white/5 p-4 rounded-xl border border-white/10">
                    <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2">Link Employee Account (Optional)</label>
                    <select
                      value={newForm.userId}
                      onChange={(e) => {
                        const val = e.target.value;
                        const emp = employees.find(x => x.id === val);
                        if (emp) {
                          setNewForm(p => ({
                            ...p,
                            userId: val,
                            nameEn: emp.fullName || emp.full_name || "",
                            nameBn: emp.fullName || emp.full_name || "",
                            designationEn: emp.designation || "",
                            designationBn: emp.designation || "",
                            bioEn: emp.bio || "",
                            bioBn: emp.bio || "",
                            image_url: emp.photoUrl || emp.photo_url || ""
                          }));
                        } else {
                          setNewForm(p => ({ ...p, userId: "" }));
                        }
                      }}
                      className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-sm focus:outline-none"
                    >
                      <option value="">-- Standalone / Standalone profile (No Linked Account) --</option>
                      {employees.map(emp => (
                        <option key={emp.id} value={emp.id}>
                          {emp.fullName || emp.full_name} ({emp.designation || "No Designation"})
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* English Form fields */}
                  <div className="space-y-4 bg-white/5 p-5 rounded-xl border border-white/10">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-2">🇬🇧 English Translation</span>
                    <input
                      type="text"
                      placeholder="Name (English) *"
                      value={newForm.nameEn}
                      onChange={(e) => setNewForm((p) => ({ ...p, nameEn: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-white/10 text-sm focus:ring-2 focus:ring-power-red/40 outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Designation (English) *"
                      value={newForm.designationEn}
                      onChange={(e) => setNewForm((p) => ({ ...p, designationEn: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-white/10 text-sm focus:ring-2 focus:ring-power-red/40 outline-none"
                    />
                    <textarea
                      placeholder="Bio (English)"
                      value={newForm.bioEn}
                      rows={3}
                      onChange={(e) => setNewForm((p) => ({ ...p, bioEn: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-white/10 text-sm focus:ring-2 focus:ring-power-red/40 outline-none"
                    />
                  </div>

                  {/* Bangla Form fields */}
                  <div className="space-y-4 bg-white/5 p-5 rounded-xl border border-white/10">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-2">🇧🇩 Bangla Translation</span>
                    <input
                      type="text"
                      placeholder="Name (Bangla)"
                      value={newForm.nameBn}
                      onChange={(e) => setNewForm((p) => ({ ...p, nameBn: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-white/10 text-sm focus:ring-2 focus:ring-power-red/40 outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Designation (Bangla)"
                      value={newForm.designationBn}
                      onChange={(e) => setNewForm((p) => ({ ...p, designationBn: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-white/10 text-sm focus:ring-2 focus:ring-power-red/40 outline-none"
                    />
                    <textarea
                      placeholder="Bio (Bangla)"
                      value={newForm.bioBn}
                      rows={3}
                      onChange={(e) => setNewForm((p) => ({ ...p, bioBn: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-white/10 text-sm focus:ring-2 focus:ring-power-red/40 outline-none"
                    />
                  </div>
                </div>

                {/* Shared Fields */}
                <div className="bg-white/5 p-5 rounded-xl border border-white/10 space-y-4">
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider">Member Image</label>
                  <div className="flex items-center space-x-4">
                    <div className="shrink-0">
                      {newForm.image_url ? (
                        <img
                          src={newForm.image_url.startsWith("http") ? newForm.image_url : `${apiURL.image_url}${newForm.image_url}`}
                          alt="Member Preview"
                          className="h-16 w-16 object-cover rounded-xl shadow border-2 border-white"
                        />
                      ) : (
                        <div className="h-16 w-16 rounded-xl bg-white/5 border border-white/10 border-dashed flex items-center justify-center text-[8px] font-bold text-zinc-500 uppercase">No Image</div>
                      )}
                    </div>
                    <label className="block flex-1">
                      <input
                        type="file"
                        onChange={handleNewImageUpload}
                        accept="image/*"
                        className="block w-full text-xs text-zinc-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-[10px] file:font-black file:uppercase file:bg-indigo-55 file:text-power-red hover:file:bg-power-red/10 cursor-pointer"
                        disabled={isUploadingNew}
                      />
                    </label>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                      type="text"
                      placeholder="Facebook Href"
                      value={newForm.facebook}
                      onChange={(e) => setNewForm((p) => ({ ...p, facebook: e.target.value }))}
                      className="w-full px-4 py-2 rounded-xl border border-white/10 text-xs focus:ring-2 focus:ring-power-red/40 outline-none"
                    />
                    <input
                      type="text"
                      placeholder="LinkedIn Href"
                      value={newForm.linkedin}
                      onChange={(e) => setNewForm((p) => ({ ...p, linkedin: e.target.value }))}
                      className="w-full px-4 py-2 rounded-xl border border-white/10 text-xs focus:ring-2 focus:ring-power-red/40 outline-none"
                    />
                    <input
                      type="number"
                      placeholder="Sort Order"
                      value={newForm.sort_order}
                      onChange={(e) => setNewForm((p) => ({ ...p, sort_order: parseInt(e.target.value) || 0 }))}
                      className="w-full px-4 py-2 rounded-xl border border-white/10 text-xs focus:ring-2 focus:ring-power-red/40 outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleCreate}
                    disabled={createTM.isPending}
                    className="px-8 py-3 rounded-xl bg-power-red hover:bg-[#C8102E] text-white font-bold text-sm shadow-lg shadow-power-red/20 transition disabled:opacity-50"
                  >
                    {createTM.isPending ? "Adding..." : "Add Team Member"}
                  </button>
                </div>
              </div>

              {/* Members List */}
              <div className="grid grid-cols-1 gap-4">
                {(members || []).map((m) => (
                  <div key={m.id} className="bg-white/5 p-6 rounded-[1.8rem] border border-white/10 shadow-sm">
                    {editId === m.id ? (
                      <div className="space-y-4">
                        {employees.length > 0 && (
                          <div className="mb-2 bg-white/5 p-3 rounded-xl border border-white/10">
                            <label className="block text-[10px] font-bold text-zinc-500 uppercase mb-1">Linked Employee Account</label>
                            <select
                              value={editForm.userId || ""}
                              onChange={(e) => {
                                const val = e.target.value;
                                const emp = employees.find(x => x.id === val);
                                if (emp) {
                                  setEditForm(p => ({
                                    ...p,
                                    userId: val,
                                    nameEn: emp.fullName || emp.full_name || "",
                                    nameBn: emp.fullName || emp.full_name || "",
                                    designationEn: emp.designation || "",
                                    designationBn: emp.designation || "",
                                    bioEn: emp.bio || "",
                                    bioBn: emp.bio || "",
                                    imageUrl: emp.photoUrl || emp.photo_url || ""
                                  }));
                                } else {
                                  setEditForm(p => ({ ...p, userId: "" }));
                                }
                              }}
                              className="w-full px-3 py-1.5 rounded-lg border border-white/10 text-xs bg-white/5 focus:outline-none"
                            >
                              <option value="">-- Standalone / Unlinked Profile --</option>
                              {employees.map(emp => (
                                <option key={emp.id} value={emp.id}>{emp.fullName || emp.full_name}</option>
                              ))}
                            </select>
                          </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* English Edit fields */}
                          <div className="space-y-3 bg-white/5 p-4 rounded-xl border border-white/10">
                            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block">🇬🇧 English Translation</span>
                            <input
                              type="text"
                              value={editForm.nameEn || ""}
                              onChange={(e) => setEditForm((p) => ({ ...p, nameEn: e.target.value }))}
                              className="w-full px-3 py-2 border rounded-lg text-sm"
                              placeholder="Name"
                            />
                            <input
                              type="text"
                              value={editForm.designationEn || ""}
                              onChange={(e) => setEditForm((p) => ({ ...p, designationEn: e.target.value }))}
                              className="w-full px-3 py-2 border rounded-lg text-sm"
                              placeholder="Designation"
                            />
                            <textarea
                              value={editForm.bioEn || ""}
                              onChange={(e) => setEditForm((p) => ({ ...p, bioEn: e.target.value }))}
                              rows={2}
                              className="w-full px-3 py-2 border rounded-lg text-sm"
                              placeholder="Bio"
                            />
                          </div>

                          {/* Bangla Edit fields */}
                          <div className="space-y-3 bg-white/5 p-4 rounded-xl border border-white/10">
                            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block">🇧🇩 Bangla Translation</span>
                            <input
                              type="text"
                              value={editForm.nameBn || ""}
                              onChange={(e) => setEditForm((p) => ({ ...p, nameBn: e.target.value }))}
                              className="w-full px-3 py-2 border rounded-lg text-sm"
                              placeholder="Name (Bangla)"
                            />
                            <input
                              type="text"
                              value={editForm.designationBn || ""}
                              onChange={(e) => setEditForm((p) => ({ ...p, designationBn: e.target.value }))}
                              className="w-full px-3 py-2 border rounded-lg text-sm"
                              placeholder="Designation (Bangla)"
                            />
                            <textarea
                              value={editForm.bioBn || ""}
                              onChange={(e) => setEditForm((p) => ({ ...p, bioBn: e.target.value }))}
                              rows={2}
                              className="w-full px-3 py-2 border rounded-lg text-sm"
                              placeholder="Bio (Bangla)"
                            />
                          </div>
                        </div>

                        {/* Shared Edit fields */}
                        <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-3">
                          <div>
                            <label className="block text-[10px] font-bold text-zinc-500 uppercase mb-1">Image</label>
                            <div className="flex items-center space-x-3">
                              {editForm.imageUrl && (
                                <img
                                  src={editForm.imageUrl.startsWith("http") ? editForm.imageUrl : `${apiURL.image_url}${editForm.imageUrl}`}
                                  alt="Edit Preview"
                                  className="h-10 w-10 object-cover rounded-lg border border-white/10"
                                />
                              )}
                              <input
                                type="file"
                                onChange={handleEditImageUpload}
                                accept="image/*"
                                className="block w-full text-xs text-zinc-500"
                                disabled={isUploadingEdit}
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <input
                              type="text"
                              placeholder="Facebook"
                              value={editForm.facebook || ""}
                              onChange={(e) => setEditForm((p) => ({ ...p, facebook: e.target.value }))}
                              className="w-full px-3 py-1.5 border rounded-lg text-xs"
                            />
                            <input
                              type="text"
                              placeholder="LinkedIn"
                              value={editForm.linkedin || ""}
                              onChange={(e) => setEditForm((p) => ({ ...p, linkedin: e.target.value }))}
                              className="w-full px-3 py-1.5 border rounded-lg text-xs"
                            />
                            <input
                              type="number"
                              placeholder="Sort Order"
                              value={editForm.sortOrder || 0}
                              onChange={(e) => setEditForm((p) => ({ ...p, sortOrder: parseInt(e.target.value) || 0 }))}
                              className="w-full px-3 py-1.5 border rounded-lg text-xs"
                            />
                          </div>

                          <div className="flex justify-end pr-2 pt-1">
                            <label className="flex items-center space-x-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={editForm.isActive !== false}
                                onChange={(e) => setEditForm((p) => ({ ...p, isActive: e.target.checked }))}
                                className="rounded border-white/15 text-power-red h-4 w-4"
                              />
                              <span className="text-xs font-bold text-zinc-500">Active</span>
                            </label>
                          </div>
                        </div>

                        <div className="flex gap-3 justify-end pt-2">
                          <button onClick={cancelEdit} className="px-4 py-1.5 rounded-lg border border-white/15 text-sm font-medium hover:bg-white/5 transition">Cancel</button>
                          <button onClick={handleUpdate} className="px-4 py-1.5 rounded-lg bg-power-red text-white text-sm font-medium hover:bg-[#C8102E] transition">Save</button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-2">
                        {/* Profile Thumbnail */}
                        <div className="w-16 h-16 rounded-2xl overflow-hidden border border-white/10 bg-white/5 shrink-0 shadow-sm">
                          {m.imageUrl ? (
                            <img
                              src={m.imageUrl.startsWith("http") ? m.imageUrl : `${apiURL.image_url}${m.imageUrl}`}
                              alt={m.nameEn || m.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[8px] font-black text-zinc-500">NO PHOTO</div>
                          )}
                        </div>

                        {/* Profile Details */}
                        <div className="flex-1 min-w-0 text-center sm:text-left">
                          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                            <span className="font-black text-zinc-100 text-sm tracking-tight uppercase">🇬🇧 {m.nameEn || m.name}</span>
                            <span className="text-zinc-400 hidden sm:inline">|</span>
                            <span className="font-bold text-zinc-500 text-xs font-bangla">🇧🇩 {m.nameBn || m.name}</span>
                            
                            <span className={`text-[9px] px-2 py-0.5 rounded-full font-black uppercase tracking-wider ${m.isActive !== false ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                              {m.isActive !== false ? "Active" : "Inactive"}
                            </span>
                            <span className="text-[9px] bg-power-red/10 text-power-red px-2 py-0.5 rounded-full font-bold">
                              Order: {m.sortOrder || 0}
                            </span>
                            {m.userId && (
                              <span className="text-[9px] bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full font-bold">
                                🔗 Linked to Employee
                              </span>
                            )}
                          </div>

                          <p className="text-[10px] text-amber-600 font-bold uppercase tracking-widest mb-2">
                            EN: {m.designationEn || "Instructor"} • BN: {m.designationBn || "প্রশিক্ষক"}
                          </p>

                          <div className="space-y-1 pl-0 sm:pl-3 sm:border-l-2 border-white/10">
                            <p className="text-xs text-zinc-500 font-medium line-clamp-2">EN: {m.bioEn || m.bio || "No biography provided."}</p>
                            <p className="text-xs text-zinc-500 font-bangla font-medium line-clamp-2">BN: {m.bioBn || m.bio || "কোনো জীবনী নেই।"}</p>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex sm:flex-col gap-2 shrink-0 justify-center w-full sm:w-auto mt-3 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-white/5">
                          <button
                            type="button"
                            onClick={() => startEdit(m)}
                            className="flex-1 sm:flex-initial text-center text-[10px] font-black uppercase tracking-wider px-3.5 py-2 rounded-xl bg-power-red/10 hover:bg-power-red/10 text-power-red transition"
                          >
                            Edit Profile
                          </button>
                          <button
                            type="button"
                            onClick={() => { if (confirm("Are you sure you want to delete this team member?")) deleteTM.mutate(m.id); }}
                            className="flex-1 sm:flex-initial text-center text-[10px] font-black uppercase tracking-wider px-3.5 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 transition"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-4">
              <div className="flex justify-between items-center border-b pb-2">
                <h3 className="font-bold text-zinc-100 text-sm uppercase tracking-wide">Strategic Team JSON Array Editor</h3>
                <div className="flex items-center gap-2 text-zinc-500 text-xs">
                  <AlertCircle size={14} /> Paste JSON array of team member records
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(jsonInput);
                      toast.success("Strategic Team JSON format copied!");
                    }}
                    className="px-2.5 py-1 bg-indigo-55 hover:bg-power-red/10 border border-power-red/30 text-power-red font-bold text-[10px] uppercase rounded-lg transition"
                  >
                    📋 Copy Format
                  </button>
                </div>
              </div>
              <textarea
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                rows={18}
                className="w-full p-4 font-mono text-xs border border-white/10 rounded-xl focus:outline-none bg-white/5 focus:ring-2 focus:ring-power-red/40 transition"
                placeholder="[ { ... }, { ... } ]"
              />
              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={handleApplyBulkJson}
                  disabled={!jsonInput.trim()}
                  className="px-5 py-2.5 bg-power-red hover:bg-[#C8102E] text-white rounded-xl text-xs font-black uppercase transition duration-300 disabled:opacity-50"
                >
                  Apply JSON Changes
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Interactive Showcase Device Mockup (Strategic Team Grid) */}
        <div className="sticky top-6 space-y-6">
          <div className="flex justify-between items-center bg-slate-900 text-white px-5 py-3.5 rounded-2xl border border-white/5 shadow">
            <span className="text-xs font-black uppercase tracking-widest text-zinc-500">Team Profiles Preview</span>
            <div className="flex items-center bg-slate-800 p-1 rounded-xl border border-white/5">
              <button
                type="button"
                onClick={() => setPreviewLocale("en")}
                className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase transition ${previewLocale === "en" ? "bg-red-600 text-white shadow" : "text-zinc-500 hover:text-white"}`}
              >
                🇬🇧 En
              </button>
              <button
                type="button"
                onClick={() => setPreviewLocale("bn")}
                className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase transition ${previewLocale === "bn" ? "bg-red-600 text-white shadow font-bangla" : "text-zinc-500 hover:text-white"}`}
              >
                🇧🇩 Bn
              </button>
            </div>
          </div>

          <div className="relative rounded-[2.5rem] overflow-hidden bg-[#09090b] text-white border border-white/5 p-8 shadow-2xl flex flex-col justify-between space-y-8">
            <div className="text-center">
              <span className="inline-block px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-amber-500 text-[8px] font-black tracking-widest uppercase mb-3 shadow">
                {previewLocale === "en" ? "Expert Mentors" : "দক্ষ প্রশিক্ষকবৃন্দ"}
              </span>
              <h2 className="text-xl md:text-2xl font-black text-white tracking-tight uppercase">
                {previewLocale === "en" ? "Meet The Team" : "আমাদের টিম"}
              </h2>
              <div className="w-12 h-0.5 bg-red-600 mx-auto mt-3 rounded-full"></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {(members || []).filter(m => m.isActive !== false).slice(0, 4).map((m, idx) => {
                const name = previewLocale === "en" ? m.nameEn || m.name : m.nameBn || m.name;
                const desig = previewLocale === "en" ? m.designationEn || "Instructor" : m.designationBn || "প্রশিক্ষক";
                const bio = previewLocale === "en" ? m.bioEn || m.bio : m.bioBn || m.bio;
                return (
                  <div key={idx} className="relative bg-white/5[0.02] border border-white/5 p-4 rounded-2xl flex flex-col items-center hover:bg-white/10 transition duration-500 group overflow-hidden text-center">
                    <div className="w-16 h-16 rounded-xl overflow-hidden border border-white/5 mx-auto mb-3 shrink-0 bg-slate-900 shadow">
                      {m.imageUrl ? (
                        <img src={m.imageUrl.startsWith("http") ? m.imageUrl : `${apiURL.image_url}${m.imageUrl}`} alt={name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[8px] text-zinc-500 font-bold">PHOTO</div>
                      )}
                    </div>
                    <h3 className="text-xs font-bold text-white tracking-tight mb-1 truncate w-full">{name || "Member Name"}</h3>
                    <p className="text-amber-500 font-bold text-[7px] tracking-widest uppercase mb-2 truncate w-full">{desig}</p>
                    <p className="text-zinc-500 text-[8px] leading-relaxed line-clamp-2">{bio || "Bio description..."}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrategicTeamEditor;
