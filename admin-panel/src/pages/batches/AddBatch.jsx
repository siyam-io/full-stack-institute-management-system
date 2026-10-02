import React, { useState, useMemo, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EntityForm from "../../components/common/EntityForm";
import { useCreateBatch, useUpdateBatch, useBatchById } from "../../hooks/useBatches";
import { useCourses } from "../../hooks/useCourses";
import { useBranches } from "../../hooks/useBranches"; 
import Swal from "sweetalert2";
import { getBatchFormSchema } from "../../validators/zodSchemas"; 
import useAuth from "../../store/useAuth"; 
import Loader from "../../components/Loader";

const AddBatch = () => {
  const { id, batchId } = useParams(); 
  const editId = id || batchId;
  const isEditMode = !!editId;
  
  const navigate = useNavigate();
  const { authUser, isMaster: checkMaster } = useAuth();
  const isMaster = typeof checkMaster === 'function' ? checkMaster() : false;

  const getCleanId = (val) => {
    if (!val) return "";
    if (typeof val === "string") return val;
    return val.id || val._id || "";
  };

  const [selectedBranch, setSelectedBranch] = useState(
    !isMaster ? getCleanId(authUser?.branch) : ""
  );

  const { data: batchData, isLoading: batchLoading } = useBatchById(editId);
  const { mutate: createBatch, isPending: isCreating } = useCreateBatch();
  const { mutate: updateBatch, isPending: isUpdating } = useUpdateBatch();
  const isPending = isCreating || isUpdating;

  // Data Extraction
  const { data: coursesRes, isLoading: coursesLoading } = useCourses();
  const courses = coursesRes?.data || []; 

  const { data: branches = [], isLoading: branchesLoading } = useBranches();

  useEffect(() => {
    if (isEditMode && batchData) {
      const bId = batchData.branch?.id || batchData.branch?._id || batchData.branch;
      if (bId) setSelectedBranch(bId);
    }
  }, [isEditMode, batchData]);

  const initialData = useMemo(() => {
    if (!isEditMode) return { schedule_days: [], status: "Active" }; 
    if (!batchData) return null;
    
    // Safe Date Parsing
    let safeStartDate = "";
    if (batchData.start_date) {
      const d = new Date(batchData.start_date);
      if (!isNaN(d.getTime())) safeStartDate = d.toISOString().split('T')[0];
    }

    return {
      batch_name: batchData.batch_name || "",
      batch_name_bn: batchData.batchNameBn || "",
      course: batchData.course?.id || batchData.course?._id || batchData.course || "",
      branch: batchData.branch?.id || batchData.branch?._id || batchData.branch || "",
      schedule_days: batchData.schedule_days || [],
      class_days_bn: batchData.classDaysBn || "",
      class_time_en: batchData.classTimeEn || batchData.class_time_en || "",
      class_time_bn: batchData.classTimeBn || batchData.class_time_bn || "",
      start_date: safeStartDate,
      status: batchData.status || "Active",
      capacity: batchData.capacity || "",
      duration_en: batchData.durationEn || "",
      duration_bn: batchData.durationBn || "",
      total_classes: batchData.totalClasses || "",
      badge_en: batchData.badgeEn || "",
      badge_bn: batchData.badgeBn || ""
    };
  }, [isEditMode, batchData]);

  const batchConfig = [
    { name: "batch_name", label: "Batch Title (English)", placeholder: "e.g. Morning Professional Intake", required: true },
    { name: "batch_name_bn", label: "Batch Title (Bangla)", placeholder: "e.g. সকালের ব্যাচ" },
    ...(isMaster ? [{
      name: "branch", label: "Campus / Location", type: "select", 
      options: branches.map(b => ({ value: b.id || b._id, label: b.branchName || b.branch_name || b.name || "Dhanmondi Campus" })), 
      required: true,
      defaultOption: "Select Campus",
      onChange: (e) => setSelectedBranch(e?.target ? e.target.value : e)
    }] : []),
    { 
      name: "course", label: "Associated Course", type: "select", 
      options: courses.map(c => ({ value: c.id || c._id, label: c.course_name })), 
      required: true, defaultOption: "Select Course" 
    },
    {
      name: "schedule_days", label: "Select Class Days", type: "checkbox-group",
      options: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(d => ({ value: d, label: d })),
      required: true,
    },
    { name: "class_days_bn", label: "Class Days (Bangla)", placeholder: "e.g. মঙ্গল-বুধ-বৃহস্পতি" },
    { name: "class_time_en", label: "Class Time (English)", placeholder: "e.g. 10:30 AM - 02:30 PM", required: true },
    { name: "class_time_bn", label: "Class Time (Bangla)", placeholder: "e.g. সকাল ১০:৩০ - দুপুর ২:৩০" },
    { name: "start_date", label: "Official Start Date", type: "date", required: true },
    { name: "status", label: "Status", type: "select", options: [{ value: "Upcoming", label: "Upcoming" }, { value: "Active", label: "Active" }, { value: "Completed", label: "Completed" }] },
    { name: "capacity", label: "Batch Capacity (Seats)", type: "number", placeholder: "e.g. 20" },
    { name: "duration_en", label: "Duration (English)", placeholder: "e.g. 3 Months" },
    { name: "duration_bn", label: "Duration (Bangla)", placeholder: "e.g. ৩ মাস" },
    { name: "total_classes", label: "Total Practical Classes", type: "number", placeholder: "e.g. 36" },
    { name: "badge_en", label: "Badge Label (English)", placeholder: "e.g. Limited Seats" },
    { name: "badge_bn", label: "Badge Label (Bangla)", placeholder: "e.g. সীমিত আসন" },
  ];

  const handleSubmit = (formData, jsonPayload) => {
    const finalBranch = !isMaster ? (authUser?.branch?._id || authUser?.branch) : jsonPayload.branch;
    
    if (!finalBranch) {
      return Swal.fire("Error", "Please select a valid campus/branch.", "error");
    }

    const payloadToValidate = { 
      ...jsonPayload, 
      branch: finalBranch
    };
    
    const validationResult = getBatchFormSchema(isEditMode ? "edit" : "add").safeParse(payloadToValidate);
    
    if (!validationResult.success) {
      const errorIssues = validationResult.error?.issues || validationResult.error?.errors || [];
      const firstError = errorIssues[0]?.message || "Please fill all required fields correctly.";
      return Swal.fire({ icon: "error", title: "Validation Failed", text: firstError });
    }

    const finalPayload = payloadToValidate;

    const mutationOptions = { 
      onSuccess: () => {
        Swal.fire("Success!", `Batch successfully ${isEditMode ? "updated" : "created"}.`, "success");
        navigate("/admin/manage-batches");
      },
      onError: (err) => {
        const errorMsg = err.response?.data?.message || err.message || "Failed to connect to server.";
        Swal.fire("Server Error", `Operation failed: ${errorMsg}`, "error");
      }
    };

    if (isEditMode) {
      updateBatch({ id: editId, ...finalPayload }, mutationOptions);
    } else {
      createBatch(finalPayload, mutationOptions);
    }
  };

  if (coursesLoading || branchesLoading || (isEditMode && batchLoading) || (isEditMode && !initialData)) {
    return <Loader />;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto animate-in fade-in duration-300">
      <EntityForm
        key={editId || "add"} 
        title={isEditMode ? "Update Batch" : "Initialize Batch"}
        subtitle={isEditMode ? `Editing configurations for ${initialData?.batch_name || 'Batch'}` : "Generate a custom schedule for a new intake."}
        config={batchConfig}
        initialData={initialData} 
        onSubmit={handleSubmit}
        isLoading={isPending}
        buttonText={isEditMode ? "Save Changes" : "Create Batch"}
        onCancel={() => navigate("/admin/manage-batches")}
        buttonColor="bg-slate-900 hover:bg-teal-600 shadow-xl"
      />
    </div>
  );
};

export default AddBatch;