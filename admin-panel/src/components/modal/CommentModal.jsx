import React, { useState } from "react";
import {
  useAddComment,
  useStudentComments,
  useDeleteComment,
} from "../../hooks/useStudents";
import { apiURL } from "../../../Constant";
import {
  MessageSquare,
  RefreshCw,
  Send,
  UserIcon,
  X,
  Trash2,
} from "lucide-react";
import Swal from "sweetalert2";
const CommentModal = ({ student, onClose }) => {
  const [commentText, setCommentText] = useState("");

  const { data: comments = [], isLoading } = useStudentComments(student._id);

  const addCommentMutation = useAddComment();
  const deleteCommentMutation = useDeleteComment();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    addCommentMutation.mutate(
      { studentId: student._id, text: commentText },
      { onSuccess: () => setCommentText("") },
    );
  };

  const handleDelete = (commentId) => {
    Swal.fire({
      title: "Delete Observation?",
      text: "Are you sure you want to delete this comment? This cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#94a3b8",
      confirmButtonText: "Yes, delete it",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCommentMutation.mutate(commentId);
      }
    });
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/5 w-full max-w-lg rounded-2xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between bg-white/5">
          <div className="flex items-center gap-3">
            <div className="bg-power-red/10 p-2 rounded-lg text-power-red">
              <MessageSquare size={20} />
            </div>
            <div>
              <h2 className="font-bold text-white">Student Observations</h2>
              <p className="text-[11px] text-zinc-500 uppercase tracking-wider">
                {student.student_name}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors text-zinc-500"
          >
            <X size={20} />
          </button>
        </div>

        {/* Comment List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white/5">
          {isLoading ? (
            <div className="flex justify-center py-10">
              <RefreshCw className="animate-spin text-power-red" />
            </div>
          ) : comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment._id} className="flex gap-3 relative group">
                <div className="h-8 w-8 rounded-full bg-power-red/10 flex items-center justify-center text-power-red border border-power-red/30 shrink-0 overflow-hidden">
                  {(comment.commenter?.photo_url || comment.instructor?.photo_url) ? (
                    <img
                      src={`${apiURL.image_url}${comment.commenter?.photo_url || comment.instructor?.photo_url}`}
                      className="h-full w-full object-cover"
                      alt="User"
                    />
                  ) : (
                    <UserIcon size={14} />
                  )}
                </div>
                <div className="flex-1 bg-white/5 p-3 rounded-2xl rounded-tl-none border border-white/10 shadow-sm relative">
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-xs font-bold text-white">
                      {comment.commenter?.full_name || comment.instructor?.full_name || "User"}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-zinc-500">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </span>

                      <button
                        onClick={() => handleDelete(comment._id)}
                        disabled={deleteCommentMutation.isPending}
                        className="text-red-400 hover:text-red-600 hover:bg-red-50 p-1 rounded transition-colors opacity-0 group-hover:opacity-100"
                        title="Delete Comment"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-200 leading-relaxed pr-6">
                    {comment.text}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10">
              <div className="text-zinc-400 mb-2 flex justify-center">
                <MessageSquare size={40} />
              </div>
              <p className="text-zinc-500 text-sm">
                No comments yet for this student.
              </p>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t bg-white/5">
          <form onSubmit={handleSubmit} className="relative">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a private observation..."
              className="w-full border border-white/10 rounded-xl px-4 py-3 pr-12 text-sm focus:ring-2 focus:ring-power-red/40 outline-none resize-none min-h-[80px]"
            />
            <button
              type="submit"
              disabled={!commentText.trim() || addCommentMutation.isPending}
              className="absolute bottom-3 right-3 p-2 bg-power-red text-white rounded-lg hover:bg-[#C8102E] disabled:opacity-50 transition-all"
            >
              {addCommentMutation.isPending ? (
                <RefreshCw size={18} className="animate-spin" />
              ) : (
                <Send size={18} />
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
