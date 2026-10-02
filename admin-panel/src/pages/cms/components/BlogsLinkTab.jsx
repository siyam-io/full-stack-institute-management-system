import React from "react";
import { useNavigate } from "react-router-dom";

const BlogsLinkTab = () => {
  const navigate = useNavigate();
  return (
    <div className="space-y-6">
      <p className="text-slate-600 text-sm leading-relaxed">
        Blog posts are managed through the dedicated admin pages. Use the links below to create, edit, and publish.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={() => navigate("/admin/blogs")}
          className="group p-6 rounded-2xl border border-slate-200 bg-white hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-50 transition-all duration-300 text-left"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
              <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </div>
            <div>
              <h4 className="font-bold text-slate-800">All Blogs</h4>
              <p className="text-xs text-slate-400">View and manage all blog posts</p>
            </div>
          </div>
          <span className="text-xs font-bold text-indigo-600 group-hover:underline">Open Blogs →</span>
        </button>
        <button
          onClick={() => navigate("/admin/blogs/add")}
          className="group p-6 rounded-2xl border border-slate-200 bg-white hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-50 transition-all duration-300 text-left"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center group-hover:bg-green-100 transition-colors">
              <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <div>
              <h4 className="font-bold text-slate-800">New Blog Post</h4>
              <p className="text-xs text-slate-400">Create a new blog post</p>
            </div>
          </div>
          <span className="text-xs font-bold text-indigo-600 group-hover:underline">Create Blog →</span>
        </button>
      </div>
    </div>
  );
};

export default BlogsLinkTab;
