import React, { useState } from "react";
import HomeHeroEditor from "./components/HomeHeroEditor";
import ChefCourseEditor from "./components/ChefCourseEditor";
import TestimonialsEditor from "./components/TestimonialsEditor";
import StrategicTeamEditor from "./components/StrategicTeamEditor";
import MentorsEditor from "./components/MentorsEditor";
import FaqEditor from "./components/FaqEditor";

const TABS = [
  { key: "home_hero", label: "Home Hero" },
  { key: "course_highlight", label: "Course Highlight" },
  { key: "student_testimonials", label: "Student Testimonials" },
  { key: "strategic_team", label: "Strategic Team" },
  { key: "culinary_mentors", label: "Culinary Mentors" },
  { key: "faq", label: "FAQ Catalog" },
];

const MainPageEdit = () => {
  const [activeTab, setActiveTab] = useState("home_hero");

  const tabContent = () => {
    switch (activeTab) {
      case "home_hero":
        return <HomeHeroEditor />;
      case "course_highlight":
        return <ChefCourseEditor />;
      case "student_testimonials":
        return <TestimonialsEditor />;
      case "strategic_team":
        return <StrategicTeamEditor />;
      case "culinary_mentors":
        return <MentorsEditor />;
      case "faq":
        return <FaqEditor />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-full px-4 lg:px-8 mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-800 tracking-tighter uppercase">Main Page Edit</h1>
        <p className="text-slate-500 text-sm font-medium mt-1">Edit dynamic content sections for the public website with live interactive component preview</p>
      </div>

      {/* Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div className="flex flex-wrap gap-2">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${activeTab === tab.key
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-8">
        <div key={activeTab}>
          {tabContent()}
        </div>
      </div>
    </div>
  );
};

export default MainPageEdit;
