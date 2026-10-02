export const COURSE_CONFIG = {
  batchStartDate: '',
  batchEndDate: '',
  feeTotal: 44000,
  feeAdmission: 16000,
  feeInstallment1: 14000,
  feeInstallment2: 14000,
  courseName: 'Professional Chef Course',
  courseId: 'CHEF-001',
  demoClassAvailable: true,
  intakeName: 'Admission Open',
  enrollmentOpen: true
};

export const BATCH_CONFIG = {
  slots: [
    { id: 'morning', label: 'Morning Batch', labelBn: 'সকালের ব্যাচ', status: 'enrolling', badge: 'Limited Seats', badgeBn: 'সীমিত আসন' },
    { id: 'afternoon', label: 'Afternoon Batch', labelBn: 'বিকালের ব্যাচ', status: 'enrolling', badge: 'Limited Seats', badgeBn: 'সীমিত আসন' },
    { id: 'weekend', label: 'Weekend Batch', labelBn: 'উইকএন্ড ব্যাচ', status: 'enrolling', badge: 'Limited Seats', badgeBn: 'সীমিত আসন' },
  ],
  statusOptions: {
    enrolling: { label: 'Enrolling', labelBn: 'ভর্তি চলছে', color: 'text-green-400' },
    full: { label: 'Full', labelBn: 'পূর্ণ', color: 'text-red-400' },
    upcoming: { label: 'Upcoming', labelBn: 'আসন্ন', color: 'text-yellow-400' },
  }
};
