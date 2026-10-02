import React, { useState } from "react";
import { useTestimonials, useCreateTestimonial, useUpdateTestimonial, useDeleteTestimonial } from "../../../hooks/useCms";
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

const TestimonialsEditor = () => {
  const { data: testimonials, isLoading } = useTestimonials();
  const createTM = useCreateTestimonial();
  const updateTM = useUpdateTestimonial();
  const deleteTM = useDeleteTestimonial();

  const [newForm, setNewForm] = useState({
    studentNameEn: "",
    studentNameBn: "",
    designationEn: "",
    designationBn: "",
    messageEn: "",
    messageBn: "",
    image_url: "",
    rating: 5,
    sort_order: 0,
  });
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [editorMode, setEditorMode] = useState("visual");
  const [jsonInput, setJsonInput] = useState("");

  const [isUploadingNew, setIsUploadingNew] = useState(false);
  const [isUploadingEdit, setIsUploadingEdit] = useState(false);

  // Preview States
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
    if (!newForm.studentNameEn || !newForm.messageEn) {
      toast.error("English student name and message are required!");
      return;
    }
    createTM.mutate({
      student_name_en: newForm.studentNameEn,
      student_name_bn: newForm.studentNameBn || newForm.studentNameEn,
      designation_en: newForm.designationEn,
      designation_bn: newForm.designationBn || newForm.designationEn,
      message_en: newForm.messageEn,
      message_bn: newForm.messageBn || newForm.messageEn,
      image_url: newForm.image_url,
      rating: newForm.rating,
      sort_order: newForm.sort_order,
    });
    setNewForm({
      studentNameEn: "",
      studentNameBn: "",
      designationEn: "",
      designationBn: "",
      messageEn: "",
      messageBn: "",
      image_url: "",
      rating: 5,
      sort_order: 0,
    });
  };

  const startEdit = (t) => {
    setEditId(t.id);
    setEditForm({
      id: t.id,
      studentNameEn: t.studentNameEn || t.studentName,
      studentNameBn: t.studentNameBn || t.studentName,
      designationEn: t.designationEn || t.designation || "",
      designationBn: t.designationBn || t.designation || "",
      messageEn: t.messageEn || t.message || "",
      messageBn: t.messageBn || t.message || "",
      imageUrl: t.imageUrl || "",
      rating: t.rating || 5,
      sortOrder: t.sortOrder || 0,
      isActive: t.isActive !== false,
    });
  };

  const cancelEdit = () => setEditId(null);

  const handleUpdate = () => {
    updateTM.mutate({
      id: editId,
      data: {
        student_name_en: editForm.studentNameEn,
        student_name_bn: editForm.studentNameBn,
        designation_en: editForm.designationEn,
        designation_bn: editForm.designationBn,
        message_en: editForm.messageEn,
        message_bn: editForm.messageBn,
        image_url: editForm.imageUrl,
        rating: editForm.rating,
        sort_order: editForm.sortOrder,
        is_active: editForm.isActive,
      },
    });
    setEditId(null);
  };

  const handleModeChange = (mode) => {
    if (mode === "visual") {
      // Handled by react-query invalidation
    } else {
      const cleanList = (testimonials || []).map((t) => ({
        id: t.id,
        studentNameEn: t.studentNameEn || t.studentName,
        studentNameBn: t.studentNameBn || t.studentName,
        designationEn: t.designationEn || t.designation || "",
        designationBn: t.designationBn || t.designation || "",
        messageEn: t.messageEn || t.message || "",
        messageBn: t.messageBn || t.message || "",
        imageUrl: t.imageUrl || "",
        rating: t.rating || 5,
        sortOrder: t.sortOrder || 0,
        isActive: t.isActive !== false,
      }));
      setJsonInput(JSON.stringify(cleanList, null, 2));
    }
    setEditorMode(mode);
  };

  const handleApplyBulkJson = async () => {
    try {
      const parsed = JSON.parse(jsonInput.trim());
      if (!Array.isArray(parsed)) throw new Error("Must be a JSON array");

      const existingMap = new Map((testimonials || []).map((t) => [t.id, t]));
      const newIds = new Set(parsed.map((item) => item.id).filter(Boolean));

      for (const t of testimonials || []) {
        if (!newIds.has(t.id)) {
          await deleteTM.mutateAsync(t.id);
        }
      }

      for (const item of parsed) {
        const payload = {
          student_name_en: item.studentNameEn || item.student_name_en,
          student_name_bn: item.studentNameBn || item.student_name_bn,
          designation_en: item.designationEn || item.designation_en,
          designation_bn: item.designationBn || item.designation_bn,
          message_en: item.messageEn || item.message_en,
          message_bn: item.messageBn || item.message_bn,
          image_url: item.imageUrl || item.image_url,
          rating: item.rating,
          sort_order: item.sortOrder || item.sort_order || 0,
          is_active: item.isActive !== false,
        };

        if (item.id && existingMap.has(item.id)) {
          await updateTM.mutateAsync({ id: item.id, data: payload });
        } else {
          await createTM.mutateAsync(payload);
        }
      }

      Swal.fire({ icon: "success", title: "Testimonials Updated!", timer: 1500, showConfirmButton: false });
      setEditorMode("visual");
    } catch (e) {
      Swal.fire("Error", e.message || "Invalid JSON array format.", "error");
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="space-y-6">
      {/* Mode Header */}
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
                <h4 className="font-bold text-zinc-200 uppercase text-xs tracking-wider border-b pb-2">Add New Testimonial</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* English Form fields */}
                  <div className="space-y-4 bg-white/5 p-5 rounded-xl border border-white/10">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-2">🇬🇧 English Translation</span>
                    <input
                      type="text"
                      placeholder="Student Name (English) *"
                      value={newForm.studentNameEn}
                      onChange={(e) => setNewForm((p) => ({ ...p, studentNameEn: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-white/10 text-sm focus:ring-2 focus:ring-power-red/40 outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Designation (English, e.g. Batch 8)"
                      value={newForm.designationEn}
                      onChange={(e) => setNewForm((p) => ({ ...p, designationEn: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-white/10 text-sm focus:ring-2 focus:ring-power-red/40 outline-none"
                    />
                    <textarea
                      placeholder="Message (English) *"
                      value={newForm.messageEn}
                      rows={3}
                      onChange={(e) => setNewForm((p) => ({ ...p, messageEn: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-white/10 text-sm focus:ring-2 focus:ring-power-red/40 outline-none"
                    />
                  </div>

                  {/* Bangla Form fields */}
                  <div className="space-y-4 bg-white/5 p-5 rounded-xl border border-white/10">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-2">🇧🇩 Bangla Translation</span>
                    <input
                      type="text"
                      placeholder="Student Name (Bangla)"
                      value={newForm.studentNameBn}
                      onChange={(e) => setNewForm((p) => ({ ...p, studentNameBn: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-white/10 text-sm focus:ring-2 focus:ring-power-red/40 outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Designation (Bangla, উদা: ব্যাচ ৮)"
                      value={newForm.designationBn}
                      onChange={(e) => setNewForm((p) => ({ ...p, designationBn: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-white/10 text-sm focus:ring-2 focus:ring-power-red/40 outline-none"
                    />
                    <textarea
                      placeholder="Message (Bangla)"
                      value={newForm.messageBn}
                      rows={3}
                      onChange={(e) => setNewForm((p) => ({ ...p, messageBn: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-white/10 text-sm focus:ring-2 focus:ring-power-red/40 outline-none"
                    />
                  </div>
                </div>

                {/* Shared Media / Sorting / Rating */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end bg-white/5 p-5 rounded-xl border border-white/10">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Student Image</label>
                    <div className="flex items-center space-x-4">
                      <div className="shrink-0">
                        {newForm.image_url ? (
                          <img
                            src={newForm.image_url.startsWith("http") ? newForm.image_url : `${apiURL.image_url}${newForm.image_url}`}
                            alt="Student Preview"
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
                          className="block w-full text-xs text-zinc-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-[10px] file:font-black file:uppercase file:bg-power-red/10 file:text-power-red hover:file:bg-power-red/10 cursor-pointer transition-all"
                          disabled={isUploadingNew}
                        />
                      </label>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Rating</label>
                      <input
                        type="number"
                        min={1}
                        max={5}
                        value={newForm.rating}
                        onChange={(e) => setNewForm((p) => ({ ...p, rating: parseInt(e.target.value) || 5 }))}
                        className="w-full px-4 py-2 rounded-xl border border-white/10 text-sm focus:ring-2 focus:ring-power-red/40 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Sort Order</label>
                      <input
                        type="number"
                        value={newForm.sort_order}
                        onChange={(e) => setNewForm((p) => ({ ...p, sort_order: parseInt(e.target.value) || 0 }))}
                        className="w-full px-4 py-2 rounded-xl border border-white/10 text-sm focus:ring-2 focus:ring-power-red/40 outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleCreate}
                    disabled={createTM.isPending}
                    className="px-8 py-3 rounded-xl bg-power-red hover:bg-[#C8102E] text-white font-bold text-sm shadow-lg shadow-power-red/20 transition disabled:opacity-50"
                  >
                    {createTM.isPending ? "Adding..." : "Add Testimonial"}
                  </button>
                </div>
              </div>

              {/* Testimonial List */}
              <div className="space-y-4">
                {(testimonials || []).map((t) => (
                  <div key={t.id} className="bg-white/5 p-6 rounded-[1.8rem] border border-white/10 shadow-sm">
                    {editId === t.id ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* English Edit fields */}
                          <div className="space-y-3 bg-white/5 p-4 rounded-xl border border-white/10">
                            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block">🇬🇧 English translation</span>
                            <input
                              type="text"
                              value={editForm.studentNameEn || ""}
                              onChange={(e) => setEditForm((p) => ({ ...p, studentNameEn: e.target.value }))}
                              className="w-full px-3 py-2 border rounded-lg text-sm"
                              placeholder="Student Name"
                            />
                            <input
                              type="text"
                              value={editForm.designationEn || ""}
                              onChange={(e) => setEditForm((p) => ({ ...p, designationEn: e.target.value }))}
                              className="w-full px-3 py-2 border rounded-lg text-sm"
                              placeholder="Designation"
                            />
                            <textarea
                              value={editForm.messageEn || ""}
                              onChange={(e) => setEditForm((p) => ({ ...p, messageEn: e.target.value }))}
                              rows={2}
                              className="w-full px-3 py-2 border rounded-lg text-sm"
                              placeholder="Message"
                            />
                          </div>

                          {/* Bangla Edit fields */}
                          <div className="space-y-3 bg-white/5 p-4 rounded-xl border border-white/10">
                            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block">🇧🇩 Bangla translation</span>
                            <input
                              type="text"
                              value={editForm.studentNameBn || ""}
                              onChange={(e) => setEditForm((p) => ({ ...p, studentNameBn: e.target.value }))}
                              className="w-full px-3 py-2 border rounded-lg text-sm"
                              placeholder="Student Name (Bangla)"
                            />
                            <input
                              type="text"
                              value={editForm.designationBn || ""}
                              onChange={(e) => setEditForm((p) => ({ ...p, designationBn: e.target.value }))}
                              className="w-full px-3 py-2 border rounded-lg text-sm"
                              placeholder="Designation (Bangla)"
                            />
                            <textarea
                              value={editForm.messageBn || ""}
                              onChange={(e) => setEditForm((p) => ({ ...p, messageBn: e.target.value }))}
                              rows={2}
                              className="w-full px-3 py-2 border rounded-lg text-sm"
                              placeholder="Message (Bangla)"
                            />
                          </div>
                        </div>

                        {/* Shared Image upload / parameters */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white/5 p-4 rounded-xl border border-white/10 items-center">
                          <div>
                            <label className="block text-[10px] font-bold text-zinc-500 uppercase mb-1">Student Image</label>
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
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[10px] font-bold text-zinc-500 uppercase mb-1">Rating</label>
                              <input
                                type="number"
                                min={1}
                                max={5}
                                value={editForm.rating || 5}
                                onChange={(e) => setEditForm((p) => ({ ...p, rating: parseInt(e.target.value) || 5 }))}
                                className="w-full px-3 py-1.5 border rounded-lg text-xs"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-zinc-500 uppercase mb-1">Sort Order</label>
                              <input
                                type="number"
                                value={editForm.sortOrder || 0}
                                onChange={(e) => setEditForm((p) => ({ ...p, sortOrder: parseInt(e.target.value) || 0 }))}
                                className="w-full px-3 py-1.5 border rounded-lg text-xs"
                              />
                            </div>
                          </div>
                          <div className="flex justify-end pr-2 pt-2">
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
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-black text-zinc-100 text-sm uppercase tracking-tight">🇬🇧 {t.studentNameEn || t.studentName}</span>
                            <span className="text-zinc-400">/</span>
                            <span className="font-bold text-zinc-500 text-xs font-bangla">🇧🇩 {t.studentNameBn || t.studentName}</span>
                            {t.rating && <span className="text-yellow-500 text-xs">{'★'.repeat(t.rating)}</span>}
                            {!t.isActive && <span className="text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-bold ml-2">Inactive</span>}
                          </div>
                          <p className="text-xs text-zinc-500 uppercase tracking-widest font-black mb-2">
                            EN: {t.designationEn || "Graduate"} | BN: {t.designationBn || "গ্রাজুয়েট"}
                          </p>
                          <div className="space-y-1 pl-3 border-l-2 border-power-red/30">
                            <p className="text-xs text-zinc-500 font-medium">EN: {t.messageEn || t.message}</p>
                            <p className="text-xs text-zinc-500 font-bangla font-medium">BN: {t.messageBn || t.message}</p>
                          </div>
                        </div>
                        <div className="flex gap-2 shrink-0">
                          <button onClick={() => startEdit(t)} className="text-xs px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-zinc-200 font-bold transition uppercase tracking-wider">Edit</button>
                          <button onClick={() => { if (confirm("Delete?")) deleteTM.mutate(t.id); }}
                            className="text-xs px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 font-bold transition uppercase tracking-wider">Delete</button>
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
                <h3 className="font-bold text-zinc-100 text-sm uppercase tracking-wide">Testimonials JSON Array Editor</h3>
                <div className="flex items-center gap-2 text-zinc-500 text-xs">
                  <AlertCircle size={14} /> Paste JSON array of testimonial records
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(jsonInput);
                      toast.success("Testimonials JSON format copied!");
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

        {/* Right Side: Interactive Showcase Device Mockup (Testimonials List) */}
        <div className="sticky top-6 space-y-6">
          <div className="flex justify-between items-center bg-slate-900 text-white px-5 py-3.5 rounded-2xl border border-white/5 shadow">
            <span className="text-xs font-black uppercase tracking-widest text-zinc-500">Student Reviews Preview</span>
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
                {previewLocale === "en" ? "Institutional Testimony" : "ইনস্টিটিউশনাল টেস্টিমনি"}
              </span>
              <h2 className="text-xl md:text-2xl font-black text-white tracking-tight uppercase">
                {previewLocale === "en" ? "What Our Students Say" : "শিক্ষার্থীদের মতামত"}
              </h2>
              <div className="w-12 h-0.5 bg-red-600 mx-auto mt-3 rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {(testimonials || []).filter(t => t.isActive !== false).slice(0, 2).map((t, idx) => {
                const name = previewLocale === "en" ? t.studentNameEn || t.studentName : t.studentNameBn || t.studentName;
                const desig = previewLocale === "en" ? t.designationEn || "Graduate" : t.designationBn || "গ্রাজুয়েট";
                const msg = previewLocale === "en" ? t.messageEn || t.message : t.messageBn || t.message;
                return (
                  <div key={idx} className="relative bg-white/5[0.02] border border-white/5 p-6 rounded-2xl flex flex-col justify-between hover:bg-white/10 transition duration-500 group overflow-hidden">
                    <div className="relative mb-4">
                      <span className="text-amber-500/10 text-3xl font-serif absolute -top-4 -left-4">“</span>
                      <p className="text-zinc-400 text-xs leading-relaxed pl-2 relative z-10 pt-1 line-clamp-3">{msg || "Quote text here..."}</p>
                    </div>
                    <div className="flex items-center gap-3 pt-3 border-t border-white/5">
                      <div className="w-9 h-9 rounded-xl overflow-hidden border border-white/5 shrink-0 bg-slate-900">
                        {t.imageUrl ? (
                          <img src={t.imageUrl.startsWith("http") ? t.imageUrl : `${apiURL.image_url}${t.imageUrl}`} alt={name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[7px] text-zinc-500 font-bold">PIC</div>
                        )}
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-xs">{name || "Student Name"}</h4>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <div className="w-1 h-1 rounded-full bg-red-600"></div>
                          <span className="text-[7px] text-zinc-500 uppercase tracking-widest font-black">{desig}</span>
                        </div>
                      </div>
                    </div>
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

export default TestimonialsEditor;
