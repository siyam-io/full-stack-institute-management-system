import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCoursePublicPage, useUpdateCoursePublicPage } from "../../hooks/useCourses";
import Loader from "../../components/Loader";
import Swal from "sweetalert2";
import { apiURL } from "../../../Constant";
import { Plus, Trash2, Globe, Eye, BookOpen, Layers, Settings, Sparkles, Code, Layout } from "lucide-react";

const emptyForm = {
  slug: "",
  heroTitleEn: "",
  heroTitleBn: "",
  heroSubtitleEn: "",
  heroSubtitleBn: "",
  overviewEn: "",
  overviewBn: "",
  coverImageUrl: "",
  seoTitleEn: "",
  seoTitleBn: "",
  seoDescriptionEn: "",
  seoDescriptionBn: "",
  status: "draft",
};

const JSON_TEMPLATE = {
  slug: "course-url-slug-here",
  heroTitleEn: "English Hero Title Heading",
  heroTitleBn: "বাংলা হিরো টাইটেল হেডিং",
  heroSubtitleEn: "English short tagline/subtitle description for banner",
  heroSubtitleBn: "ব্যানারের জন্য বাংলা ছোট সাবটাইটেল বিবরণী",
  overviewEn: "Detailed course overview paragraph in English",
  overviewBn: "কোর্সের বিস্তারিত বিবরণ বাংলায়",
  coverImageUrl: "/uploads/courses/image-name.webp",
  seoTitleEn: "SEO Title tag for Google (under 70 chars) | CIB",
  seoTitleBn: "গুগলের জন্য এসইও টাইটেল (৭০ অক্ষরের নিচে) | সিআইবি",
  seoDescriptionEn: "SEO Meta description snippet for search results (under 160 chars)",
  seoDescriptionBn: "সার্চ রেজাল্টের জন্য বাংলা এসইও মেটা ডেসক্রিপশন বিবরণী",
  status: "published",
  highlights: [
    {
      titleEn: "Highlight Title (e.g. Dhanmondi Location)",
      titleBn: "হাইলাইট টাইটেল (যেমন: ধানমন্ডি ক্যাম্পাস)",
      descEn: "Highlight description details in English",
      descBn: "হাইলাইট বিবরণী বাংলায়"
    }
  ],
  features: [
    {
      en: "Program feature or badge detail (English)",
      bn: "প্রোগ্রাম ফিচার বা ব্যাজের বিবরণ (বাংলা)"
    }
  ],
  curriculum: [
    {
      titleEn: "Module or Month Title (e.g. Month 1: Foundation)",
      titleBn: "মডিউল বা মাসের টাইটেল (যেমন: ১ম মাস: বেসিক ফাউন্ডেশন)",
      items: [
        {
          en: "Topic or class item detail (English)",
          bn: "টপিক বা ক্লাসের বিবরণ (বাংলা)"
        }
      ]
    }
  ],
  faqs: [
    {
      qEn: "Frequently asked question in English?",
      qBn: "সচরাচর জিজ্ঞাসিত প্রশ্ন বাংলায়?",
      aEn: "Detail answer in English.",
      aBn: "বিস্তারিত উত্তর বাংলায়।"
    }
  ],
  outcomes: [
    {
      en: "What students will master (English)",
      bn: "শিক্ষার্থীরা যা আয়ত্ত করবে (বাংলা)"
    }
  ]
};

const CoursePublicPageEditor = () => {
  const { id: courseId } = useParams();
  const navigate = useNavigate();
  const { data: pageData, isLoading } = useCoursePublicPage(courseId, "en");
  const updatePageMutation = useUpdateCoursePublicPage();
  
  const [form, setForm] = useState(emptyForm);
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  // Structured Unified States (English + Bangla side-by-side)
  const [highlights, setHighlights] = useState([]);
  const [features, setFeatures] = useState([]);
  const [curriculum, setCurriculum] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [outcomes, setOutcomes] = useState([]);

  // Edit Mode: "visual" or "json"
  const [editMode, setEditMode] = useState("visual");
  const [rawJsonText, setRawJsonText] = useState("");

  // Active Tab for Visual Mode
  const [activeTab, setActiveTab] = useState("basic");

  useEffect(() => {
    if (!pageData) return;

    const parseJson = (val, fallback) => {
      if (typeof val === "string") {
        try {
          return JSON.parse(val);
        } catch {
          return fallback;
        }
      }
      return val || fallback;
    };

    const initialForm = {
      slug: pageData.slug || "",
      heroTitleEn: pageData.heroTitleEn || pageData.title || "",
      heroTitleBn: pageData.heroTitleBn || "",
      heroSubtitleEn: pageData.heroSubtitleEn || pageData.excerpt || "",
      heroSubtitleBn: pageData.heroSubtitleBn || "",
      overviewEn: pageData.overviewEn || "",
      overviewBn: pageData.overviewBn || "",
      coverImageUrl: pageData.coverImageUrl || "",
      seoTitleEn: pageData.seoTitleEn || pageData.seoTitle || "",
      seoTitleBn: pageData.seoTitleBn || "",
      seoDescriptionEn: pageData.seoDescriptionEn || pageData.seoDescription || "",
      seoDescriptionBn: pageData.seoDescriptionBn || "",
      status: pageData.status || "draft",
    };

    setForm(initialForm);

    const contentEnObj = parseJson(pageData.contentEn || pageData.content, {});
    const contentBnObj = parseJson(pageData.contentBn, {});

    // Zip Highlights
    const maxHighlights = Math.max(
      (contentEnObj.highlights || []).length,
      (contentBnObj.highlights || []).length
    );
    const zippedHighlights = [];
    for (let i = 0; i < maxHighlights; i++) {
      const hEn = contentEnObj.highlights?.[i] || {};
      const hBn = contentBnObj.highlights?.[i] || {};
      zippedHighlights.push({
        titleEn: hEn.title || "",
        titleBn: hBn.title || "",
        descEn: hEn.description || "",
        descBn: hBn.description || "",
      });
    }
    setHighlights(zippedHighlights);

    // Zip Features
    const maxFeatures = Math.max(
      (contentEnObj.features || []).length,
      (contentBnObj.features || []).length
    );
    const zippedFeatures = [];
    for (let i = 0; i < maxFeatures; i++) {
      zippedFeatures.push({
        en: contentEnObj.features?.[i] || "",
        bn: contentBnObj.features?.[i] || "",
      });
    }
    setFeatures(zippedFeatures);

    // Zip FAQs
    const faqsEnList = parseJson(pageData.faqsEn || pageData.faqs, []);
    const faqsBnList = parseJson(pageData.faqsBn, []);
    const maxFaqs = Math.max(faqsEnList.length, faqsBnList.length);
    const zippedFaqs = [];
    for (let i = 0; i < maxFaqs; i++) {
      const fEn = faqsEnList[i] || {};
      const fBn = faqsBnList[i] || {};
      zippedFaqs.push({
        qEn: fEn.question || "",
        qBn: fBn.question || "",
        aEn: fEn.answer || "",
        aBn: fBn.answer || "",
      });
    }
    setFaqs(zippedFaqs);

    // Zip Outcomes
    const outcomesEnList = parseJson(pageData.outcomesEn || pageData.outcomes, []);
    const outcomesBnList = parseJson(pageData.outcomesBn, []);
    const maxOutcomes = Math.max(outcomesEnList.length, outcomesBnList.length);
    const zippedOutcomes = [];
    for (let i = 0; i < maxOutcomes; i++) {
      const oEn = outcomesEnList[i];
      const oBn = outcomesBnList[i];
      const valEn = typeof oEn === "object" && oEn !== null ? (oEn.en || oEn.title || oEn.text || "") : (oEn || "");
      const valBn = typeof oBn === "object" && oBn !== null ? (oBn.bn || oBn.title || oBn.text || "") : (oBn || "");
      zippedOutcomes.push({
        en: valEn,
        bn: valBn || (typeof oEn === "object" && oEn !== null ? oEn.bn : ""),
      });
    }
    setOutcomes(zippedOutcomes);

    // Zip Curriculum
    const currEnList = parseJson(pageData.curriculumEn || pageData.curriculum, []);
    const currBnList = parseJson(pageData.curriculumBn, []);
    const maxCurr = Math.max(currEnList.length, currBnList.length);
    const zippedCurr = [];
    for (let i = 0; i < maxCurr; i++) {
      const cEn = currEnList[i] || {};
      const cBn = currBnList[i] || {};
      const maxItems = Math.max((cEn.items || []).length, (cBn.items || []).length);
      const zippedItems = [];
      for (let j = 0; j < maxItems; j++) {
        zippedItems.push({
          en: cEn.items?.[j] || "",
          bn: cBn.items?.[j] || "",
        });
      }
      zippedCurr.push({
        titleEn: cEn.title || "",
        titleBn: cBn.title || "",
        items: zippedItems,
      });
    }
    setCurriculum(zippedCurr);

    setPhotoPreview(
      pageData.coverImageUrl
        ? pageData.coverImageUrl.startsWith("http")
          ? pageData.coverImageUrl
          : `${apiURL.image_url}${pageData.coverImageUrl}`
        : null
    );

    // Prepare initial raw JSON dump
    const rawDump = {
      ...initialForm,
      highlights: zippedHighlights,
      features: zippedFeatures,
      curriculum: zippedCurr,
      faqs: zippedFaqs,
      outcomes: zippedOutcomes
    };
    setRawJsonText(JSON.stringify(rawDump, null, 2));
  }, [pageData]);

  // Synchronize when switching to JSON mode
  const handleToggleMode = (mode) => {
    if (mode === "json") {
      const currentDump = {
        ...form,
        highlights,
        features,
        curriculum,
        faqs,
        outcomes
      };
      setRawJsonText(JSON.stringify(currentDump, null, 2));
    } else {
      try {
        const parsed = JSON.parse(rawJsonText);
        setForm({
          slug: parsed.slug || "",
          heroTitleEn: parsed.heroTitleEn || "",
          heroTitleBn: parsed.heroTitleBn || "",
          heroSubtitleEn: parsed.heroSubtitleEn || "",
          heroSubtitleBn: parsed.heroSubtitleBn || "",
          overviewEn: parsed.overviewEn || "",
          overviewBn: parsed.overviewBn || "",
          coverImageUrl: parsed.coverImageUrl || "",
          seoTitleEn: parsed.seoTitleEn || "",
          seoTitleBn: parsed.seoTitleBn || "",
          seoDescriptionEn: parsed.seoDescriptionEn || "",
          seoDescriptionBn: parsed.seoDescriptionBn || "",
          status: parsed.status || "draft",
        });
        setHighlights(parsed.highlights || []);
        setFeatures(parsed.features || []);
        setCurriculum(parsed.curriculum || []);
        setFaqs(parsed.faqs || []);
        setOutcomes(parsed.outcomes || []);
      } catch (err) {
        Swal.fire("JSON Parse Error", "The JSON is invalid and cannot be mapped to Visual mode.", "error");
        return;
      }
    }
    setEditMode(mode);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let finalForm = { ...form };
    let finalHighlights = highlights;
    let finalFeatures = features;
    let finalCurriculum = curriculum;
    let finalFaqs = faqs;
    let finalOutcomes = outcomes;

    if (editMode === "json") {
      try {
        const parsed = JSON.parse(rawJsonText);
        finalForm = {
          slug: parsed.slug || "",
          heroTitleEn: parsed.heroTitleEn || "",
          heroTitleBn: parsed.heroTitleBn || "",
          heroSubtitleEn: parsed.heroSubtitleEn || "",
          heroSubtitleBn: parsed.heroSubtitleBn || "",
          overviewEn: parsed.overviewEn || "",
          overviewBn: parsed.overviewBn || "",
          coverImageUrl: parsed.coverImageUrl || "",
          seoTitleEn: parsed.seoTitleEn || "",
          seoTitleBn: parsed.seoTitleBn || "",
          seoDescriptionEn: parsed.seoDescriptionEn || "",
          seoDescriptionBn: parsed.seoDescriptionBn || "",
          status: parsed.status || "draft",
        };
        finalHighlights = parsed.highlights || [];
        finalFeatures = parsed.features || [];
        finalCurriculum = parsed.curriculum || [];
        finalFaqs = parsed.faqs || [];
        finalOutcomes = parsed.outcomes || [];
      } catch (err) {
        return Swal.fire("Error", "Invalid JSON format. Please fix prior to saving.", "error");
      }
    }

    if (!finalForm.slug.trim()) return Swal.fire("Error", "Slug is required", "error");
    if (!finalForm.heroTitleEn.trim()) return Swal.fire("Error", "English hero title is required", "error");

    const contentEn = {
      hero: {
        badge: pageData.contentEn?.hero?.badge || "",
        heading: finalForm.heroTitleEn,
        subheading: finalForm.heroSubtitleEn,
      },
      overview: {
        title: pageData.contentEn?.overview?.title || "",
        text: finalForm.overviewEn,
      },
      highlights: finalHighlights.map(h => ({ title: h.titleEn, description: h.descEn })),
      features: finalFeatures.map(f => f.en),
      faqs: finalFaqs.map(f => ({ question: f.qEn, answer: f.aEn })),
      cta: pageData.contentEn?.cta || {},
    };

    const contentBn = {
      hero: {
        badge: pageData.contentBn?.hero?.badge || "",
        heading: finalForm.heroTitleBn,
        subheading: finalForm.heroSubtitleBn,
      },
      overview: {
        title: pageData.contentBn?.overview?.title || "",
        text: finalForm.overviewBn,
      },
      highlights: finalHighlights.map(h => ({ title: h.titleBn, description: h.descBn })),
      features: finalFeatures.map(f => f.bn),
      faqs: finalFaqs.map(f => ({ question: f.qBn, answer: f.aBn })),
      cta: pageData.contentBn?.cta || {},
    };

    const parsedCurriculumEn = finalCurriculum.map(c => ({
      title: c.titleEn,
      items: (c.items || []).map(item => item.en)
    }));

    const parsedCurriculumBn = finalCurriculum.map(c => ({
      title: c.titleBn,
      items: (c.items || []).map(item => item.bn)
    }));

    const parsedFaqsEn = finalFaqs.map(f => ({ question: f.qEn, answer: f.aEn }));
    const parsedFaqsBn = finalFaqs.map(f => ({ question: f.qBn, answer: f.aBn }));
    const parsedOutcomesEn = finalOutcomes.map(o => o.en);
    const parsedOutcomesBn = finalOutcomes.map(o => o.bn);

    const formData = new FormData();
    Object.entries(finalForm).forEach(([key, value]) => formData.append(key, value));

    formData.set("contentEn", JSON.stringify(contentEn));
    formData.set("contentBn", JSON.stringify(contentBn));
    formData.set("curriculumEn", JSON.stringify(parsedCurriculumEn));
    formData.set("curriculumBn", JSON.stringify(parsedCurriculumBn));
    formData.set("faqsEn", JSON.stringify(parsedFaqsEn));
    formData.set("faqsBn", JSON.stringify(parsedFaqsBn));
    formData.set("outcomesEn", JSON.stringify(parsedOutcomesEn));
    formData.set("outcomesBn", JSON.stringify(parsedOutcomesBn));

    if (photoFile) formData.append("cover_image", photoFile);
    else if (finalForm.coverImageUrl) formData.append("cover_image_url", finalForm.coverImageUrl);

    updatePageMutation.mutate(
      { courseId, formData },
      {
        onSuccess: () => {
          Swal.fire({
            icon: "success",
            title: "Saved!",
            text: "Landing page configurations saved successfully.",
            timer: 1500,
            showConfirmButton: false,
          });
          navigate("/admin/all-courses");
        },
      }
    );
  };

  // Visual State Builders
  const addHighlight = () => {
    setHighlights(prev => [...prev, { titleEn: "", titleBn: "", descEn: "", descBn: "" }]);
  };
  const removeHighlight = (index) => {
    setHighlights(prev => prev.filter((_, i) => i !== index));
  };
  const updateHighlight = (index, field, val) => {
    setHighlights(prev => prev.map((item, i) => (i === index ? { ...item, [field]: val } : item)));
  };

  const addFAQ = () => {
    setFaqs(prev => [...prev, { qEn: "", qBn: "", aEn: "", aBn: "" }]);
  };
  const removeFAQ = (index) => {
    setFaqs(prev => prev.filter((_, i) => i !== index));
  };
  const updateFAQ = (index, field, val) => {
    setFaqs(prev => prev.map((item, i) => (i === index ? { ...item, [field]: val } : item)));
  };

  const addModule = () => {
    setCurriculum(prev => [...prev, { titleEn: "", titleBn: "", items: [{ en: "", bn: "" }] }]);
  };
  const removeModule = (index) => {
    setCurriculum(prev => prev.filter((_, i) => i !== index));
  };
  const updateModuleTitle = (index, langField, val) => {
    setCurriculum(prev => prev.map((m, i) => (i === index ? { ...m, [langField]: val } : m)));
  };
  const addModuleItem = (mIndex) => {
    setCurriculum(prev => prev.map((m, i) => (i === mIndex ? { ...m, items: [...m.items, { en: "", bn: "" }] } : m)));
  };
  const removeModuleItem = (mIndex, itemIndex) => {
    setCurriculum(prev => prev.map((m, i) => (i === mIndex ? { ...m, items: m.items.filter((_, j) => j !== itemIndex) } : m)));
  };
  const updateModuleItem = (mIndex, itemIndex, langField, val) => {
    setCurriculum(prev =>
      prev.map((m, i) =>
        i === mIndex
          ? {
              ...m,
              items: m.items.map((item, j) => (j === itemIndex ? { ...item, [langField]: val } : item)),
            }
          : m
      )
    );
  };

  const addZipItem = (setter) => setter(prev => [...prev, { en: "", bn: "" }]);
  const removeZipItem = (setter, index) => setter(prev => prev.filter((_, i) => i !== index));
  const updateZipItem = (setter, index, langField, val) => setter(prev => prev.map((s, i) => (i === index ? { ...s, [langField]: val } : s)));

  if (isLoading) return <Loader />;

  return (
    <div className="p-8 max-w-[1450px] mx-auto min-h-screen relative">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 pb-4 border-b border-white/5">
        <div>
          <h1 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-2">
            <Globe className="text-power-red w-7 h-7" /> Manage Course Public Page
          </h1>
          <p className="text-sm text-zinc-500 mt-1">Configure landing page metadata, timeline, outcomes and localized texts.</p>
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
            Cancel
          </button>
        </div>
      </div>

      {/* Tabs - Show only if in Visual Mode */}
      {editMode === "visual" && (
        <div className="flex border-b border-white/10 mb-6 gap-2">
          <TabButton id="basic" active={activeTab} onClick={setActiveTab} icon={BookOpen} label="Hero & Overview" />
          <TabButton id="sections" active={activeTab} onClick={setActiveTab} icon={Sparkles} label="Landing Page Sections" />
          <TabButton id="settings" active={activeTab} onClick={setActiveTab} icon={Settings} label="SEO & Cover" />
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {editMode === "visual" ? (
            <>
              {activeTab === "basic" && (
                <Panel title="Core Hero & Overview Setup">
                  <Field label="URL Slug" name="slug" value={form.slug} onChange={handleChange} required placeholder="e.g. baking-course-dhaka" />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <Field label="Hero Title (English) *" name="heroTitleEn" value={form.heroTitleEn} onChange={handleChange} required />
                    <Field label="Hero Title (Bangla)" name="heroTitleBn" value={form.heroTitleBn} onChange={handleChange} />
                    <TextArea label="Hero Subheading (English)" name="heroSubtitleEn" value={form.heroSubtitleEn} onChange={handleChange} rows={3} />
                    <TextArea label="Hero Subheading (Bangla)" name="heroSubtitleBn" value={form.heroSubtitleBn} onChange={handleChange} rows={3} />
                    <TextArea label="Detailed Overview (English)" name="overviewEn" value={form.overviewEn} onChange={handleChange} rows={4} />
                    <TextArea label="Detailed Overview (Bangla)" name="overviewBn" value={form.overviewBn} onChange={handleChange} rows={4} />
                  </div>
                </Panel>
              )}

              {activeTab === "sections" && (
                <div className="space-y-6">
                  {/* Highlights */}
                  <Panel
                    title={
                      <>
                        <span>Course Key Highlights</span>
                        <button type="button" onClick={addHighlight} className="flex items-center gap-1 text-xs text-power-red hover:text-power-red font-bold">
                          <Plus size={14} /> Add Highlight Card
                        </button>
                      </>
                    }
                  >
                    <div className="space-y-4">
                      {highlights.length === 0 && <p className="text-xs text-zinc-500">No highlights added yet.</p>}
                      {highlights.map((item, idx) => (
                        <div key={idx} className="flex gap-4 items-start bg-white/5 p-4 rounded-xl border border-white/5">
                          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-3">
                              <Field label="Highlight Title (English)" value={item.titleEn} onChange={(e) => updateHighlight(idx, "titleEn", e.target.value)} placeholder="e.g. Dhanmondi Location" />
                              <Field label="Description (English)" value={item.descEn} onChange={(e) => updateHighlight(idx, "descEn", e.target.value)} placeholder="e.g. Central Dhaka campus" />
                            </div>
                            <div className="space-y-3">
                              <Field label="Highlight Title (Bangla)" value={item.titleBn} onChange={(e) => updateHighlight(idx, "titleBn", e.target.value)} placeholder="যেমন: ধানমন্ডি ক্যাম্পাস" />
                              <Field label="Description (Bangla)" value={item.descBn} onChange={(e) => updateHighlight(idx, "descBn", e.target.value)} placeholder="যেমন: ঢাকার কেন্দ্রে অবস্থিত" />
                            </div>
                          </div>
                          <button type="button" onClick={() => removeHighlight(idx)} className="text-red-500 hover:text-red-700 mt-6">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </Panel>

                  {/* Features & Badges */}
                  <Panel
                    title={
                      <>
                        <span>Program Features & Badges</span>
                        <button type="button" onClick={() => addZipItem(setFeatures)} className="flex items-center gap-1 text-xs text-power-red hover:text-power-red font-bold">
                          <Plus size={14} /> Add Feature Line
                        </button>
                      </>
                    }
                  >
                    <div className="space-y-3">
                      {features.length === 0 && <p className="text-xs text-zinc-500">No features added yet.</p>}
                      {features.map((item, idx) => (
                        <div key={idx} className="flex gap-3 items-center">
                          <input
                            type="text"
                            value={item.en}
                            onChange={(e) => updateZipItem(setFeatures, idx, "en", e.target.value)}
                            className="flex-1 px-4 py-2 border rounded-lg text-sm focus:outline-none"
                            placeholder="Feature (English)"
                          />
                          <input
                            type="text"
                            value={item.bn}
                            onChange={(e) => updateZipItem(setFeatures, idx, "bn", e.target.value)}
                            className="flex-1 px-4 py-2 border rounded-lg text-sm focus:outline-none"
                            placeholder="ফিচার (বাংলা)"
                          />
                          <button type="button" onClick={() => removeZipItem(setFeatures, idx)} className="text-red-500 hover:text-red-700">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </Panel>

                  {/* Curriculum Modules */}
                  <Panel
                    title={
                      <>
                        <span>Curriculum Timeline Modules</span>
                        <button type="button" onClick={addModule} className="flex items-center gap-1 text-xs text-power-red hover:text-power-red font-bold">
                          <Plus size={14} /> Add Module
                        </button>
                      </>
                    }
                  >
                    <div className="space-y-6">
                      {curriculum.length === 0 && <p className="text-xs text-zinc-500">No modules added yet.</p>}
                      {curriculum.map((module, mIdx) => (
                        <div key={mIdx} className="bg-white/5 p-5 rounded-2xl border border-white/5 space-y-4">
                          <div className="flex gap-4 items-end border-b border-white/10 pb-3">
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                              <Field label="Module Title (English)" value={module.titleEn} onChange={(e) => updateModuleTitle(mIdx, "titleEn", e.target.value)} placeholder="e.g. Month 1: Foundation" />
                              <Field label="Module Title (Bangla)" value={module.titleBn} onChange={(e) => updateModuleTitle(mIdx, "titleBn", e.target.value)} placeholder="যেমন: ১ম মাস: বেসিক ফাউন্ডেশন" />
                            </div>
                            <button type="button" onClick={() => removeModule(mIdx)} className="text-red-500 hover:text-red-700 pb-2">
                              <Trash2 size={18} />
                            </button>
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-[10px] font-black uppercase text-zinc-500">Module Bullet Points / Topics</span>
                              <button type="button" onClick={() => addModuleItem(mIdx)} className="text-[10px] text-power-red hover:text-power-red font-bold flex items-center">
                                + Add Topic
                              </button>
                            </div>

                            {module.items?.map((item, itemIdx) => (
                              <div key={itemIdx} className="flex gap-2 items-center">
                                <input
                                  type="text"
                                  value={item.en}
                                  onChange={(e) => updateModuleItem(mIdx, itemIdx, "en", e.target.value)}
                                  className="flex-1 px-3 py-1.5 border rounded-lg text-xs focus:outline-none"
                                  placeholder="Topic (English)"
                                />
                                <input
                                  type="text"
                                  value={item.bn}
                                  onChange={(e) => updateModuleItem(mIdx, itemIdx, "bn", e.target.value)}
                                  className="flex-1 px-3 py-1.5 border rounded-lg text-xs focus:outline-none"
                                  placeholder="টপিক (বাংলা)"
                                />
                                <button type="button" onClick={() => removeModuleItem(mIdx, itemIdx)} className="text-zinc-500 hover:text-red-500">
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </Panel>

                  {/* FAQs */}
                  <Panel
                    title={
                      <>
                        <span>FAQs Items</span>
                        <button type="button" onClick={addFAQ} className="flex items-center gap-1 text-xs text-power-red hover:text-power-red font-bold">
                          <Plus size={14} /> Add FAQ Item
                        </button>
                      </>
                    }
                  >
                    <div className="space-y-4">
                      {faqs.length === 0 && <p className="text-xs text-zinc-500">No FAQs added yet.</p>}
                      {faqs.map((item, idx) => (
                        <div key={idx} className="flex gap-4 items-start bg-white/5 p-4 rounded-xl border border-white/5">
                          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Field label="Question (English)" value={item.qEn} onChange={(e) => updateFAQ(idx, "qEn", e.target.value)} placeholder="e.g. Do you offer weekend classes?" />
                              <TextArea label="Answer (English)" value={item.aEn} onChange={(e) => updateFAQ(idx, "aEn", e.target.value)} rows={2} placeholder="Answer text..." />
                            </div>
                            <div className="space-y-2">
                              <Field label="Question (Bangla)" value={item.qBn} onChange={(e) => updateFAQ(idx, "qBn", e.target.value)} placeholder="যেমন: সাপ্তাহিক ক্লাস কি আছে?" />
                              <TextArea label="Answer (Bangla)" value={item.aBn} onChange={(e) => updateFAQ(idx, "aBn", e.target.value)} rows={2} placeholder="উত্তর..." />
                            </div>
                          </div>
                          <button type="button" onClick={() => removeFAQ(idx)} className="text-red-500 hover:text-red-700 mt-6">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </Panel>

                  {/* Outcomes */}
                  <Panel
                    title={
                      <>
                        <span>Learning Outcomes</span>
                        <button type="button" onClick={() => addZipItem(setOutcomes)} className="flex items-center gap-1 text-xs text-power-red hover:text-power-red font-bold">
                          <Plus size={14} /> Add Outcome Line
                        </button>
                      </>
                    }
                  >
                    <div className="space-y-3">
                      {outcomes.length === 0 && <p className="text-xs text-zinc-500">No outcomes added yet.</p>}
                      {outcomes.map((item, idx) => (
                        <div key={idx} className="flex gap-3 items-center">
                          <input
                            type="text"
                            value={item.en}
                            onChange={(e) => updateZipItem(setOutcomes, idx, "en", e.target.value)}
                            className="flex-1 px-4 py-2 border rounded-lg text-sm focus:outline-none"
                            placeholder="Outcome (English)"
                          />
                          <input
                            type="text"
                            value={item.bn}
                            onChange={(e) => updateZipItem(setOutcomes, idx, "bn", e.target.value)}
                            className="flex-1 px-4 py-2 border rounded-lg text-sm focus:outline-none"
                            placeholder="আউটকাম (বাংলা)"
                          />
                          <button type="button" onClick={() => removeZipItem(setOutcomes, idx)} className="text-red-500 hover:text-red-700">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </Panel>
                </div>
              )}

              {activeTab === "settings" && (
                <Panel title="SEO Meta Parameters">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <Field label="SEO Meta Title (English)" name="seoTitleEn" value={form.seoTitleEn} onChange={handleChange} maxLength={70} />
                      <TextArea label="SEO Meta Description (English)" name="seoDescriptionEn" value={form.seoDescriptionEn} onChange={handleChange} maxLength={170} rows={4} />
                    </div>
                    <div className="space-y-3">
                      <Field label="SEO Meta Title (Bangla)" name="seoTitleBn" value={form.seoTitleBn} onChange={handleChange} maxLength={70} />
                      <TextArea label="SEO Meta Description (Bangla)" name="seoDescriptionBn" value={form.seoDescriptionBn} onChange={handleChange} maxLength={170} rows={4} />
                    </div>
                  </div>
                </Panel>
              )}
            </>
          ) : (
            <Panel
              title={
                <div className="flex justify-between items-center w-full">
                  <span>Raw Page Configuration JSON</span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(JSON.stringify(JSON_TEMPLATE, null, 2));
                        Swal.fire({
                          icon: "success",
                          title: "Copied!",
                          text: "AI JSON Template copied to clipboard.",
                          timer: 1200,
                          showConfirmButton: false,
                        });
                      }}
                      className="text-[10px] text-power-red hover:text-power-red font-black tracking-wider uppercase border border-power-red/30 bg-power-red/10 px-2.5 py-1.5 rounded-lg transition-all"
                    >
                      Copy AI Template
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(rawJsonText);
                        Swal.fire({
                          icon: "success",
                          title: "Copied!",
                          text: "JSON data copied to clipboard.",
                          timer: 1000,
                          showConfirmButton: false,
                        });
                      }}
                      className="text-[10px] text-power-red hover:text-power-red font-black tracking-wider uppercase border border-power-red/30 bg-power-red/10 px-2.5 py-1.5 rounded-lg transition-all"
                    >
                      Copy Current JSON
                    </button>
                  </div>
                </div>
              }
            >
              <p className="text-xs text-zinc-500 mb-2">Advanced: Edit or paste the entire course public configuration dump directly in JSON format below.</p>
              <textarea
                value={rawJsonText}
                onChange={(e) => setRawJsonText(e.target.value)}
                className="w-full px-4 py-3 border rounded-xl font-mono text-xs focus:outline-none bg-slate-900 text-slate-100"
                rows={35}
              />
            </Panel>
          )}
        </div>

        <div className="space-y-6">
          <Panel title="Publish Settings">
            <label className="block text-xs font-black uppercase text-zinc-500 mb-1">Status</label>
            <select name="status" value={form.status} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg text-sm bg-white/5 focus:outline-none">
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>

            <label className="block text-xs font-black uppercase text-zinc-500 mt-4 mb-2">Cover Image</label>
            <div className="border border-dashed border-white/10 rounded-lg p-4 text-center bg-white/5">
              {photoPreview ? (
                <div className="relative">
                  <img src={photoPreview} alt="Cover Preview" className="max-h-[160px] mx-auto object-contain rounded" />
                  <button
                    type="button"
                    onClick={() => {
                      setPhotoFile(null);
                      setPhotoPreview(null);
                      setForm((prev) => ({ ...prev, coverImageUrl: "" }));
                    }}
                    className="mt-2 text-xs text-red-600 hover:underline block mx-auto"
                  >
                    Remove cover photo
                  </button>
                </div>
              ) : (
                <div>
                  <input type="file" id="coverImageInput" accept="image/*" onChange={handleFileChange} className="hidden" />
                  <label htmlFor="coverImageInput" className="cursor-pointer text-xs text-power-red hover:underline font-semibold block py-6">
                    Click to upload cover image
                  </label>
                </div>
              )}
            </div>
            <div className="mt-4">
              <Field label="Or Image URL" name="coverImageUrl" value={form.coverImageUrl} onChange={handleChange} />
            </div>
          </Panel>

          <button
            type="submit"
            disabled={updatePageMutation.isPending}
            className="w-full py-4 bg-[#EF233C] hover:bg-[#C8102E] text-white rounded-2xl text-sm font-black shadow-lg shadow-power-red/20 tracking-widest transition uppercase disabled:opacity-50 active:scale-[0.98]"
          >
            {updatePageMutation.isPending ? "Saving..." : "Save Public Page"}
          </button>
        </div>
      </form>
    </div>
  );
};

// Sub Components for Structured Editors

const TabButton = ({ id, active, onClick, icon: Icon, label }) => (
  <button
    type="button"
    onClick={() => onClick(id)}
    className={`flex items-center gap-2 px-4 py-3 text-sm font-bold border-b-2 transition-all ${
      active === id
        ? "border-power-red/30 text-power-red"
        : "border-transparent text-zinc-500 hover:text-zinc-100"
    }`}
  >
    <Icon size={16} />
    {label}
  </button>
);

const Panel = ({ title, children }) => (
  <div className="bg-white/5 p-6 rounded-[2rem] space-y-4 shadow-sm border border-white/5">
    <h2 className="font-bold text-zinc-100 text-md border-b border-white/5 pb-2 flex items-center justify-between">{title}</h2>
    {children}
  </div>
);

const Field = ({ label, ...props }) => (
  <div>
    <label className="block text-xs font-black uppercase text-zinc-500 mb-1">{label}</label>
    <input {...props} className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none" />
  </div>
);

const TextArea = ({ label, rows = 3, ...props }) => (
  <div>
    <label className="block text-xs font-black uppercase text-zinc-500 mb-1">{label}</label>
    <textarea {...props} rows={rows} className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none" />
  </div>
);

export default CoursePublicPageEditor;
