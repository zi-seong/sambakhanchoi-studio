export type InquiryType =
  | "클래스 문의"
  | "작품 구매 문의"
  | "주문제작/답례품 문의"
  | "기타 문의";

export type InquiryStatus = "new" | "in_progress" | "done";

export type GalleryCategory = "식기" | "다기" | "오브제" | "소품" | "과정";

export interface GalleryItem {
  id: string;
  title: string;
  category: GalleryCategory;
  description: string;
  imageUrl: string;
  featured?: boolean;
  displayOrder: number;
  createdAt: string;
}

export interface Inquiry {
  id: string;
  name: string;
  contact: string;
  type: InquiryType;
  message: string;
  status: InquiryStatus;
  createdAt: string;
}

export interface InquiryInput {
  name: string;
  contact: string;
  type: InquiryType;
  message: string;
}

export interface GalleryItemInput {
  title: string;
  category: GalleryCategory;
  description: string;
  imageUrl: string;
  featured: boolean;
  displayOrder: number;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  isActive: boolean;
  createdAt: string;
}

export interface NoticeInput {
  title: string;
  content: string;
  isActive: boolean;
}

export interface StudentWork {
  id: string;
  title: string;
  studentName: string;
  description: string;
  imageUrl: string;
  displayOrder: number;
  createdAt: string;
}

export interface StudentWorkInput {
  title: string;
  studentName: string;
  description: string;
  imageUrl: string;
  displayOrder: number;
}
