import { getId, getImageUrl, toNumber } from "./common.js";
import { mapCourse } from "./course.mapper.js";
import { mapBatch } from "./batch.mapper.js";

/**
 * Map a single student from API response to UI shape.
 */
export const mapStudent = (student) => {
  if (!student) return student;

  const id = student.id;

  const mapped = {
    id,
    _id: id,
    // New camelCase accessors
    name: student.studentName || "",
    nameBn: student.studentNameBn || "",
    fatherName: student.fathersName || "",
    fatherNameBn: student.fathersNameBn || "",
    studentId: student.studentId,
    registrationNumber: student.registrationNumber,
    competency: student.competency || "not_assessed",
    status: student.status || "active",
    isActive: student.isActive !== undefined ? student.isActive : true,
    isVerified: student.isVerified !== undefined ? student.isVerified : false,
    issueDate: student.issueDate,
    completionDate: student.completionDate,
    photoUrl: getImageUrl(student.photoUrl),
    gender: student.gender,
    contactNumber: student.contactNumber,
    email: student.email,
    address: student.address,
    createdAt: student.createdAt,
    updatedAt: student.updatedAt,
    student_name: student.studentName || "",
    student_name_bn: student.studentNameBn || "",
    fathers_name: student.fathersName || "",
    fathers_name_bn: student.fathersNameBn || "",
    student_id: student.studentId,
    registration_number: student.registrationNumber,
    is_active: student.isActive !== undefined ? student.isActive : true,
    is_verified: student.isVerified !== undefined ? student.isVerified : false,
    issue_date: student.issueDate,
    completion_date: student.completionDate,
    photo_url: student.photoUrl || "",
    contact_number: student.contactNumber,
  };

  // Map nested relations
  if (student.course && typeof student.course === "object") {
    mapped.course = mapCourse(student.course);
    mapped.courseName = mapped.course.name;
    mapped.course_name = mapped.course.course_name;
  } else {
    const cId = student.courseId;
    if (cId) {
      mapped.course = {
        id: cId,
        _id: cId,
        name: student.courseName || "",
        course_name: student.courseName || "",
        course_code: student.courseCode || "",
      };
      mapped.courseName = student.courseName || "";
      mapped.course_name = student.courseName || "";
    }
  }

  if (student.batch && typeof student.batch === "object") {
    mapped.batch = mapBatch(student.batch);
    mapped.batchName = mapped.batch.name;
    mapped.batch_name = mapped.batch.batch_name;
  } else {
    const batId = student.batchId;
    if (batId) {
      mapped.batch = {
        id: batId,
        _id: batId,
        name: student.batchName || "",
        batch_name: student.batchName || "",
      };
      mapped.batchName = student.batchName || "";
      mapped.batch_name = student.batchName || "";
    }
  }

  if (student.branch && typeof student.branch === "object") {
    mapped.branch = {
      id: student.branch.id,
      _id: student.branch.id,
      name: student.branch.branchName,
      branch_name: student.branch.branchName,
      branch_code: student.branch.branchCode,
    };
  } else {
    const brId = student.branchId;
    if (brId) {
      mapped.branch = {
        id: brId,
        _id: brId,
        name: student.branchName || "",
        branch_name: student.branchName || "",
      };
    }
  }

  // Map comments if present
  if (student.comments) {
    mapped.comments = student.comments.map((c) => {
      const commenterData = c.commenter;
      const commenterMapped = commenterData ? {
        id: commenterData.id,
        _id: commenterData.id,
        full_name: commenterData.fullName,
        photo_url: commenterData.photoUrl,
        designation: commenterData.designation,
      } : null;
      return {
        id: c.id,
        _id: c.id,
        text: c.text,
        createdAt: c.createdAt,
        commenter: commenterMapped,
        instructor: commenterMapped,
      };
    });
  }

  return mapped;
};

/**
 * Map an array of students.
 */
export const mapStudents = (students) => (students || []).map(mapStudent);

/**
 * Map an API list response with pagination for students.
 */
export const mapStudentListResponse = (response) => {
  const data = response?.data || [];
  const pagination = response?.pagination || {};
  const mappedStudents = mapStudents(data);
  return {
    data: mappedStudents,
    students: mappedStudents,
    pagination: {
      page: pagination.page || 1,
      limit: pagination.limit || 30,
      total: pagination.total || 0,
      totalPages: pagination.totalPages || 0,
    },
  };
};
