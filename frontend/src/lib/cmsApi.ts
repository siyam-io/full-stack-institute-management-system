import backendFetch from "./backendApi";

// ─── Section API ───

export interface CmsSectionData {
  id: string;
  sectionId: string;
  sectionKey: string;
  pageKey: string;
  sectionTitle: string;
  locale: string;
  data: Record<string, any>;
  seoTitle: string | null;
  seoDescription: string | null;
  status: string;
  publishedAt: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export async function getCmsSection(sectionKey: string, locale: string): Promise<CmsSectionData | null> {
  const res = await backendFetch<any>(`/public/cms/${sectionKey}`, { locale });
  return res && res.success ? res.data : null;
}

// ─── Testimonial API ───

export interface TestimonialData {
  id: string;
  locale: string;
  studentName: string;
  designation: string | null;
  message: string;
  imageUrl: string | null;
  videoUrl: string | null;
  rating: number | null;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export async function getPublicTestimonials(locale: string): Promise<TestimonialData[] | null> {
  const res = await backendFetch<any>("/public/testimonials", { locale });
  return res && res.success ? res.data : null;
}

// ─── Team Member API ───

export interface TeamMemberData {
  id: string;
  locale: string;
  name: string;
  designation: string;
  bio: string | null;
  imageUrl: string | null;
  facebook: string | null;
  linkedin: string | null;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export async function getPublicTeamMembers(locale: string): Promise<TeamMemberData[] | null> {
  const res = await backendFetch<any>("/public/strategic-team", { locale });
  return res && res.success ? res.data : null;
}
