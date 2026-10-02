import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useBlogs, useDeleteBlog, useUpdateBlogStatus, useUpdateBlog } from "../../hooks/useBlogs";
import useAuth from "../../store/useAuth";
import { confirmDelete } from "../../utils/swalUtils";
import { PERMISSIONS } from "../../config/permissionConfig";
import { apiURL } from "../../../Constant";

// Components
import PageHeader from "../../components/common/PageHeader";
import DataErrorState from "../../components/common/DataErrorState";
import DataTable from "../../components/common/DataTable";
import ActionIconButton from "../../components/common/ActionIconButton";

// Icons
import { Edit, Trash2, FileText, Eye, CheckCircle2, XCircle, Star } from "lucide-react";

const AllBlogs = () => {
  const navigate = useNavigate();
  const { hasPermission } = useAuth();

  const canEdit = hasPermission(PERMISSIONS.BLOG_EDIT);
  const canPublish = hasPermission(PERMISSIONS.BLOG_PUBLISH);
  const canDelete = hasPermission(PERMISSIONS.BLOG_DELETE);
  const hasActionAccess = canEdit || canPublish || canDelete;

  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const limit = 15;

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(searchTerm), 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const filters = useMemo(() => ({
    ...(debouncedSearch && { search: debouncedSearch }),
    ...(statusFilter !== "all" && { status: statusFilter })
  }), [debouncedSearch, statusFilter]);

  const { data: blogsRes, isLoading, error, refetch, isRefetching } = useBlogs(page, limit, filters);
  const deleteBlogMutation = useDeleteBlog();
  const updateStatusMutation = useUpdateBlogStatus();
  const updateBlogMutation = useUpdateBlog();

  const blogs = blogsRes?.data || [];
  const pagination = blogsRes?.pagination;

  useEffect(() => { setPage(1); }, [filters]);

  const handleDeleteClick = (id, title) => {
    confirmDelete({
      title: "Delete Blog?",
      text: `Are you sure you want to delete "${title}"? This will soft delete the blog.`,
      confirmText: "Yes, delete",
      onConfirm: () => deleteBlogMutation.mutate(id)
    });
  };

  const handleStatusToggle = (id, currentStatus) => {
    const nextStatus = currentStatus === "published" ? "draft" : "published";
    updateStatusMutation.mutate({ id, status: nextStatus });
  };

  if (error) return <DataErrorState error={error} onRetry={refetch} isRetrying={isRefetching} />;

  const columns = [
    { label: "Blog Details" },
    { label: "Featured" },
    { label: "Languages" },
    { label: "Status" },
    { label: "Published At" },
    { label: "Updated At" },
    { label: "Actions", align: "right" }
  ];

  const getPreviewUrl = (slug) => {
    return `${apiURL.fontend_url}/blog/${slug}`;
  };

  const renderBlogRow = (blog) => (
    <tr key={blog.id} className="group border-b border-white/5 hover:bg-white/5 transition-colors">
      <td className="px-5 py-4">
        <div className="font-medium text-white flex items-center">
          <FileText size={16} className="mr-2 text-power-red shrink-0" />
          <span className="truncate max-w-[320px]">{blog.titleEn || blog.title}</span>
        </div>
        <div className="text-[11px] text-zinc-500 ml-6 font-mono truncate max-w-[320px]">{blog.slug}</div>
      </td>

      <td className="px-5 py-4">
        <button
          onClick={() => {
            updateBlogMutation.mutate({
              id: blog.id,
              blogData: { isFeatured: !blog.isFeatured }
            });
          }}
          disabled={updateBlogMutation.isPending}
          className="focus:outline-none transition-all hover:scale-110 cursor-pointer"
          title={blog.isFeatured ? "Unfeature blog" : "Feature blog"}
        >
          <Star
            size={18}
            className={blog.isFeatured ? "fill-amber-400 text-amber-500" : "text-zinc-500 hover:text-amber-400"}
          />
        </button>
      </td>

      <td className="px-5 py-4">
        <span className="px-2 py-0.5 text-xs bg-white/10 text-zinc-400 rounded-md font-mono font-bold uppercase">
          {blog.titleBn ? "EN + BN" : "EN"}
        </span>
      </td>

      <td className="px-5 py-4">
        <span className={`text-[11px] font-black tracking-widest uppercase px-2.5 py-1 rounded-full ${
          blog.status === "published" ? "bg-emerald-500/10 text-emerald-400" :
          blog.status === "archived" ? "bg-amber-500/10 text-amber-400" : "bg-white/10 text-zinc-500"
        }`}>
          {blog.status}
        </span>
      </td>

      <td className="px-5 py-4 text-sm text-zinc-500">
        {blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString() : "—"}
      </td>

      <td className="px-5 py-4 text-sm text-zinc-500">
        {blog.updatedAt ? new Date(blog.updatedAt).toLocaleDateString() : "—"}
      </td>

      <td className="px-5 py-4 text-right">
        <div className="flex items-center justify-end space-x-1.5 opacity-60 group-hover:opacity-100 transition-opacity duration-200">
          
          <ActionIconButton 
            icon={Eye} 
            variant="info" 
            onClick={() => window.open(getPreviewUrl(blog.slug), "_blank")} 
            title="Preview Public Page" 
          />

          {canPublish && (
            <ActionIconButton 
              icon={blog.status === "published" ? XCircle : CheckCircle2} 
              variant={blog.status === "published" ? "inactiveToggle" : "activeToggle"} 
              onClick={() => handleStatusToggle(blog.id, blog.status)} 
              disabled={updateStatusMutation.isPending} 
              title={blog.status === "published" ? "Unpublish (Draft)" : "Publish"} 
            />
          )}

          {canEdit && (
            <ActionIconButton 
              icon={Edit} 
              variant="primary" 
              onClick={() => navigate(`/admin/blogs/edit/${blog.id}`)} 
              title="Edit" 
            />
          )}

          {canDelete && (
            <ActionIconButton 
              icon={Trash2} 
              variant="danger" 
              disabled={deleteBlogMutation.isPending} 
              onClick={() => handleDeleteClick(blog.id, blog.title)} 
              title="Delete" 
            />
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="p-6 max-w-[1600px] mx-auto min-h-screen relative">
      <PageHeader 
        title="Blog Management"
        subtitle={`Total blogs: ${pagination?.total || 0}`}
        onAdd={() => navigate("/admin/blogs/add")}
        addText="Add Blog"
        addPermission={PERMISSIONS.BLOG_CREATE} 
      />

      <div className="mb-6 bg-white/5 p-4 rounded-[1.5rem] border border-white/10 shadow-sm flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by title or slug..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2.5 text-sm bg-white/5 border border-white/10 text-zinc-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-power-red/40 focus:border-transparent transition-all placeholder:text-zinc-500"
          />
        </div>
        <div className="flex gap-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 text-sm bg-white/5 border border-white/10 text-zinc-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-power-red/40 transition-all cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={blogs}
        renderRow={renderBlogRow}
        isLoading={isLoading}
        pagination={pagination}
        page={page}
        onPageChange={setPage}
        emptyStateIcon={FileText}
        emptyStateTitle="No blogs found"
      />
    </div>
  );
};

export default AllBlogs;
