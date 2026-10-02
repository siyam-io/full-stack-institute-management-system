import prisma from "../../../core/db/prisma.js";
import { serializeComment } from "../../../core/utils/serialize.js";
import AppError from "../../../core/errors/AppError.js";

export const addComment = async (studentId, instructorId, text) => {
  const comment = await prisma.comment.create({
    data: {
      text,
      student_id: studentId,
      comment_by: instructorId,
    },
    include: {
      student: {
        select: {
          id: true,
          student_name: true,
        }
      },
      commenter: {
        select: {
          id: true,
          full_name: true,
          photo_url: true,
          designation: true,
        }
      }
    }
  });

  return serializeComment(comment);
};

export const getStudentComments = async (studentId) => {
  const comments = await prisma.comment.findMany({
    where: {
      student_id: studentId,
    },
    include: {
      commenter: {
        select: {
          id: true,
          full_name: true,
          photo_url: true,
          designation: true,
        }
      }
    },
    orderBy: {
      created_at: "desc",
    }
  });
  return comments.map(serializeComment);
};

export const deleteComment = async (commentId) => {
  const comment = await prisma.comment.findUnique({
    where: { id: commentId }
  });
  if (!comment) throw new AppError("Comment not found", 404);
  await prisma.comment.delete({
    where: { id: commentId }
  });
};
