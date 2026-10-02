import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { 
   useCreateCourse, 
   useUpdateCourse, 
   useCourse 
} from "../../hooks/useCourses";
import Loader from "../../components/Loader";
import Swal from "sweetalert2";
import useAuth from "../../store/useAuth";
import { Check, BookOpen, ChevronDown, Layout, Code } from "lucide-react";

const additionalInfoOptions = [
  { value: "haccp&hygiene", label: "HACCP & Hygiene" },
  { value: "city&guild", label: "City & Guilds" },
  { value: "nsda", label: "NSDA" },
];

const COURSE_JSON_TEMPLATE = {
  course_name: "Artisanal Baking & Pastry Arts",
  course_name_bn: "আর্টিসানাল বেকিং এবং পেস্ট্রি আর্টস",
  course_code: "CIB-ABP-101",
  duration_value: "6",
  duration_unit: "months",
  base_fee: "45000",
  description: "Learn professional bakery operations, dough science, and classic french pastries.",
  description_bn: "পেশাদার বেকারি অপারেশন, ময়দার বিজ্ঞান এবং ক্লাসিক ফ্রেঞ্চ পেস্ট্রি তৈরি শিখুন।",
  additional_info: ["haccp&hygiene", "city&guild"],
  is_active: true
};

const AddCourse = ({ mode = "add" }) => {
  const { id: courseId } = useParams();
  const navigate = useNavigate();
  const { authUser } = useAuth(); 

  // Mutations & Queries
  const createCourseMutation = useCreateCourse();
  const updateCourseMutation = useUpdateCourse();
  const { data: courseData, isLoading: courseLoading } = useCourse(mode === 'edit' ? courseId : null);

  const [form, setForm] = useState({
    course_name: "",
    course_name_bn: "",
    course_code: "",
    duration_value: "",
    duration_unit: "months",
    base_fee: "",
    description: "",
    description_bn: "",
    additional_info: [],
    is_active: true,
  });

  const [showDropdown, setShowDropdown] = useState(false);
  const [customInfo, setCustomInfo] = useState("");

  // Dual Edit Modes: "visual" or "json"
  const [editMode, setEditMode] = useState("visual");
  const [rawJsonText, setRawJsonText] = useState("");

  // Sync loaded edit data
  useEffect(() => {
    if (mode === "edit" && courseData) {
      const infoArray = Array.isArray(courseData.additional_info) 
        ? courseData.additional_info 
        : (courseData.additional_info ? [courseData.additional_info] : []);

      const initialForm = {
        course_name: courseData.course_name || "",
        course_name_bn: courseData.courseNameBn || courseData.course_name_bn || "",
        course_code: courseData.course_code || "",
        duration_value: courseData.duration?.value?.toString() || "",
        duration_unit: courseData.duration?.unit || "months",
        base_fee: courseData.base_fee?.toString() || "", 
        description: courseData.description || "",
        description_bn: courseData.descriptionBn || courseData.description_bn || "",
        additional_info: infoArray,
        is_active: courseData.is_active ?? true,
      };

      setForm(initialForm);
      setRawJsonText(JSON.stringify(initialForm, null, 2));
    } else {
      setRawJsonText(JSON.stringify(form, null, 2));
    }
  }, [mode, courseData]);

  const handleToggleMode = (selectedMode) => {
    if (selectedMode === "json") {
      setRawJsonText(JSON.stringify(form, null, 2));
    } else {
      try {
        const parsed = JSON.parse(rawJsonText);
        if (parsed && typeof parsed === "object") {
          setForm({
            course_name: parsed.course_name || "",
            course_name_bn: parsed.course_name_bn || "",
            course_code: parsed.course_code || "",
            duration_value: parsed.duration_value || "",
            duration_unit: parsed.duration_unit || "months",
            base_fee: parsed.base_fee || "",
            description: parsed.description || "",
            description_bn: parsed.description_bn || "",
            additional_info: parsed.additional_info || [],
            is_active: parsed.is_active ?? true,
          });
        }
      } catch (e) {
        Swal.fire("JSON Parse Error", "The JSON is invalid and cannot be mapped to Visual mode.", "error");
        return;
      }
    }
    setEditMode(selectedMode);
  };

  const handleCopyCurrentJson = () => {
    navigator.clipboard.writeText(JSON.stringify(form, null, 2));
    Swal.fire({
      icon: "success",
      title: "Copied!",
      text: "Current JSON data copied to clipboard.",
      timer: 1000,
      showConfirmButton: false,
    });
  };

  const handleCopyTemplateJson = () => {
    navigator.clipboard.writeText(JSON.stringify(COURSE_JSON_TEMPLATE, null, 2));
    Swal.fire({
      icon: "success",
      title: "Template Copied!",
      text: "AI JSON Template copied to clipboard.",
      timer: 1200,
      showConfirmButton: false,
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ 
      ...prev, 
      [name]: type === "checkbox" ? checked : value 
    }));
  };

  // Certifications Multi-select
  const handleToggleCert = (optValue) => {
    const current = form.additional_info;
    const updated = current.includes(optValue) 
      ? current.filter(v => v !== optValue) 
      : [...current, optValue];
    setForm(prev => ({ ...prev, additional_info: updated }));
  };

  const handleAddCustomCert = (e) => {
    e?.preventDefault();
    const val = customInfo.trim();
    if (val && !form.additional_info.includes(val)) {
      setForm(prev => ({ ...prev, additional_info: [...prev.additional_info, val] }));
    }
    setCustomInfo("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let finalForm = { ...form };
    if (editMode === "json") {
      try {
        const parsed = JSON.parse(rawJsonText);
        if (parsed && typeof parsed === "object") {
          finalForm = parsed;
        } else {
          return Swal.fire("Error", "JSON must be an object", "error");
        }
      } catch (err) {
        return Swal.fire("Error", "Invalid JSON format. Please fix prior to saving.", "error");
      }
    }

    if (!finalForm.course_name || !finalForm.course_name.trim()) return Swal.fire("Error", "Course Name is required", "error");
    if (!finalForm.course_code || !finalForm.course_code.trim()) return Swal.fire("Error", "Course Code is required", "error");
    if (!finalForm.duration_value) return Swal.fire("Error", "Duration Value is required", "error");
    if (!finalForm.base_fee) return Swal.fire("Error", "Base Fee is required", "error");

    const coursePayload = {
      course_name: finalForm.course_name.trim(),
      courseNameBn: finalForm.course_name_bn ? finalForm.course_name_bn.trim() : null,
      course_code: finalForm.course_code.trim(),
      duration_value: Number(finalForm.duration_value),
      duration_unit: finalForm.duration_unit,
      base_fee: Number(finalForm.base_fee), 
      description: finalForm.description ? finalForm.description.trim() : "",
      descriptionBn: finalForm.description_bn ? finalForm.description_bn.trim() : null,
      additional_info: finalForm.additional_info || [],
      is_active: finalForm.is_active
    };

    try {
      if (mode === "edit") {
        await updateCourseMutation.mutateAsync({ id: courseId, formData: coursePayload });
      } else {
        await createCourseMutation.mutateAsync(coursePayload);
      }

      Swal.fire({
        icon: "success",
        title: "Success",
        text: `Course ${mode === "edit" ? "updated" : "created"} successfully!`,
        timer: 2000,
        showConfirmButton: false
      });
      navigate("/admin/all-courses");
    } catch (err) {
      console.error(err);
    }
  };

  const isLoading = courseLoading || createCourseMutation.isPending || updateCourseMutation.isPending;

  if (isLoading && mode === "edit" && !courseData) return <Loader />;

  return (
    <div className="p-8 max-w-4xl mx-auto relative">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 pb-4 border-b border-white/5">
        <div>
          <h1 className="text-2xl font-black text-white uppercase tracking-tight">
            {mode === "edit" ? "Edit Operational Course" : "Create New Course"}
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            Configure the core operational settings, fees, and certifications for this course.
          </p>
        </div>
        
        <div className="flex items-center gap-3 mt-4 md:mt-0">
          {/* Edit Mode Toggle Switch */}
          <div className="flex items-center bg-white/5 p-1.5 rounded-xl border border-white/10">
            <button
              type="button"
              onClick={() => handleToggleMode("visual")}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-black tracking-wider uppercase transition-all ${
                editMode === "visual"
                  ? "bg-white/5 text-power-red shadow-sm"
                  : "text-zinc-500 hover:text-zinc-100"
              }`}
            >
              <Layout size={14} /> Visual Mode
            </button>
            <button
              type="button"
              onClick={() => handleToggleMode("json")}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-black tracking-wider uppercase transition-all ${
                editMode === "json"
                  ? "bg-white/5 text-power-red shadow-sm"
                  : "text-zinc-500 hover:text-zinc-100"
              }`}
            >
              <Code size={14} /> Raw JSON Mode
            </button>
          </div>
          <button 
            onClick={() => navigate("/admin/all-courses")} 
            type="button" 
            className="text-[10px] font-black tracking-wider uppercase text-zinc-500 hover:text-white bg-white/5 hover:bg-white/5 px-3.5 py-2 rounded-xl transition-all border border-white/5"
          >
            CANCEL
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {editMode === "visual" ? (
          <>
            {/* Core details */}
            <div className="bg-white/5 p-6 rounded-[2rem] space-y-4 shadow-sm border border-white/5">
              <h2 className="font-bold text-zinc-100 text-md border-b border-white/5 pb-2 flex items-center gap-2">
                <BookOpen size={18} className="text-power-red" /> Operational Course Configuration
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase text-zinc-500 mb-1">
                    Course Name (English) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="course_name"
                    value={form.course_name}
                    onChange={handleChange}
                    placeholder="e.g. Professional Chef Course"
                    className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-zinc-500 mb-1">
                    Course Name (Bangla)
                  </label>
                  <input
                    type="text"
                    name="course_name_bn"
                    value={form.course_name_bn}
                    onChange={handleChange}
                    placeholder="যেমন: প্রফেশনাল শেফ কোর্স"
                    className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-zinc-500 mb-1">
                  Course Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="course_code"
                  value={form.course_code}
                  onChange={handleChange}
                  placeholder="e.g. CHEF-001"
                  className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none"
                  required
                  disabled={mode === "edit"}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase text-zinc-500 mb-1">
                    Duration Value <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="duration_value"
                    value={form.duration_value}
                    onChange={handleChange}
                    placeholder="e.g. 6"
                    className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-zinc-500 mb-1">
                    Duration Unit <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="duration_unit"
                    value={form.duration_unit}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg text-sm bg-white/5 focus:outline-none"
                  >
                    <option value="days">Days</option>
                    <option value="weeks">Weeks</option>
                    <option value="months">Months</option>
                    <option value="years">Years</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-zinc-500 mb-1">
                    Base Fee (BDT) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="base_fee"
                    value={form.base_fee}
                    onChange={handleChange}
                    placeholder="e.g. 45000"
                    className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-zinc-500 mb-1">
                  Internal Description (English)
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Operational training description..."
                  className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-zinc-500 mb-1">
                  Internal Description (Bangla)
                </label>
                <textarea
                  name="description_bn"
                  value={form.description_bn}
                  onChange={handleChange}
                  rows={3}
                  placeholder="কোর্সের বিবরণ (বাংলা)..."
                  className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none"
                />
              </div>

              <div className="flex items-center space-x-3 pt-2">
                <input
                  type="checkbox"
                  name="is_active"
                  id="is_active"
                  checked={form.is_active}
                  onChange={handleChange}
                  className="w-4 h-4 text-power-red border-white/15 rounded focus:ring-power-red/40 accent-power-red cursor-pointer"
                />
                <label htmlFor="is_active" className="text-sm font-bold text-zinc-500 select-none cursor-pointer">
                  Active Operational Status
                </label>
              </div>
            </div>

            {/* Certifications and Additional Info */}
            <div className="bg-white/5 p-6 rounded-[2rem] space-y-4 shadow-sm border border-white/5">
              <h2 className="font-bold text-zinc-100 text-sm border-b border-white/5 pb-2">
                Certifications & Affiliation Tags
              </h2>
              
              <div className="flex flex-wrap gap-3">
                {additionalInfoOptions.map((opt) => {
                  const selected = form.additional_info.includes(opt.value);
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => handleToggleCert(opt.value)}
                      className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold tracking-wide uppercase border transition-all ${
                        selected 
                          ? "bg-power-red/10 border-power-red/30 text-power-red shadow-sm shadow-power-red/20"
                          : "bg-white/5 border-white/10 text-zinc-500 hover:border-white/15"
                      }`}
                    >
                      <span>{opt.label}</span>
                      {selected && <Check size={12} className="stroke-[3]" />}
                    </button>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-white/5">
                <label className="block text-xs font-black uppercase text-zinc-500 mb-2">
                  Add Custom Affiliation Tag
                </label>
                <div className="flex max-w-md gap-2">
                  <input
                    type="text"
                    value={customInfo}
                    onChange={(e) => setCustomInfo(e.target.value)}
                    placeholder="e.g. Pearson VUE"
                    className="flex-1 px-4 py-2 border rounded-lg text-sm focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddCustomCert}
                    className="px-4 py-2 bg-white/5 hover:bg-white/10 text-zinc-500 text-xs font-black rounded-lg uppercase tracking-wider transition-all"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-white/5 p-6 rounded-[2rem] space-y-4 border border-white/5">
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <span className="font-bold text-zinc-100 text-sm">Raw Course JSON Configuration</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleCopyTemplateJson}
                  className="text-[10px] text-power-red hover:text-power-red font-black tracking-wider uppercase border border-power-red/30 bg-power-red/10 px-2.5 py-1.5 rounded-lg transition-all"
                >
                  Copy AI Template
                </button>
                <button
                  type="button"
                  onClick={handleCopyCurrentJson}
                  className="text-[10px] text-power-red hover:text-power-red font-black tracking-wider uppercase border border-power-red/30 bg-power-red/10 px-2.5 py-1.5 rounded-lg transition-all"
                >
                  Copy Current JSON
                </button>
              </div>
            </div>
            <p className="text-[10px] text-zinc-500">Advanced: Paste course configuration directly in JSON format below.</p>
            <textarea
              value={rawJsonText}
              onChange={(e) => setRawJsonText(e.target.value)}
              className="w-full px-4 py-3 border rounded-xl font-mono text-xs focus:outline-none bg-slate-900 text-slate-100"
              rows={20}
            />
          </div>
        )}

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full py-4 bg-[#EF233C] hover:bg-[#C8102E] text-white rounded-2xl text-sm font-black shadow-lg shadow-power-red/20 tracking-widest transition uppercase disabled:opacity-50 active:scale-[0.98]"
        >
          {isLoading ? "Saving..." : mode === 'edit' ? 'Update Course' : 'Create Course'}
        </button>
      </form>
    </div>
  );
};

export default AddCourse;