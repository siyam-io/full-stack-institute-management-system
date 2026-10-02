export const PERMISSIONS = {
  // 📊 Dashboard Permissions
  VIEW_ADMIN_DASHBOARD: "view_admin_dashboard",
  VIEW_BRANCH_DASHBOARD: "view_branch_dashboard",

  // 🎓 Student Page Permissions
  VIEW_STUDENTS: "view_students",
  ADD_STUDENT: "add_student", 
  STUDENT_PAYMENTS: "student_payments",
  STUDENT_PROFILE: "student_profile",
  STUDENT_COMMENT: "student_comment",
  STUDENT_EDIT: "student_edit",
  STUDENT_ACTIVE_CONTROL: "student_active_control",
  STUDENT_QRCODE: "student_qrcode",
  STUDENT_CERTIFICATE: "student_certificate",
  STUDENT_DELETE: "student_delete",

  // 💼 Employee Page Permissions
  VIEW_EMPLOYEES: "view_employees",
  ADD_EMPLOYEE: "add_employee",
  EMPLOYEE_ROLE_CONTROL: "employee_role_control",
  EMPLOYEE_IDCARD: "employee_idcard",
  EMPLOYEE_QRCODE: "employee_qrcode",
  EMPLOYEE_ACTIVE_STATUS: "employee_active_status",
  EMPLOYEE_EDIT: "employee_edit",
  EMPLOYEE_DELETE: "employee_delete",

  // 📚 Course Page Permissions
  VIEW_COURSES: "view_courses",
  COURSE_ACTIVE: "course_active",
  COURSE_EDIT: "course_edit",
  COURSE_DELETE: "course_delete",
  COURSE_PUBLISH: "course_publish",



  // 🏢 Branch Permissions
  VIEW_BRANCHES: "view_branches",
  BRANCH_ACTIVE_STATUS: "branch_active_status",
  BRANCH_EDIT: "branch_edit",
  BRANCH_DELETE: "branch_delete",

  // 📅 All Batch Page Permissions
  VIEW_ALL_BATCHES: "view_all_batches",
  ADD_BATCH: "add_batch", // 🆕 Added
  BATCH_EDIT: "batch_edit",
  BATCH_DELETE: "batch_delete",

  // 🛠️ Manage Batch (Workspace) Permissions
  VIEW_BATCH_WORKSPACE: "view_batch_workspace",
  VIEW_BATCH_CALENDAR: "view_batch_calendar",
  CURRICULUM_MATRIX: "curriculum_matrix",



  VIEW_MY_PROFILE: "view_my_profile",
  UPDATE_MY_PROFILE: "update_my_profile",

  // ⚙️ System Settings Permissions
  VIEW_SETTINGS: "view_settings",
  MANAGE_ROLES: "manage_roles",
  MANAGE_SETTINGS: "manage_settings",

  // 📝 Blog Permissions
  BLOG_VIEW: "blog_view",
  BLOG_CREATE: "blog_create",
  BLOG_EDIT: "blog_edit",
  BLOG_DELETE: "blog_delete",
  BLOG_PUBLISH: "blog_publish",

  // 📄 CMS Section Permissions
  CMS_VIEW: "cms_view",
  CMS_EDIT: "cms_edit",

  // 💬 Testimonial Permissions
  TESTIMONIAL_VIEW: "testimonial_view",
  TESTIMONIAL_EDIT: "testimonial_edit",

  // 👥 Team Permissions
  TEAM_VIEW: "team_view",
  TEAM_EDIT: "team_edit",
};

// ==========================================
// 2. THE GRANULAR MATRIX (FOR UI RENDERING)
// ==========================================
export const PERMISSION_MATRIX = [
  {
    moduleName: "Dashboards",
    page: "Dashboard Selection",
    features: [
      {
        label: "View Admin Dashboard (Global)",
        value: PERMISSIONS.VIEW_ADMIN_DASHBOARD,
      },
      {
        label: "View Branch Dashboard (Local)",
        value: PERMISSIONS.VIEW_BRANCH_DASHBOARD,
      },
    ],
  },
  {
    moduleName: "Students",
    page: "All Student Page",
    features: [
      { label: "View All Students Page", value: PERMISSIONS.VIEW_STUDENTS },
      { label: "Add New Student", value: PERMISSIONS.ADD_STUDENT }, // 🆕 Added
      { label: "Manage Payments", value: PERMISSIONS.STUDENT_PAYMENTS },
      { label: "View Profile", value: PERMISSIONS.STUDENT_PROFILE },
      { label: "Comments/Feedback", value: PERMISSIONS.STUDENT_COMMENT },
      { label: "Edit Student Info", value: PERMISSIONS.STUDENT_EDIT },
      { label: "Active Control", value: PERMISSIONS.STUDENT_ACTIVE_CONTROL },
      { label: "Generate QR Code", value: PERMISSIONS.STUDENT_QRCODE },
      { label: "Issue Certificate", value: PERMISSIONS.STUDENT_CERTIFICATE },
      { label: "Delete Student", value: PERMISSIONS.STUDENT_DELETE },
    ],
  },
  {
    moduleName: "Staff & HR",
    page: "All Employee Page",
    features: [
      { label: "View All Employees Page", value: PERMISSIONS.VIEW_EMPLOYEES },
      { label: "Add New Employee", value: PERMISSIONS.ADD_EMPLOYEE }, // 🆕 Added
      {
        label: "Role & Access Control",
        value: PERMISSIONS.EMPLOYEE_ROLE_CONTROL,
      },
      { label: "Generate ID Card", value: PERMISSIONS.EMPLOYEE_IDCARD },
      { label: "Generate QR Code", value: PERMISSIONS.EMPLOYEE_QRCODE },
      {
        label: "Active Status Toggle",
        value: PERMISSIONS.EMPLOYEE_ACTIVE_STATUS,
      },
      { label: "Edit Employee", value: PERMISSIONS.EMPLOYEE_EDIT },
      { label: "Delete Employee", value: PERMISSIONS.EMPLOYEE_DELETE },
    ],
  },
  {
    moduleName: "Academic Courses",
    page: "All Courses Page",
    features: [
      { label: "View Courses Page", value: PERMISSIONS.VIEW_COURSES },
      { label: "Active/Inactive Status", value: PERMISSIONS.COURSE_ACTIVE },
      { label: "Edit Course", value: PERMISSIONS.COURSE_EDIT },
      { label: "Delete Course", value: PERMISSIONS.COURSE_DELETE },
      { label: "Publish/Manage Public Page", value: PERMISSIONS.COURSE_PUBLISH },
    ],
  },

  {
    moduleName: "Organization",
    page: "All Branch Page",
    features: [
      { label: "View All Branches Page", value: PERMISSIONS.VIEW_BRANCHES },
      {
        label: "Toggle Branch Status",
        value: PERMISSIONS.BRANCH_ACTIVE_STATUS,
      },
      { label: "Edit Branch", value: PERMISSIONS.BRANCH_EDIT },
      { label: "Delete Branch", value: PERMISSIONS.BRANCH_DELETE },
    ],
  },
  {
    moduleName: "Batch Management",
    page: "All Batches List",
    features: [
      { label: "View All Batches Page", value: PERMISSIONS.VIEW_ALL_BATCHES },
      { label: "Create New Batch", value: PERMISSIONS.ADD_BATCH }, // 🆕 Added
      { label: "Edit Batch Info", value: PERMISSIONS.BATCH_EDIT },
      { label: "Delete Batch", value: PERMISSIONS.BATCH_DELETE },
    ],
  },
  {
    moduleName: "Class Operations",
    page: "Manage Batch Workspace",
    features: [
      {
        label: "View Batch Workspace Page",
        value: PERMISSIONS.VIEW_BATCH_WORKSPACE,
      },
      { label: "View Class Calendar", value: PERMISSIONS.VIEW_BATCH_CALENDAR },
      {
        label: "Access Curriculum Matrix",
        value: PERMISSIONS.CURRICULUM_MATRIX,
      },
    ],
  },


  {
    moduleName: "Personal Account",
    page: "Profile Settings",
    features: [
      { label: "Access Profile Page", value: PERMISSIONS.VIEW_MY_PROFILE },
      {
        label: "Update Own Profile & Photo",
        value: PERMISSIONS.UPDATE_MY_PROFILE,
      },
    ],
  },

  {
    moduleName: "Blog Management",
    page: "Blogs List & Form",
    features: [
      { label: "View Blogs", value: PERMISSIONS.BLOG_VIEW },
      { label: "Create Blog", value: PERMISSIONS.BLOG_CREATE },
      { label: "Edit Blog", value: PERMISSIONS.BLOG_EDIT },
      { label: "Publish Blog", value: PERMISSIONS.BLOG_PUBLISH },
      { label: "Delete Blog", value: PERMISSIONS.BLOG_DELETE },
    ],
  },

  {
    moduleName: "CMS Main Page Editor",
    page: "Main Page Edit",
    features: [
      { label: "View CMS Sections", value: PERMISSIONS.CMS_VIEW },
      { label: "Edit CMS Sections", value: PERMISSIONS.CMS_EDIT },
    ],
  },

  {
    moduleName: "Testimonials",
    page: "Student Testimonials",
    features: [
      { label: "View Testimonials", value: PERMISSIONS.TESTIMONIAL_VIEW },
      { label: "Edit Testimonials", value: PERMISSIONS.TESTIMONIAL_EDIT },
    ],
  },

  {
    moduleName: "Strategic Team",
    page: "Team Members",
    features: [
      { label: "View Team", value: PERMISSIONS.TEAM_VIEW },
      { label: "Edit Team", value: PERMISSIONS.TEAM_EDIT },
    ],
  },

  {
    moduleName: "System Settings",
    page: "Admin Controls",
    features: [
      { label: "View Settings Page", value: PERMISSIONS.VIEW_SETTINGS },
      { label: "Manage Roles & Permissions", value: PERMISSIONS.MANAGE_ROLES },
      { label: "System Configuration", value: PERMISSIONS.MANAGE_SETTINGS },
    ],
  },
];
