import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateBlog } from "../../hooks/useBlogs";
import Swal from "sweetalert2";

const slugify = (value) =>
  value
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");

const AddBlog = () => {
  const navigate = useNavigate();
  const createBlogMutation = useCreateBlog();
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [editMode, setEditMode] = useState("visual");
  const [rawJsonText, setRawJsonText] = useState("");
  const [form, setForm] = useState({
    titleEn: "",
    titleBn: "",
    slug: "",
    excerptEn: "",
    excerptBn: "",
    contentEn: "",
    contentBn: "",
    coverImageUrl: "",
    tags: "",
    seoTitleEn: "",
    seoTitleBn: "",
    seoDescriptionEn: "",
    seoDescriptionBn: "",
    status: "draft",
    isFeatured: false,
  });

  useEffect(() => {
    if (form.titleEn && !form.slug) {
      setForm((prev) => ({ ...prev, slug: slugify(prev.titleEn) }));
    }
  }, [form.titleEn, form.slug]);

  const handleToggleMode = (mode) => {
    if (mode === "json") {
      setRawJsonText(JSON.stringify(form, null, 2));
    } else {
      try {
        const parsed = JSON.parse(rawJsonText);
        setForm({
          titleEn: parsed.titleEn || "",
          titleBn: parsed.titleBn || "",
          slug: parsed.slug || "",
          excerptEn: parsed.excerptEn || "",
          excerptBn: parsed.excerptBn || "",
          contentEn: parsed.contentEn || "",
          contentBn: parsed.contentBn || "",
          coverImageUrl: parsed.coverImageUrl || "",
          tags: parsed.tags || "",
          seoTitleEn: parsed.seoTitleEn || "",
          seoTitleBn: parsed.seoTitleBn || "",
          seoDescriptionEn: parsed.seoDescriptionEn || "",
          seoDescriptionBn: parsed.seoDescriptionBn || "",
          status: parsed.status || "draft",
          isFeatured: parsed.isFeatured || false,
        });
      } catch (err) {
        Swal.fire("JSON Parse Error", "The JSON is invalid and cannot be mapped to Visual mode.", "error");
        return;
      }
    }
    setEditMode(mode);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const append = (formData, key, value) => {
    if (value !== undefined && value !== null) formData.append(key, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    let submissionForm = form;
    if (editMode === "json") {
      try {
        submissionForm = JSON.parse(rawJsonText);
      } catch (err) {
        return Swal.fire("JSON Parse Error", "The JSON is invalid and cannot be saved.", "error");
      }
    }

    if (!submissionForm.titleEn?.trim()) return Swal.fire("Error", "English title is required", "error");
    if (!submissionForm.slug?.trim()) return Swal.fire("Error", "Slug is required", "error");

    const formData = new FormData();
    append(formData, "titleEn", submissionForm.titleEn.trim());
    append(formData, "titleBn", (submissionForm.titleBn || "").trim());
    append(formData, "slug", submissionForm.slug.trim());
    append(formData, "excerptEn", (submissionForm.excerptEn || "").trim());
    append(formData, "excerptBn", (submissionForm.excerptBn || "").trim());
    append(formData, "contentEn", submissionForm.contentEn || "");
    append(formData, "contentBn", submissionForm.contentBn || "");
    append(formData, "seoTitleEn", (submissionForm.seoTitleEn || "").trim());
    append(formData, "seoTitleBn", (submissionForm.seoTitleBn || "").trim());
    append(formData, "seoDescriptionEn", (submissionForm.seoDescriptionEn || "").trim());
    append(formData, "seoDescriptionBn", (submissionForm.seoDescriptionBn || "").trim());
    append(formData, "status", submissionForm.status || "draft");
    append(formData, "isFeatured", submissionForm.isFeatured ? "true" : "false");

    const tagsValue = submissionForm.tags || "";
    tagsValue
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean)
      .forEach((tag, idx) => formData.append(`tags[${idx}]`, tag));

    if (photoFile) formData.append("photo", photoFile);
    else if (submissionForm.coverImageUrl?.trim()) formData.append("cover_image_url", submissionForm.coverImageUrl.trim());

    createBlogMutation.mutate(formData, {
      onSuccess: () => navigate("/admin/blogs"),
    });
  };

  return (
    <div className="card-premium max-w-5xl mx-auto mt-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
        <div>
          <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Create Blog Post</h1>
          <p className="text-slate-500 text-sm font-medium mt-1">One post, English and Bangla fields in same record</p>
        </div>
        <div className="flex items-center gap-3 self-end sm:self-auto">
          <div className="flex rounded-xl bg-slate-100 p-1 border border-slate-200">
            <button
              type="button"
              onClick={() => handleToggleMode("visual")}
              className={`px-4 py-1.5 text-xs font-black uppercase tracking-wider rounded-lg transition-all ${
                editMode === "visual"
                  ? "bg-white text-slate-800 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Visual
            </button>
            <button
              type="button"
              onClick={() => handleToggleMode("json")}
              className={`px-4 py-1.5 text-xs font-black uppercase tracking-wider rounded-lg transition-all ${
                editMode === "json"
                  ? "bg-white text-slate-800 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              JSON
            </button>
          </div>
          <button type="button" onClick={() => navigate("/admin/blogs")} className="btn-secondary py-2 px-3 text-xs">
            Cancel
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {editMode === "json" ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-bold text-slate-700">Raw JSON Payload</label>
              <button
                type="button"
                onClick={() => {
                  try {
                    const parsed = JSON.parse(rawJsonText);
                    setRawJsonText(JSON.stringify(parsed, null, 2));
                    Swal.fire("Format Success", "JSON formatted successfully", "success");
                  } catch (e) {
                    Swal.fire("Format Error", "Invalid JSON structure", "error");
                  }
                }}
                className="text-xs font-bold text-indigo-600 hover:underline"
              >
                Format JSON
              </button>
            </div>
            <textarea
              value={rawJsonText}
              onChange={(e) => setRawJsonText(e.target.value)}
              className="w-full h-[550px] p-5 font-mono text-xs bg-slate-900 text-slate-100 rounded-2xl border border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-inner"
              placeholder="Paste raw JSON here..."
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-slate-50 rounded-2xl border border-slate-200 mt-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Cover Image File (Optional)</label>
                <input type="file" accept="image/*" onChange={handleFileChange} className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700" />
                {photoPreview && <img src={photoPreview} alt="Preview" className="mt-4 w-72 h-44 object-cover rounded-2xl border border-slate-200" />}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field label="Title EN" name="titleEn" value={form.titleEn} onChange={handleChange} required />
            <Field label="Title BN" name="titleBn" value={form.titleBn} onChange={handleChange} />
            <Field className="md:col-span-2" label="Slug" name="slug" value={form.slug} onChange={handleChange} required mono />
            <TextArea label="Excerpt EN" name="excerptEn" value={form.excerptEn} onChange={handleChange} />
            <TextArea label="Excerpt BN" name="excerptBn" value={form.excerptBn} onChange={handleChange} />
            <TextArea label="Content EN" name="contentEn" value={form.contentEn} onChange={handleChange} rows={10} mono />
            <TextArea label="Content BN" name="contentBn" value={form.contentBn} onChange={handleChange} rows={10} mono />
            <Field label="SEO Title EN" name="seoTitleEn" value={form.seoTitleEn} onChange={handleChange} maxLength={70} />
            <Field label="SEO Title BN" name="seoTitleBn" value={form.seoTitleBn} onChange={handleChange} maxLength={70} />
            <TextArea label="SEO Description EN" name="seoDescriptionEn" value={form.seoDescriptionEn} onChange={handleChange} maxLength={170} />
            <TextArea label="SEO Description BN" name="seoDescriptionBn" value={form.seoDescriptionBn} onChange={handleChange} maxLength={170} />
            <Field className="md:col-span-2" label="Tags / Categories" name="tags" value={form.tags} onChange={handleChange} placeholder="chef, career, tips" />
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Status</label>
              <select name="status" value={form.status} onChange={handleChange} className="w-full">
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>
            <div className="flex items-center space-x-2 bg-slate-50 p-3 rounded-2xl border border-slate-200 self-end h-[46px]">
              <input
                type="checkbox"
                id="isFeatured"
                name="isFeatured"
                checked={form.isFeatured}
                onChange={handleChange}
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer"
              />
              <label htmlFor="isFeatured" className="text-sm font-bold text-slate-700 cursor-pointer select-none">
                Feature this Blog Post (Show on Home)
              </label>
            </div>
            <Field label="Or Image URL" name="coverImageUrl" value={form.coverImageUrl} onChange={handleChange} />
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-slate-700 mb-2">Cover Image</label>
              <input type="file" accept="image/*" onChange={handleFileChange} className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700" />
              {photoPreview && <img src={photoPreview} alt="Preview" className="mt-4 w-72 h-44 object-cover rounded-2xl border border-slate-200" />}
            </div>
          </div>
        )}

        <div className="flex justify-end gap-3 pt-6 border-t border-slate-100/60">
          <button type="button" onClick={() => navigate("/admin/blogs")} className="btn-secondary">
            Cancel
          </button>
          <button type="submit" disabled={createBlogMutation.isPending} className="btn-primary">
            {createBlogMutation.isPending ? "Creating..." : "Save Blog"}
          </button>
        </div>
      </form>
    </div>
  );
};

const Field = ({ label, className = "", mono = false, ...props }) => (
  <div className={className}>
    <label className="block text-sm font-bold text-slate-700 mb-2">{label}</label>
    <input {...props} className={`w-full ${mono ? "font-mono text-sm" : ""}`} />
  </div>
);

const TextArea = ({ label, rows = 3, mono = false, ...props }) => (
  <div>
    <label className="block text-sm font-bold text-slate-700 mb-2">{label}</label>
    <textarea {...props} rows={rows} className={`w-full ${mono ? "font-mono text-sm" : "text-sm"}`} />
  </div>
);

export default AddBlog;
