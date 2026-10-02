import React, { useState } from "react";
import { useMarketingPage, useSaveMarketingPage } from "../../../hooks/useMarketing";
import Loader from "../../../components/Loader";
import Swal from "sweetalert2";
import { ChevronDown, ChevronUp } from "lucide-react";

const FaqEditor = () => {
  const [editorMode, setEditorMode] = useState("visual");
  const [jsonInput, setJsonInput] = useState("");

  const [form, setForm] = useState({
    titleEn: "",
    titleBn: "",
    seoTitleEn: "",
    seoTitleBn: "",
    seoDescriptionEn: "",
    seoDescriptionBn: "",
  });

  const [faqStructureEn, setFaqStructureEn] = useState({
    hero: { heading: "Frequently Asked Questions", subheading: "" },
    categories: [],
    cta: { heading: "Need more help?", subtext: "", buttonText: "Contact Us", buttonLink: "/contact" }
  });

  const [faqStructureBn, setFaqStructureBn] = useState({
    hero: { heading: "সাধারণ জিজ্ঞাসা", subheading: "" },
    categories: [],
    cta: { heading: "আরো সাহায্য লাগবে?", subtext: "", buttonText: "আমাদের সাথে যোগাযোগ করুন", buttonLink: "/contact" }
  });

  const { data: pageData, isLoading } = useMarketingPage("faq");
  const savePageMutation = useSaveMarketingPage();

  // Preview state
  const [previewLocale, setPreviewLocale] = useState("en");
  const [activePreviewCatIdx, setActivePreviewCatIdx] = useState(0);
  const [expandedPreviewFaqIdx, setExpandedPreviewFaqIdx] = useState(null);

  React.useEffect(() => {
    if (pageData) {
      setForm({
        titleEn: pageData.titleEn || pageData.title_en || "FAQ Page",
        titleBn: pageData.titleBn || pageData.title_bn || "এফএকিউ পেজ",
        seoTitleEn: pageData.seoTitleEn || pageData.seo_title_en || "",
        seoTitleBn: pageData.seoTitleBn || pageData.seo_title_bn || "",
        seoDescriptionEn: pageData.seoDescriptionEn || pageData.seo_description_en || "",
        seoDescriptionBn: pageData.seoDescriptionBn || pageData.seo_description_bn || "",
      });

      const contentEn = pageData.contentEn || pageData.content_en || {};
      const contentBn = pageData.contentBn || pageData.content_bn || {};

      setFaqStructureEn({
        hero: contentEn.hero || { heading: "Frequently Asked Questions", subheading: "" },
        categories: Array.isArray(contentEn.categories) ? contentEn.categories : [],
        cta: contentEn.cta || { heading: "Need more help?", subtext: "", buttonText: "Contact Us", buttonLink: "/contact" }
      });

      setFaqStructureBn({
        hero: contentBn.hero || { heading: "সাধারণ জিজ্ঞাসা", subheading: "" },
        categories: Array.isArray(contentBn.categories) ? contentBn.categories : [],
        cta: contentBn.cta || { heading: "আরো সাহায্য লাগবে?", subtext: "", buttonText: "আমাদের সাথে যোগাযোগ করুন", buttonLink: "/contact" }
      });
    }
  }, [pageData]);

  const handleHeroChange = (lang, field, value) => {
    if (lang === "en") {
      setFaqStructureEn(p => ({ ...p, hero: { ...p.hero, [field]: value } }));
    } else {
      setFaqStructureBn(p => ({ ...p, hero: { ...p.hero, [field]: value } }));
    }
  };

  const handleCtaChange = (lang, field, value) => {
    if (lang === "en") {
      setFaqStructureEn(p => ({ ...p, cta: { ...p.cta, [field]: value } }));
    } else {
      setFaqStructureBn(p => ({ ...p, cta: { ...p.cta, [field]: value } }));
    }
  };

  const addCategory = () => {
    setFaqStructureEn(p => ({
      ...p,
      categories: [...p.categories, { category: "New Category", faqs: [] }]
    }));
    setFaqStructureBn(p => ({
      ...p,
      categories: [...p.categories, { category: "নতুন ক্যাটাগরি", faqs: [] }]
    }));
  };

  const removeCategory = (idx) => {
    setFaqStructureEn(p => ({ ...p, categories: p.categories.filter((_, i) => i !== idx) }));
    setFaqStructureBn(p => ({ ...p, categories: p.categories.filter((_, i) => i !== idx) }));
    if (activePreviewCatIdx >= Math.max(faqStructureEn.categories.length - 1, 1)) {
      setActivePreviewCatIdx(0);
    }
  };

  const handleCategoryNameChange = (idx, lang, value) => {
    if (lang === "en") {
      setFaqStructureEn(p => {
        const cats = [...p.categories];
        cats[idx] = { ...cats[idx], category: value };
        return { ...p, categories: cats };
      });
    } else {
      setFaqStructureBn(p => {
        const cats = [...p.categories];
        cats[idx] = { ...cats[idx], category: value };
        return { ...p, categories: cats };
      });
    }
  };

  const addFaqQuestion = (catIdx) => {
    setFaqStructureEn(p => {
      const cats = [...p.categories];
      cats[catIdx] = {
        ...cats[catIdx],
        faqs: [...(cats[catIdx].faqs || []), { question: "", answer: "", fullAnswer: "", seoAnswer: "" }]
      };
      return { ...p, categories: cats };
    });
    setFaqStructureBn(p => {
      const cats = [...p.categories];
      cats[catIdx] = {
        ...cats[catIdx],
        faqs: [...(cats[catIdx].faqs || []), { question: "", answer: "", fullAnswer: "", seoAnswer: "" }]
      };
      return { ...p, categories: cats };
    });
  };

  const removeFaqQuestion = (catIdx, faqIdx) => {
    setFaqStructureEn(p => {
      const cats = [...p.categories];
      cats[catIdx] = {
        ...cats[catIdx],
        faqs: cats[catIdx].faqs.filter((_, i) => i !== faqIdx)
      };
      return { ...p, categories: cats };
    });
    setFaqStructureBn(p => {
      const cats = [...p.categories];
      cats[catIdx] = {
        ...cats[catIdx],
        faqs: cats[catIdx].faqs.filter((_, i) => i !== faqIdx)
      };
      return { ...p, categories: cats };
    });
  };

  const handleFaqFieldChange = (catIdx, faqIdx, lang, field, value) => {
    if (lang === "en") {
      setFaqStructureEn(p => {
        const cats = [...p.categories];
        const faqs = [...cats[catIdx].faqs];
        faqs[faqIdx] = { ...faqs[faqIdx], [field]: value };
        cats[catIdx] = { ...cats[catIdx], faqs };
        return { ...p, categories: cats };
      });
    } else {
      setFaqStructureBn(p => {
        const cats = [...p.categories];
        const faqs = [...cats[catIdx].faqs];
        faqs[faqIdx] = { ...faqs[faqIdx], [field]: value };
        cats[catIdx] = { ...cats[catIdx], faqs };
        return { ...p, categories: cats };
      });
    }
  };

  const handleModeChange = (mode) => {
    if (mode === "visual") {
      try {
        const parsed = JSON.parse(jsonInput);
        setFaqStructureEn(parsed.en || {});
        setFaqStructureBn(parsed.bn || {});
      } catch (e) {
        Swal.fire("Validation Error", "Invalid JSON format", "error");
        return;
      }
    } else {
      setJsonInput(JSON.stringify({ en: faqStructureEn, bn: faqStructureBn }, null, 2));
    }
    setEditorMode(mode);
  };

  const handleApplyBulkJson = () => {
    try {
      const parsed = JSON.parse(jsonInput.trim());
      setFaqStructureEn(parsed.en || {});
      setFaqStructureBn(parsed.bn || {});
      Swal.fire({ icon: "success", title: "JSON Applied!", timer: 1000, showConfirmButton: false });
      setEditorMode("visual");
    } catch (e) {
      Swal.fire("Error", "Invalid JSON format", "error");
    }
  };

  const handleSave = () => {
    savePageMutation.mutate(
      {
        slug: "faq",
        data: {
          titleEn: form.titleEn,
          titleBn: form.titleBn,
          contentEn: faqStructureEn,
          contentBn: faqStructureBn,
          seoTitleEn: form.seoTitleEn,
          seoTitleBn: form.seoTitleBn,
          seoDescriptionEn: form.seoDescriptionEn,
          seoDescriptionBn: form.seoDescriptionBn,
        }
      },
      {
        onSuccess: () => {
          Swal.fire({ icon: "success", title: "Saved!", text: "FAQ catalog saved successfully.", timer: 1500, showConfirmButton: false });
        }
      }
    );
  };

  if (isLoading) return <Loader />;

  // Preview computations
  const currentStructure = previewLocale === "en" ? faqStructureEn : faqStructureBn;
  const categoriesList = currentStructure.categories || [];
  const selectedPreviewCat = categoriesList[activePreviewCatIdx] || { category: "General", faqs: [] };

  return (
    <div className="space-y-6">
      {/* Mode Switcher */}
      <div className="flex justify-between items-center bg-slate-50 px-6 py-4 rounded-[1.5rem] border border-slate-200">
        <span className="text-sm font-bold text-slate-700">FAQ Editor Mode:</span>
        <div className="flex space-x-1 bg-slate-200/60 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => handleModeChange("visual")}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition duration-200 ${
              editorMode === "visual" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500"
            }`}
          >
            Visual Builder
          </button>
          <button
            type="button"
            onClick={() => handleModeChange("json")}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition duration-200 ${
              editorMode === "json" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500"
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
            <div className="space-y-6">
              {/* Hero Stacked Layout */}
              <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-200 space-y-6">
                <h3 className="font-bold text-slate-800 text-sm border-b pb-2 uppercase tracking-wide">FAQ Page Hero Section</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* English Hero */}
                  <div className="space-y-4 bg-white p-5 rounded-xl border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">🇬🇧 English Translation</span>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Heading</label>
                      <input
                        type="text"
                        value={faqStructureEn.hero.heading}
                        onChange={(e) => handleHeroChange("en", "heading", e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Subheading</label>
                      <input
                        type="text"
                        value={faqStructureEn.hero.subheading}
                        onChange={(e) => handleHeroChange("en", "subheading", e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm"
                      />
                    </div>
                  </div>

                  {/* Bangla Hero */}
                  <div className="space-y-4 bg-white p-5 rounded-xl border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">🇧🇩 Bangla Translation</span>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Heading (Bangla)</label>
                      <input
                        type="text"
                        value={faqStructureBn.hero.heading}
                        onChange={(e) => handleHeroChange("bn", "heading", e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Subheading (Bangla)</label>
                      <input
                        type="text"
                        value={faqStructureBn.hero.subheading}
                        onChange={(e) => handleHeroChange("bn", "subheading", e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Categories & FAQs */}
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-black text-slate-800 uppercase tracking-wider">FAQ Categories</label>
                  <button
                    type="button"
                    onClick={addCategory}
                    className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold uppercase transition duration-300 shadow-md shadow-indigo-100"
                  >
                    + Add Category
                  </button>
                </div>

                {faqStructureEn.categories.length === 0 ? (
                  <div className="p-8 text-center bg-slate-50 rounded-[2rem] border border-dashed border-slate-300 text-slate-400 font-medium">
                    No categories found. Click "+ Add Category" to begin building.
                  </div>
                ) : (
                  faqStructureEn.categories.map((cat, catIdx) => {
                    const catBn = faqStructureBn.categories[catIdx] || { category: "", faqs: [] };
                    return (
                      <div key={catIdx} className={`bg-slate-50 p-6 rounded-[2rem] border space-y-6 ${activePreviewCatIdx === catIdx ? "border-indigo-500 ring-2 ring-indigo-500/10" : "border-slate-200"}`}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center border-b pb-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <label className="block text-[8px] font-bold text-slate-400 uppercase tracking-wider">Category Name (English)</label>
                              <button
                                type="button"
                                onClick={() => setActivePreviewCatIdx(catIdx)}
                                className={`text-[8px] font-black px-1.5 py-0.5 rounded ${activePreviewCatIdx === catIdx ? "bg-indigo-600 text-white" : "bg-slate-200 text-slate-500"}`}
                              >
                                View in Preview
                              </button>
                            </div>
                            <input
                              type="text"
                              value={cat.category}
                              onChange={(e) => handleCategoryNameChange(catIdx, "en", e.target.value)}
                              className="w-full font-bold text-slate-800 text-sm bg-white px-3 py-1.5 border border-slate-200 rounded-lg"
                            />
                          </div>
                          <div className="flex gap-2 items-center">
                            <div className="flex-grow">
                              <label className="block text-[8px] font-bold text-slate-400 uppercase tracking-wider mb-1">Category Name (Bangla)</label>
                              <input
                                type="text"
                                value={catBn.category}
                                onChange={(e) => handleCategoryNameChange(catIdx, "bn", e.target.value)}
                                className="w-full font-bold text-slate-800 text-sm bg-white px-3 py-1.5 border border-slate-200 rounded-lg"
                              />
                            </div>
                            <div className="flex items-center gap-2 pt-4">
                              <button
                                type="button"
                                onClick={() => addFaqQuestion(catIdx)}
                                className="text-xs bg-indigo-100 hover:bg-indigo-200 text-indigo-600 px-3 py-1.5 rounded-lg font-bold"
                              >
                                + Q/A
                              </button>
                              <button
                                type="button"
                                onClick={() => removeCategory(catIdx)}
                                className="text-red-500 hover:text-red-700 p-1.5"
                              >
                                ✕
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Questions */}
                        <div className="space-y-4">
                          {(!cat.faqs || cat.faqs.length === 0) ? (
                            <div className="text-center py-6 text-xs text-slate-400 font-medium bg-white rounded-xl border border-dashed">
                              No questions in this category. Click "+ Q/A" to start.
                            </div>
                          ) : (
                            cat.faqs.map((faq, faqIdx) => {
                              const faqBn = catBn.faqs?.[faqIdx] || { question: "", answer: "", fullAnswer: "", seoAnswer: "" };
                              return (
                                <div key={faqIdx} className="p-5 bg-white border border-slate-200 rounded-2xl relative space-y-4 shadow-sm">
                                  <div className="flex justify-between items-center border-b pb-2">
                                    <span className="text-[10px] bg-slate-100 text-slate-500 px-2.5 py-1 rounded-md font-bold">FAQ Query #{faqIdx + 1}</span>
                                    <button
                                      type="button"
                                      onClick={() => removeFaqQuestion(catIdx, faqIdx)}
                                      className="text-red-400 hover:text-red-600 font-bold text-xs"
                                    >
                                      Delete Query
                                    </button>
                                  </div>

                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* English Q/A */}
                                    <div className="space-y-3 bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                                      <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest block">🇬🇧 English Translation</span>
                                      <div>
                                        <label className="block text-[8px] font-bold text-slate-400 uppercase tracking-wider mb-1">Question</label>
                                        <input
                                          type="text"
                                          value={faq.question || ""}
                                          onChange={(e) => handleFaqFieldChange(catIdx, faqIdx, "en", "question", e.target.value)}
                                          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                                        />
                                      </div>
                                      <div>
                                        <label className="block text-[8px] font-bold text-slate-400 uppercase tracking-wider mb-1">SEO Answer Summary</label>
                                        <input
                                          type="text"
                                          value={faq.seoAnswer || ""}
                                          onChange={(e) => handleFaqFieldChange(catIdx, faqIdx, "en", "seoAnswer", e.target.value)}
                                          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                                        />
                                      </div>
                                      <div>
                                        <label className="block text-[8px] font-bold text-slate-400 uppercase tracking-wider mb-1">Detailed Answer Text</label>
                                        <textarea
                                          value={faq.fullAnswer || faq.answer || ""}
                                          onChange={(e) => {
                                            handleFaqFieldChange(catIdx, faqIdx, "en", "fullAnswer", e.target.value);
                                            handleFaqFieldChange(catIdx, faqIdx, "en", "answer", e.target.value);
                                          }}
                                          rows={3}
                                          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                                        />
                                      </div>
                                    </div>

                                    {/* Bangla Q/A */}
                                    <div className="space-y-3 bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                                      <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest block">🇧🇩 Bangla Translation</span>
                                      <div>
                                        <label className="block text-[8px] font-bold text-slate-400 uppercase tracking-wider mb-1">Question (Bangla)</label>
                                        <input
                                          type="text"
                                          value={faqBn.question || ""}
                                          onChange={(e) => handleFaqFieldChange(catIdx, faqIdx, "bn", "question", e.target.value)}
                                          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                                        />
                                      </div>
                                      <div>
                                        <label className="block text-[8px] font-bold text-slate-400 uppercase tracking-wider mb-1">SEO Answer Summary (Bangla)</label>
                                        <input
                                          type="text"
                                          value={faqBn.seoAnswer || ""}
                                          onChange={(e) => handleFaqFieldChange(catIdx, faqIdx, "bn", "seoAnswer", e.target.value)}
                                          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                                        />
                                      </div>
                                      <div>
                                        <label className="block text-[8px] font-bold text-slate-400 uppercase tracking-wider mb-1">Detailed Answer (Bangla)</label>
                                        <textarea
                                          value={faqBn.fullAnswer || faqBn.answer || ""}
                                          onChange={(e) => {
                                            handleFaqFieldChange(catIdx, faqIdx, "bn", "fullAnswer", e.target.value);
                                            handleFaqFieldChange(catIdx, faqIdx, "bn", "answer", e.target.value);
                                          }}
                                          rows={3}
                                          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Bottom CTA Block */}
              <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-200 space-y-6">
                <h3 className="font-bold text-slate-800 text-sm border-b pb-2 uppercase tracking-wide">FAQ Bottom CTA</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* English CTA */}
                  <div className="space-y-4 bg-white p-5 rounded-xl border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">🇬🇧 English Translation</span>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Heading</label>
                      <input
                        type="text"
                        value={faqStructureEn.cta.heading}
                        onChange={(e) => handleCtaChange("en", "heading", e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Subtext</label>
                      <input
                        type="text"
                        value={faqStructureEn.cta.subtext}
                        onChange={(e) => handleCtaChange("en", "subtext", e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Button Text</label>
                      <input
                        type="text"
                        value={faqStructureEn.cta.buttonText}
                        onChange={(e) => handleCtaChange("en", "buttonText", e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm"
                      />
                    </div>
                  </div>

                  {/* Bangla CTA */}
                  <div className="space-y-4 bg-white p-5 rounded-xl border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">🇧🇩 Bangla Translation</span>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Heading (Bangla)</label>
                      <input
                        type="text"
                        value={faqStructureBn.cta.heading}
                        onChange={(e) => handleCtaChange("bn", "heading", e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Subtext (Bangla)</label>
                      <input
                        type="text"
                        value={faqStructureBn.cta.subtext}
                        onChange={(e) => handleCtaChange("bn", "subtext", e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Button Text (Bangla)</label>
                      <input
                        type="text"
                        value={faqStructureBn.cta.buttonText}
                        onChange={(e) => handleCtaChange("bn", "buttonText", e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Shared Button Link (Href)</label>
                  <input
                    type="text"
                    value={faqStructureEn.cta.buttonLink}
                    onChange={(e) => {
                      handleCtaChange("en", "buttonLink", e.target.value);
                      handleCtaChange("bn", "buttonLink", e.target.value);
                    }}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm"
                  />
                </div>
              </div>

              {/* SEO Controls */}
              <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-200 space-y-6">
                <h3 className="font-bold text-slate-800 text-sm border-b pb-2 uppercase tracking-wide">Page Info & SEO Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* English page settings */}
                  <div className="space-y-4 bg-white p-5 rounded-xl border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">🇬🇧 English Info</span>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Page Title</label>
                      <input
                        type="text"
                        value={form.titleEn}
                        onChange={(e) => setForm(p => ({ ...p, titleEn: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase mb-2">SEO Title</label>
                      <input
                        type="text"
                        value={form.seoTitleEn}
                        onChange={(e) => setForm(p => ({ ...p, seoTitleEn: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase mb-2">SEO Description</label>
                      <textarea
                        value={form.seoDescriptionEn}
                        onChange={(e) => setForm(p => ({ ...p, seoDescriptionEn: e.target.value }))}
                        rows={2}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm"
                      />
                    </div>
                  </div>

                  {/* Bangla page settings */}
                  <div className="space-y-4 bg-white p-5 rounded-xl border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">🇧🇩 Bangla Info</span>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Page Title (Bangla)</label>
                      <input
                        type="text"
                        value={form.titleBn}
                        onChange={(e) => setForm(p => ({ ...p, titleBn: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase mb-2">SEO Title (Bangla)</label>
                      <input
                        type="text"
                        value={form.seoTitleBn}
                        onChange={(e) => setForm(p => ({ ...p, seoTitleBn: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase mb-2">SEO Description (Bangla)</label>
                      <textarea
                        value={form.seoDescriptionBn}
                        onChange={(e) => setForm(p => ({ ...p, seoDescriptionBn: e.target.value }))}
                        rows={2}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <div className="border-t pt-6 flex justify-end">
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={savePageMutation.isPending}
                  className="px-8 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-200 transition disabled:opacity-50"
                >
                  {savePageMutation.isPending ? "Saving..." : "Save FAQ Catalog"}
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
              <textarea
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                rows={15}
                className="w-full p-4 font-mono text-xs border border-slate-200 rounded-xl bg-white"
              />
              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={handleApplyBulkJson}
                  disabled={!jsonInput.trim()}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black uppercase"
                >
                  Apply JSON Changes
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Interactive Mockup Preview (FAQ Page Mock) */}
        <div className="sticky top-6 space-y-6">
          <div className="flex justify-between items-center bg-slate-900 text-white px-5 py-3.5 rounded-2xl border border-white/5 shadow">
            <span className="text-xs font-black uppercase tracking-widest text-slate-400">FAQ Page Preview</span>
            <div className="flex items-center bg-slate-800 p-1 rounded-xl border border-white/5">
              <button
                type="button"
                onClick={() => setPreviewLocale("en")}
                className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase transition ${previewLocale === "en" ? "bg-red-600 text-white shadow" : "text-slate-400 hover:text-white"}`}
              >
                🇬🇧 En
              </button>
              <button
                type="button"
                onClick={() => setPreviewLocale("bn")}
                className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase transition ${previewLocale === "bn" ? "bg-red-600 text-white shadow font-bangla" : "text-slate-400 hover:text-white"}`}
              >
                🇧🇩 Bn
              </button>
            </div>
          </div>

          <div className="relative rounded-[2.5rem] overflow-hidden bg-[#09090b] text-white border border-white/5 p-8 shadow-2xl flex flex-col justify-between space-y-8">
            <div className="text-center">
              <span className="inline-block px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-amber-500 text-[8px] font-black tracking-widest uppercase mb-3 shadow">
                {previewLocale === "en" ? "FAQ" : "সাধারণ জিজ্ঞাসা"}
              </span>
              <h2 className="text-xl md:text-2xl font-black text-white tracking-tight uppercase">
                {currentStructure.hero.heading || (previewLocale === "en" ? "Frequently Asked Questions" : "সাধারণ জিজ্ঞাসা")}
              </h2>
              {currentStructure.hero.subheading && (
                <p className="text-[10px] text-slate-400 mt-2">{currentStructure.hero.subheading}</p>
              )}
              <div className="w-12 h-0.5 bg-red-600 mx-auto mt-3 rounded-full"></div>
            </div>

            {/* Category tabs */}
            {categoriesList.length > 0 && (
              <div className="flex flex-wrap gap-1.5 justify-center">
                {categoriesList.map((cat, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setActivePreviewCatIdx(idx);
                      setExpandedPreviewFaqIdx(null);
                    }}
                    className={`px-3 py-1 rounded-xl text-[9px] font-black uppercase transition ${activePreviewCatIdx === idx ? "bg-red-600 text-white shadow" : "bg-white/5 text-slate-400 hover:bg-white/10"}`}
                  >
                    {cat.category || "Category"}
                  </button>
                ))}
              </div>
            )}

            {/* Q/A List */}
            <div className="space-y-3">
              {(!selectedPreviewCat.faqs || selectedPreviewCat.faqs.length === 0) ? (
                <div className="text-center py-6 text-[10px] text-slate-500 bg-white/[0.01] rounded-xl border border-dashed border-white/5">
                  No FAQ questions in this category.
                </div>
              ) : (
                selectedPreviewCat.faqs.map((faq, idx) => {
                  const active = expandedPreviewFaqIdx === idx;
                  return (
                    <div key={idx} className="rounded-xl border border-white/5 overflow-hidden bg-white/[0.01]">
                      <button
                        type="button"
                        onClick={() => setExpandedPreviewFaqIdx(active ? null : idx)}
                        className="w-full px-4 py-3 flex justify-between items-center text-left text-xs font-bold text-slate-300 hover:bg-white/5 transition"
                      >
                        <span>{faq.question || "Question Text?"}</span>
                        {active ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </button>
                      {active && (
                        <div className="px-4 py-3 bg-white/[0.02] border-t border-white/5 text-[10px] text-slate-400 leading-relaxed font-semibold">
                          {faq.fullAnswer || faq.answer || "Answer description text."}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* Bottom CTA Mockup */}
            {currentStructure.cta && (
              <div className="bg-white/[0.02] border border-white/5 p-6 rounded-[1.8rem] text-center space-y-3">
                <h3 className="text-xs font-black text-white uppercase">{currentStructure.cta.heading || "Need more help?"}</h3>
                {currentStructure.cta.subtext && (
                  <p className="text-[9px] text-slate-400 leading-relaxed">{currentStructure.cta.subtext}</p>
                )}
                <a
                  href="#contact"
                  onClick={(e) => e.preventDefault()}
                  className="inline-block px-5 py-2.5 bg-[#ec1b23] hover:bg-red-700 hover:scale-105 transition-all text-white text-[9px] font-black uppercase tracking-wider rounded-xl shadow shadow-red-950/20"
                >
                  {currentStructure.cta.buttonText || "Contact Us"}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqEditor;
