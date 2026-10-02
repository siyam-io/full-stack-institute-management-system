import React from "react";
import { useNavigate } from "react-router-dom";

const CoursesLinkTab = () => {
  const navigate = useNavigate();
  return (
    <div className="space-y-6">
      <p className="text-slate-600 text-sm leading-relaxed">
        Courses are managed through the dedicated admin pages. Use the links below to navigate.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={() => navigate("/admin/all-courses")}
          className="group p-6 rounded-2xl border border-slate-200 bg-white hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-50 transition-all duration-300 text-left"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
              <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div>
              <h4 className="font-bold text-slate-800">All Courses</h4>
              <p className="text-xs text-slate-400">View and manage all courses</p>
            </div>
          </div>
          <span className="text-xs font-bold text-indigo-600 group-hover:underline">Open Courses →</span>
        </button>
        <a
          href="/admin/all-courses"
          onClick={(e) => { e.preventDefault(); navigate("/admin/all-courses"); }}
          className="group p-6 rounded-2xl border border-slate-200 bg-white hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-50 transition-all duration-300 text-left block"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center group-hover:bg-green-100 transition-colors">
              <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h4 className="font-bold text-slate-800">Course Public Pages</h4>
              <p className="text-xs text-slate-400">Select a course to edit its public page, SEO & content</p>
            </div>
          </div>
          <span className="text-xs font-bold text-indigo-600 group-hover:underline">Browse Courses →</span>
        </a>
      </div>
    </div>
  );
};

export default CoursesLinkTab;
