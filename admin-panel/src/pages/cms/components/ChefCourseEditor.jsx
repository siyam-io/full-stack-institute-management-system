import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, CheckCircle2, Clock, Eye, Globe, Hash, PencilLine, Save, Wallet } from "lucide-react";
import Loader from "../../../components/Loader";
import { useCoursePublicPage, useCourses } from "../../../hooks/useCourses";
import { useSection, useUpdateSection } from "../../../hooks/useCms";
import { apiURL } from "../../../../Constant";

const resolveImageUrl = (url) => {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url.replace(/^http:\/\/localhost:3000/, apiURL.fontend_url);
  }
  if (url.startsWith("/images/")) return `${apiURL.fontend_url}${url}`;
  return `${apiURL.image_url}${url}`;
};

const formatMoney = (value) => {
  const amount = Number(value || 0);
  if (!amount) return "Fee not set";
  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(amount);
};

const getJsonCount = (value) => {
  if (Array.isArray(value)) return value.length;
  if (!value) return 0;
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.length : 0;
  } catch {
    return 0;
  }
};

const CourseCard = ({ course, selected, onSelect }) => (
  <button
    type="button"
    onClick={onSelect}
    className={`w-full text-left p-4 rounded-2xl border transition-all ${selected
      ? "border-power-red/30 bg-power-red/10 shadow-sm"
      : "border-white/10 bg-white/5 hover:border-power-red/30 hover:bg-white/5"
      }`}
  >
    <div className="flex items-start justify-between gap-3">
      <div>
        <h3 className="font-black text-white text-sm leading-snug">
          {course.course_name || course.name || "Untitled Course"}
        </h3>
        <div className="mt-2 flex flex-wrap gap-2 text-[11px] font-bold text-zinc-500">
          <span className="inline-flex items-center gap-1">
            <Hash size={12} /> {course.course_code || course.code || "NO-CODE"}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock size={12} /> {course.duration?.value || course.durationValue || 0} {course.duration?.unit || course.durationUnit || "months"}
          </span>
        </div>
      </div>
      <span className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wider ${course.publicPageStatus === "published"
        ? "bg-emerald-50 text-emerald-700"
        : course.publicPageStatus === "draft"
          ? "bg-amber-50 text-amber-700"
          : "bg-white/5 text-zinc-500"
        }`}>
        {course.publicPageStatus || "not ready"}
      </span>
    </div>
    <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1 text-[11px] font-black text-zinc-200 border border-white/10">
      <Wallet size={12} /> {formatMoney(course.base_fee || course.baseFee)}
    </div>
  </button>
);

const CoursePreview = ({ course, pageData, isLoading, onEdit }) => {
  if (!course) {
    return (
      <div className="h-full min-h-[420px] rounded-3xl border border-dashed border-white/15 bg-white/5 flex items-center justify-center text-sm font-bold text-zinc-500">
        Select a course to preview.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="h-full min-h-[420px] rounded-3xl border border-white/10 bg-white/5 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  const coverImage = resolveImageUrl(pageData?.coverImageUrl || pageData?.cover_image_url || course.cover_image_url || course.coverImageUrl);
  const title = pageData?.heroTitleEn || pageData?.heroTitle || pageData?.title || course.course_name || course.name;
  const subtitle = pageData?.heroSubtitleEn || pageData?.heroSubtitle || pageData?.excerpt || course.short_description || "Become a Professional Chef in 6 Months";

  // Extract features/highlights
  const rawFeatures =
    pageData?.contentEn?.highlights ||
    pageData?.contentBn?.highlights ||
    pageData?.content?.highlights ||
    pageData?.highlights ||
    pageData?.contentEn?.features ||
    pageData?.contentBn?.features ||
    pageData?.content?.features ||
    pageData?.features ||
    pageData?.outcomesEn ||
    pageData?.outcomesBn ||
    pageData?.outcomes ||
    [];
  let mappedFeatures = [];
  if (Array.isArray(rawFeatures)) {
    mappedFeatures = rawFeatures.map(item => {
      if (typeof item === 'string') return item;
      if (item?.titleEn) return item.titleEn;
      if (item?.title) return item.title;
      if (item?.en) return item.en;
      if (item?.label) return item.label;
      return "";
    }).filter(Boolean);
  }
  if (mappedFeatures.length === 0) {
    mappedFeatures = ["100% Practical Labs", "NSDA Level 2 & 3", "5-Star Hotel Placements"];
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-obsidian text-white overflow-hidden shadow-2xl flex flex-col justify-between">


      {/* Main Grid Mockup */}
      <div className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

        {/* Left Side: Info */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-1 bg-power-red shadow-[0_0_10px] shadow-power-red/60"></div>
            <span className="text-zinc-500 font-black tracking-widest text-[10px] md:text-xs uppercase">
              {subtitle}
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-black leading-tight tracking-tight text-white">
            {title}
          </h2>

          <div className="inline-flex flex-col p-4 rounded-2xl bg-white/5[0.03] border border-white/5 backdrop-blur-md">
            <span className="text-zinc-500 text-[9px] font-bold tracking-widest uppercase mb-1">Investment Capital</span>
            <div className="text-2xl font-black text-white tracking-tighter">
              {formatMoney(course.base_fee || course.baseFee)}
            </div>
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {mappedFeatures.slice(0, 4).map((feat, i) => (
              <li key={i} className="flex items-center gap-2 text-zinc-400">
                <div className="p-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400">
                  <CheckCircle2 size={12} className="shrink-0" />
                </div>
                <span className="text-xs font-bold text-zinc-500">{feat}</span>
              </li>
            ))}
          </ul>

          <div>
            <button
              type="button"
              className="px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-wider bg-power-red text-white shadow-lg shadow-power-red/30 hover:scale-105 transition"
            >
              Apply Now
            </button>
          </div>
        </div>

        {/* Right Side: Image Card */}
        <div className="relative w-[360px] h-[450px] mx-auto rounded-[3.5rem] overflow-hidden border border-white/5 shadow-2xl group shrink-0">
          {coverImage ? (
            <img src={coverImage} alt={title} className="h-full w-full object-cover transform group-hover:scale-110 transition-transform duration-[2000ms]" />
          ) : (
            <div className="h-full w-full bg-slate-900 flex items-center justify-center text-xs font-bold text-zinc-500">
              No Cover Image
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
          <span className="absolute bottom-6 left-6 text-[11px] font-black uppercase text-white/90 tracking-wider">
            Practical Class at Culinary Academy
          </span>
        </div>
      </div>

      {/* Action Footer */}
      <div className="px-6 py-4 bg-slate-950/40 border-t border-white/5 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onEdit}
          className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-power-red px-4 py-2.5 text-xs font-black uppercase tracking-wider text-white hover:bg-[#C8102E] transition"
        >
          <PencilLine size={14} /> Edit Public Page
        </button>
        <a
          href={`${apiURL.fontend_url}/courses/${pageData?.slug || course.slug || ""}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/10 px-4 py-2.5 text-xs font-black uppercase tracking-wider text-zinc-400 hover:bg-white/5 transition"
        >
          <Eye size={14} /> Web Preview
        </a>
      </div>
    </div>
  );
};

const ChefCourseEditor = () => {
  const navigate = useNavigate();
  const { data: coursesRes, isLoading, error, refetch, isRefetching } = useCourses(1, 100, {});
  const { data: section } = useSection("professional_chef_course");
  const updateSection = useUpdateSection();
  const courses = useMemo(() => coursesRes?.data || [], [coursesRes]);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [didInitSelection, setDidInitSelection] = useState(false);
  const selectedCourse = courses.find((course) => course.id === selectedCourseId || course._id === selectedCourseId);
  const { data: pageData, isLoading: isPageLoading } = useCoursePublicPage(selectedCourseId, "en");

  console.log("pageData", pageData);

  useEffect(() => {
    if (didInitSelection || courses.length === 0) return;

    const savedCourseId = section?.dataEn?.selectedCourseId || section?.dataBn?.selectedCourseId;
    const hasSavedCourse = savedCourseId && courses.some((course) => (course.id || course._id) === savedCourseId);
    setSelectedCourseId(hasSavedCourse ? savedCourseId : (courses[0].id || courses[0]._id));
    setDidInitSelection(true);
  }, [courses, didInitSelection, section]);

  const handleSaveSelection = () => {
    if (!selectedCourseId || !selectedCourse) return;

    const savedData = {
      selectedCourseId,
      selectedCourseSlug: pageData?.slug || selectedCourse.slug || "",
    };

    updateSection.mutate({
      sectionKey: "professional_chef_course",
      data: {
        dataEn: {
          ...(section?.dataEn || {}),
          ...savedData,
        },
        dataBn: {
          ...(section?.dataBn || {}),
          ...savedData,
        },
        seoTitleEn: section?.seoTitleEn || "",
        seoTitleBn: section?.seoTitleBn || "",
        seoDescriptionEn: section?.seoDescriptionEn || "",
        seoDescriptionBn: section?.seoDescriptionBn || "",
        status: section?.status || "published",
      },
    });
  };

  const selectedIsSaved = Boolean(
    selectedCourseId &&
    selectedCourseId === (section?.dataEn?.selectedCourseId || section?.dataBn?.selectedCourseId)
  );

  if (isLoading || !didInitSelection) {
    if (!isLoading && courses.length === 0) {
      // let empty state render below
    } else {
      return <Loader />;
    }
  }


  if (error) {
    return (
      <div className="rounded-2xl border border-red-100 bg-red-50 p-6 text-center">
        <p className="text-sm font-bold text-red-700">Courses could not load.</p>
        <button
          type="button"
          onClick={refetch}
          disabled={isRefetching}
          className="mt-4 rounded-xl bg-red-600 px-5 py-2 text-xs font-black uppercase text-white disabled:opacity-50"
        >
          {isRefetching ? "Retrying..." : "Retry"}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-black text-white uppercase tracking-tight">Professional Chef Course Showcase</h2>
          <p className="mt-1 text-sm font-medium text-zinc-500">
            Main page now selects existing course records. Details stay in Course Management, preview stays beside list.
          </p>
        </div>
        <button
          type="button"
          onClick={() => navigate("/admin/all-courses")}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-black uppercase tracking-wider text-zinc-500 hover:bg-white/5"
        >
          <BookOpen size={15} /> Manage Courses
        </button>
        <button
          type="button"
          onClick={handleSaveSelection}
          disabled={!selectedCourseId || selectedIsSaved || updateSection.isPending}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-power-red px-4 py-2.5 text-xs font-black uppercase tracking-wider text-white hover:bg-[#C8102E] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Save size={15} /> {updateSection.isPending ? "Saving..." : selectedIsSaved ? "Saved For Home" : "Use On Home"}
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[380px_1fr] gap-6">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-xs font-black uppercase tracking-widest text-zinc-500">Course List</p>
            <span className="rounded-full bg-white/5 px-3 py-1 text-[11px] font-black text-zinc-500 border border-white/10">
              {courses.length}
            </span>
          </div>
          <div className="space-y-3 max-h-[720px] overflow-y-auto pr-1">
            {courses.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/15 bg-white/5 p-8 text-center text-sm font-bold text-zinc-500">
                No courses found.
              </div>
            ) : (
              courses.map((course) => (
                <CourseCard
                  key={course.id || course._id}
                  course={course}
                  selected={(course.id || course._id) === selectedCourseId}
                  onSelect={() => setSelectedCourseId(course.id || course._id)}
                />
              ))
            )}
          </div>
        </div>

        <CoursePreview
          course={selectedCourse}
          pageData={pageData}
          isLoading={isPageLoading}
          onEdit={() => selectedCourseId && navigate(`/admin/course-public-page/${selectedCourseId}`)}
        />
      </div>
    </div>
  );
};

export default ChefCourseEditor;
