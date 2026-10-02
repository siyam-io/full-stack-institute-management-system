import React, { useState } from "react";
import { useSection, useUpdateSection } from "../../../hooks/useCms";
import Loader from "../../../components/Loader";
import Swal from "sweetalert2";
import { Trash2, ChevronLeft, ChevronRight } from "lucide-react";
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

const resolveImageUrl = (url) => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  if (url.startsWith("/images/")) return `http://localhost:3000${url}`;
  return `${apiURL.image_url}${url}`;
};

const HomeHeroEditor = () => {
  const { data: section, isLoading } = useSection("home_hero");
  const updateSection = useUpdateSection();

  const [form, setForm] = useState(null);
  const [initialized, setInitialized] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [editorMode, setEditorMode] = useState("visual");
  const [jsonInput, setJsonInput] = useState("");

  // Preview States
  const [previewLocale, setPreviewLocale] = useState("en");
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  React.useEffect(() => {
    if (section && !initialized) {
      const dataEn = section.dataEn || {};
      const dataBn = section.dataBn || {};

      const slidesEn = dataEn.slides || [];
      const slidesBn = dataBn.slides || [];
      const maxSlides = Math.max(slidesEn.length, slidesBn.length);
      const combinedSlides = [];
      for (let i = 0; i < maxSlides; i++) {
        combinedSlides.push({
          image: slidesEn[i]?.image || slidesBn[i]?.image || "",
          primaryButtonHref: slidesEn[i]?.primaryButtonHref || slidesBn[i]?.primaryButtonHref || "/courses",
          titleEn: slidesEn[i]?.title || "",
          subtitleEn: slidesEn[i]?.subtitle || "",
          primaryButtonTextEn: slidesEn[i]?.primaryButtonText || "",
          titleBn: slidesBn[i]?.title || "",
          subtitleBn: slidesBn[i]?.subtitle || "",
          primaryButtonTextBn: slidesBn[i]?.primaryButtonText || "",
        });
      }

      setForm({
        dataEn,
        dataBn,
        slides: combinedSlides,
        seoTitleEn: section.seoTitleEn || "",
        seoTitleBn: section.seoTitleBn || "",
        seoDescriptionEn: section.seoDescriptionEn || "",
        seoDescriptionBn: section.seoDescriptionBn || "",
        status: section.status || "published",
      });
      setInitialized(true);
    }
  }, [section, initialized]);

  if (isLoading) return <Loader />;
  if (!form) return <div className="p-8 text-center text-zinc-500">No data found. Save once to create.</div>;

  const updateField = (path, value) => {
    setForm((prev) => {
      const next = { ...prev };
      const keys = path.split(".");
      let obj = next;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!obj[keys[i]]) obj[keys[i]] = {};
        obj = obj[keys[i]];
      }
      obj[keys[keys.length - 1]] = value;
      return next;
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const url = await uploadImageFile(file);
      updateField("dataEn.heroImageUrl", url);
      updateField("dataBn.heroImageUrl", url);
      toast.success("Hero image uploaded!");
    } catch (err) {
      console.error(err);
      toast.error("Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  const updateSlide = (index, field, value) => {
    const slides = [...form.slides];
    slides[index] = { ...slides[index], [field]: value };
    updateField("slides", slides);
  };

  const addSlide = () => updateField("slides", [...form.slides, { image: "", primaryButtonHref: "/courses", titleEn: "", subtitleEn: "", primaryButtonTextEn: "", titleBn: "", subtitleBn: "", primaryButtonTextBn: "" }]);
  const removeSlide = (index) => {
    updateField("slides", form.slides.filter((_, i) => i !== index));
    if (activeSlideIndex >= form.slides.length - 1 && activeSlideIndex > 0) {
      setActiveSlideIndex(activeSlideIndex - 1);
    }
  };

  const handleSlideImageUpload = async (index, e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const url = await uploadImageFile(file);
      updateSlide(index, "image", url);
      toast.success("Slide image uploaded!");
    } catch (err) {
      console.error(err);
      toast.error("Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = () => {
    const dataEn = {
      ...form.dataEn,
      slides: form.slides.map((s) => ({
        image: s.image,
        primaryButtonHref: s.primaryButtonHref,
        title: s.titleEn,
        subtitle: s.subtitleEn,
        primaryButtonText: s.primaryButtonTextEn,
      })),
    };

    const dataBn = {
      ...form.dataBn,
      slides: form.slides.map((s) => ({
        image: s.image,
        primaryButtonHref: s.primaryButtonHref,
        title: s.titleBn,
        subtitle: s.subtitleBn,
        primaryButtonText: s.primaryButtonTextBn,
      })),
    };

    updateSection.mutate({
      sectionKey: "home_hero",
      data: {
        dataEn,
        dataBn,
        seoTitleEn: form.seoTitleEn,
        seoTitleBn: form.seoTitleBn,
        seoDescriptionEn: form.seoDescriptionEn,
        seoDescriptionBn: form.seoDescriptionBn,
        status: form.status,
      },
    });
  };

  const handleModeChange = (mode) => {
    if (mode === "visual") {
      try {
        const parsed = JSON.parse(jsonInput);
        updateField("dataEn", parsed.dataEn || {});
        updateField("dataBn", parsed.dataBn || {});
      } catch (e) {
        Swal.fire("Validation Error", "Invalid JSON format", "error");
        return;
      }
    } else {
      setJsonInput(JSON.stringify({ dataEn: form.dataEn, dataBn: form.dataBn }, null, 2));
    }
    setEditorMode(mode);
  };

  const handleApplyBulkJson = () => {
    try {
      const parsed = JSON.parse(jsonInput.trim());
      updateField("dataEn", parsed.dataEn || {});
      updateField("dataBn", parsed.dataBn || {});
      Swal.fire({ icon: "success", title: "JSON Applied!", timer: 1000, showConfirmButton: false });
      setEditorMode("visual");
    } catch (e) {
      Swal.fire("Error", "Invalid JSON", "error");
    }
  };

  // Preview computations
  const currentSlide = form.slides[activeSlideIndex] || {
    image: "",
    titleEn: "Master Your Culinary Passion",
    titleBn: "আপনার রান্নার শৈলীকে পেশাদার স্তরে নিয়ে যান",
    subtitleEn: "Culinary Academy offers top-tier chef courses.",
    subtitleBn: "ক্লিনারি ইনস্টিটিউট অব বাংলাদেশ দিচ্ছে বিশ্বমানের শেফ প্রশিক্ষণ কোর্স।",
    primaryButtonTextEn: "Explore Courses",
    primaryButtonTextBn: "কোর্সসমূহ দেখুন",
    primaryButtonHref: "/courses"
  };

  const previewImage = currentSlide.image || form.dataEn.heroImageUrl || "";
  const previewTitle = previewLocale === "en" ? currentSlide.titleEn || form.dataEn.title : currentSlide.titleBn || form.dataBn.title;
  const previewSubtitle = previewLocale === "en" ? currentSlide.subtitleEn || form.dataEn.subtitle : currentSlide.subtitleBn || form.dataBn.subtitle;
  const previewEyebrow = previewLocale === "en" ? form.dataEn.eyebrow || "CULINARY EDUCATION" : form.dataBn.eyebrow || "রন্ধনশিল্প প্রশিক্ষণ";
  const previewPrimaryBtn = previewLocale === "en" ? currentSlide.primaryButtonTextEn || form.dataEn.primaryButtonText || "Get Started" : currentSlide.primaryButtonTextBn || form.dataBn.primaryButtonText || "শুরু করুন";
  const previewSecondaryBtn = previewLocale === "en" ? form.dataEn.secondaryButtonText || "Learn More" : form.dataBn.secondaryButtonText || "আরও জানুন";

  const nextSlide = () => {
    if (form.slides.length > 0) {
      setActiveSlideIndex((activeSlideIndex + 1) % form.slides.length);
    }
  };

  const prevSlide = () => {
    if (form.slides.length > 0) {
      setActiveSlideIndex((activeSlideIndex - 1 + form.slides.length) % form.slides.length);
    }
  };

  // Hardcoded Static Stats
  const staticStats = previewLocale === "en" ? [
    { value: "500+", label: "Successful Graduates" },
    { value: "10+", label: "Professional Instructors" },
    { value: "95%", label: "Employment Rate" }
  ] : [
    { value: "৫০০+", label: "সফল গ্র্যাজুয়েট" },
    { value: "১০+", label: "পেশাদার ইন্সট্রাক্টর" },
    { value: "৯৫%", label: "চাকরির নিশ্চয়তা" }
  ];

  return (
    <div className="space-y-8">
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
        {/* Left Column: Form Editors */}
        <div className="space-y-8">
          {editorMode === "visual" ? (
            <div className="space-y-8">

              {/* Hero Slides */}
              <div className="bg-white/5 p-6 rounded-[2rem] border border-white/10 space-y-6">
                <div className="flex justify-between items-center border-b pb-3">
                  <div>
                    <h3 className="font-bold text-zinc-100 text-sm uppercase tracking-wide">Hero Slides / Banners</h3>
                    <p className="text-xs text-zinc-500 mt-1">Configure banner slides with English and Bangla content</p>
                  </div>
                  <button
                    type="button"
                    onClick={addSlide}
                    className="flex items-center gap-1.5 px-4 py-2 bg-power-red hover:bg-[#C8102E] text-white rounded-xl text-xs font-bold uppercase transition"
                  >
                    + Add Slide
                  </button>
                </div>

                {form.slides.length === 0 ? (
                  <div className="p-6 text-center text-xs text-zinc-500 font-medium bg-white/5 rounded-xl border border-dashed border-white/15">
                    No slides defined.
                  </div>
                ) : (
                  <div className="space-y-6">
                    {form.slides.map((slide, i) => (
                      <div key={i} className={`p-6 bg-white/5 border rounded-[1.5rem] relative space-y-6 shadow-sm ${activeSlideIndex === i ? "border-power-red/30 ring-2 ring-power-red/40" : "border-white/10"}`}>
                        <div className="flex justify-between items-center border-b pb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xs bg-power-red/10 text-power-red px-3 py-1 rounded-full font-black">Slide #{i + 1}</span>
                            <button
                              type="button"
                              onClick={() => setActiveSlideIndex(i)}
                              className={`text-[10px] font-bold px-2 py-0.5 rounded ${activeSlideIndex === i ? "bg-power-red text-white" : "bg-white/5 text-zinc-500"}`}
                            >
                              Viewing in Preview
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeSlide(i)}
                            className="text-zinc-500 hover:text-red-500 transition"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Slide English */}
                          <div className="space-y-4 bg-white/5 p-4 rounded-xl border border-white/5">
                            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-2">🇬🇧 English Translation</span>
                            <div>
                              <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Headline</label>
                              <input
                                type="text"
                                value={slide.titleEn || ""}
                                onChange={(e) => updateSlide(i, "titleEn", e.target.value)}
                                className="w-full px-3 py-2 border border-white/10 bg-white/5 rounded-lg text-xs"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Subheadline</label>
                              <input
                                type="text"
                                value={slide.subtitleEn || ""}
                                onChange={(e) => updateSlide(i, "subtitleEn", e.target.value)}
                                className="w-full px-3 py-2 border border-white/10 bg-white/5 rounded-lg text-xs"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">CTA Button Text</label>
                              <input
                                type="text"
                                value={slide.primaryButtonTextEn || ""}
                                onChange={(e) => updateSlide(i, "primaryButtonTextEn", e.target.value)}
                                className="w-full px-3 py-2 border border-white/10 bg-white/5 rounded-lg text-xs"
                              />
                            </div>
                          </div>

                          {/* Slide Bangla */}
                          <div className="space-y-4 bg-white/5 p-4 rounded-xl border border-white/5">
                            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-2">🇧🇩 Bangla Translation</span>
                            <div>
                              <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Headline (Bangla)</label>
                              <input
                                type="text"
                                value={slide.titleBn || ""}
                                onChange={(e) => updateSlide(i, "titleBn", e.target.value)}
                                className="w-full px-3 py-2 border border-white/10 bg-white/5 rounded-lg text-xs"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Subheadline (Bangla)</label>
                              <input
                                type="text"
                                value={slide.subtitleBn || ""}
                                onChange={(e) => updateSlide(i, "subtitleBn", e.target.value)}
                                className="w-full px-3 py-2 border border-white/10 bg-white/5 rounded-lg text-xs"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">CTA Button Text (Bangla)</label>
                              <input
                                type="text"
                                value={slide.primaryButtonTextBn || ""}
                                onChange={(e) => updateSlide(i, "primaryButtonTextBn", e.target.value)}
                                className="w-full px-3 py-2 border border-white/10 bg-white/5 rounded-lg text-xs"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Shared Image / Href */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-4">
                          <div>
                            <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Slide CTA Href</label>
                            <input
                              type="text"
                              value={slide.primaryButtonHref || ""}
                              onChange={(e) => updateSlide(i, "primaryButtonHref", e.target.value)}
                              className="w-full px-3 py-2 border border-white/10 rounded-lg text-xs"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2">Slide Image</label>
                            <div className="flex items-center space-x-4">
                              <div className="shrink-0">
                                {slide.image ? (
                                  <img
                                    src={resolveImageUrl(slide.image)}
                                    alt="Slide Preview"
                                    className="h-12 w-20 object-cover rounded-lg border"
                                  />
                                ) : (
                                  <div className="h-12 w-20 rounded-lg bg-white/5 border border-dashed flex items-center justify-center text-[8px] text-zinc-400">No Image</div>
                                )}
                              </div>
                              <label className="block flex-1">
                                <input
                                  type="file"
                                  onChange={(e) => handleSlideImageUpload(i, e)}
                                  accept="image/*"
                                  className="block w-full text-xs text-zinc-500 file:py-1 file:px-2 file:rounded-lg file:border-0 file:text-[9px] file:font-black file:uppercase file:bg-power-red/10 file:text-power-red cursor-pointer"
                                />
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Unified SEO settings */}
              <div className="bg-white/5 p-6 rounded-[2rem] border border-white/10 space-y-4">
                <h3 className="font-bold text-zinc-100 text-sm border-b pb-2 uppercase tracking-wide">SEO Metadata</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block">🇬🇧 English SEO</span>
                    <div>
                      <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">SEO Title</label>
                      <input
                        type="text"
                        value={form.seoTitleEn || ""}
                        onChange={(e) => updateField("seoTitleEn", e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">SEO Description</label>
                      <textarea
                        value={form.seoDescriptionEn || ""}
                        onChange={(e) => updateField("seoDescriptionEn", e.target.value)}
                        rows={2}
                        className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block">🇧🇩 Bangla SEO</span>
                    <div>
                      <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">SEO Title (Bangla)</label>
                      <input
                        type="text"
                        value={form.seoTitleBn || ""}
                        onChange={(e) => updateField("seoTitleBn", e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">SEO Description (Bangla)</label>
                      <textarea
                        value={form.seoDescriptionBn || ""}
                        onChange={(e) => updateField("seoDescriptionBn", e.target.value)}
                        rows={2}
                        className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">Status</label>
                  <select
                    value={form.status || "published"}
                    onChange={(e) => updateField("status", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-sm"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>

              {/* Save Button */}
              <div className="border-t pt-6 flex justify-end">
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={updateSection.isPending}
                  className="px-8 py-3 rounded-xl bg-power-red hover:bg-[#C8102E] text-white font-bold text-sm shadow-lg shadow-power-red/20 transition disabled:opacity-50"
                >
                  {updateSection.isPending ? "Saving..." : "Save Home Hero"}
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-4 animate-fade-in">
              <textarea
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                rows={15}
                className="w-full p-4 font-mono text-xs border border-white/10 rounded-xl bg-white/5 focus:outline-none"
              />
              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={handleApplyBulkJson}
                  disabled={!jsonInput.trim()}
                  className="px-5 py-2.5 bg-power-red hover:bg-[#C8102E] text-white rounded-xl text-xs font-black uppercase"
                >
                  Apply JSON Changes
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Live Interactive Mockup Preview (Matches Web1 Hero Component) */}
        <div className="sticky top-6 space-y-6">
          <div className="flex justify-between items-center bg-slate-900 text-white px-5 py-3.5 rounded-2xl border border-white/5 shadow">
            <span className="text-xs font-black uppercase tracking-widest text-zinc-500">Live Device Mockup Preview</span>
            <div className="flex items-center bg-slate-800 p-1 rounded-xl border border-white/5">
              <button
                type="button"
                onClick={() => setPreviewLocale("en")}
                className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase transition ${previewLocale === "en" ? "bg-red-600 text-white shadow" : "text-zinc-500 hover:text-white"}`}
              >
                🇬🇧 English
              </button>
              <button
                type="button"
                onClick={() => setPreviewLocale("bn")}
                className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase transition ${previewLocale === "bn" ? "bg-red-600 text-white shadow font-bangla" : "text-zinc-500 hover:text-white"}`}
              >
                🇧🇩 বাংলা
              </button>
            </div>
          </div>

          <div className="relative rounded-[2rem] overflow-hidden bg-[#09090b] text-white border border-white/5 shadow-2xl flex flex-col justify-between min-h-[500px]">
            {/* Slide content area */}
            <div className="relative flex-grow flex items-center justify-center p-8 md:p-12 text-center min-h-[380px] overflow-hidden">
              {/* Slide image background */}
              <div className="absolute inset-0 z-0">
                {previewImage ? (
                  <img
                    src={resolveImageUrl(previewImage)}
                    alt="Preview Slide"
                    className="w-full h-full object-cover transition-all duration-700"
                  />
                ) : (
                  <div className="w-full h-full bg-[#0b0b0d] flex items-center justify-center text-zinc-200 text-xs font-bold uppercase">No Image Uploaded</div>
                )}
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-black/35"></div>
              </div>

              {/* Slide text content overlay */}
              <div className="relative z-10 max-w-lg mx-auto flex flex-col items-center">
                <span className="px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-amber-500 text-[8px] md:text-[9px] font-black tracking-widest uppercase mb-4 shadow">
                  {previewEyebrow}
                </span>

                <h1 className="text-2xl md:text-4xl font-black text-white leading-tight tracking-tight uppercase">
                  {previewTitle || "No Title Loaded"}
                </h1>

                <p className="text-xs md:text-sm text-zinc-400 mt-4 leading-relaxed line-clamp-3">
                  {previewSubtitle || "No description subtitle text available."}
                </p>

                <div className="mt-6 flex justify-center gap-3">
                  <a
                    href="#explore"
                    onClick={(e) => e.preventDefault()}
                    className="px-5 py-2.5 rounded-xl bg-[#EF233C] hover:bg-red-700 hover:scale-105 transition-all text-white text-[10px] font-black uppercase tracking-wider shadow shadow-red-950/30"
                  >
                    {previewPrimaryBtn}
                  </a>
                  <a
                    href="#more"
                    onClick={(e) => e.preventDefault()}
                    className="px-5 py-2.5 rounded-xl border border-amber-500/30 hover:border-amber-500 hover:scale-105 transition-all text-amber-400 text-[10px] font-black uppercase tracking-wider"
                  >
                    {previewSecondaryBtn}
                  </a>
                </div>
              </div>

              {/* Carousel Navigation arrows */}
              {form.slides.length > 1 && (
                <>
                  <button
                    onClick={prevSlide}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition z-20"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition z-20"
                  >
                    <ChevronRight size={16} />
                  </button>
                </>
              )}
            </div>

            {/* Slider Dots */}
            {form.slides.length > 1 && (
              <div className="flex justify-center gap-2 py-3 bg-black/40 border-t border-white/5 z-10">
                {form.slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveSlideIndex(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${activeSlideIndex === i ? "w-6 bg-red-600" : "w-1.5 bg-white/20 hover:bg-white/40"}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeHeroEditor;
