import heic2any from "heic2any";
import { seedGalleryItems, seedInquiries } from "./contentSeed";
import { isSupabaseConfigured, supabase } from "./supabase";
import type {
  GalleryItem,
  GalleryItemInput,
  Inquiry,
  InquiryInput,
  InquiryStatus,
  Notice,
  NoticeInput,
  StudentWork,
  StudentWorkInput,
} from "../types/content";

const GALLERY_STORAGE_KEY = "sambakhanchoi.gallery_items";
const STUDENT_WORKS_STORAGE_KEY = "sambakhanchoi.student_works";
const INQUIRY_STORAGE_KEY = "sambakhanchoi.inquiries";
const SITE_TEXTS_STORAGE_KEY = "sambakhanchoi.site_texts";
const SITE_IMAGES_STORAGE_KEY = "sambakhanchoi.site_images";

function ensureBrowser() {
  if (typeof window === "undefined") {
    throw new Error("브라우저 환경에서만 사용할 수 있습니다.");
  }
}

function readLocalStorage<T>(key: string, fallback: T): T {
  ensureBrowser();
  const raw = window.localStorage.getItem(key);
  if (!raw) {
    window.localStorage.setItem(key, JSON.stringify(fallback));
    return fallback;
  }

  try {
    return JSON.parse(raw) as T;
  } catch {
    window.localStorage.setItem(key, JSON.stringify(fallback));
    return fallback;
  }
}

function writeLocalStorage<T>(key: string, value: T) {
  ensureBrowser();
  window.localStorage.setItem(key, JSON.stringify(value));
}

function normalizeGalleryRow(row: {
  id: string;
  title: string;
  category: GalleryItem["category"];
  description: string;
  image_url: string;
  featured: boolean | null;
  display_order: number | null;
  created_at: string | null;
}): GalleryItem {
  return {
    id: row.id,
    title: row.title,
    category: row.category,
    description: row.description,
    imageUrl: row.image_url,
    featured: row.featured ?? false,
    displayOrder: row.display_order ?? 0,
    createdAt: row.created_at ?? new Date().toISOString(),
  };
}

function normalizeInquiryRow(row: {
  id: string;
  name: string;
  contact: string;
  type: Inquiry["type"];
  message: string;
  status: InquiryStatus | null;
  created_at: string | null;
}): Inquiry {
  return {
    id: row.id,
    name: row.name,
    contact: row.contact,
    type: row.type,
    message: row.message,
    status: row.status ?? "new",
    createdAt: row.created_at ?? new Date().toISOString(),
  };
}

export async function getGalleryItems() {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from("gallery_items")
      .select("id, title, category, description, image_url, featured, display_order, created_at")
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    return (data ?? []).map(normalizeGalleryRow);
  }

  const items = readLocalStorage(GALLERY_STORAGE_KEY, seedGalleryItems);
  return [...items].sort((a, b) => a.displayOrder - b.displayOrder);
}

export async function createGalleryItem(input: GalleryItemInput) {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from("gallery_items")
      .insert({
        title: input.title,
        category: input.category,
        description: input.description,
        image_url: input.imageUrl,
        featured: input.featured,
        display_order: input.displayOrder,
      })
      .select("id, title, category, description, image_url, featured, display_order, created_at")
      .single();

    if (error) {
      throw error;
    }

    return normalizeGalleryRow(data);
  }

  const items = readLocalStorage(GALLERY_STORAGE_KEY, seedGalleryItems);
  const nextItem: GalleryItem = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...input,
  };
  const nextItems = [...items, nextItem];
  writeLocalStorage(GALLERY_STORAGE_KEY, nextItems);
  return nextItem;
}

export async function updateGalleryItem(id: string, input: GalleryItemInput) {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from("gallery_items")
      .update({
        title: input.title,
        category: input.category,
        description: input.description,
        image_url: input.imageUrl,
        featured: input.featured,
        display_order: input.displayOrder,
      })
      .eq("id", id)
      .select("id, title, category, description, image_url, featured, display_order, created_at")
      .single();

    if (error) {
      throw error;
    }

    return normalizeGalleryRow(data);
  }

  const items = readLocalStorage(GALLERY_STORAGE_KEY, seedGalleryItems);
  const nextItems = items.map((item) =>
    item.id === id ? { ...item, ...input } : item,
  );
  writeLocalStorage(GALLERY_STORAGE_KEY, nextItems);
}

export async function deleteGalleryItem(id: string) {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase.from("gallery_items").delete().eq("id", id);
    if (error) {
      throw error;
    }
    return;
  }

  const items = readLocalStorage(GALLERY_STORAGE_KEY, seedGalleryItems);
  writeLocalStorage(
    GALLERY_STORAGE_KEY,
    items.filter((item) => item.id !== id),
  );
}

export async function getInquiries() {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from("inquiries")
      .select("id, name, contact, type, message, status, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    return (data ?? []).map(normalizeInquiryRow);
  }

  const inquiries = readLocalStorage(INQUIRY_STORAGE_KEY, seedInquiries);
  return [...inquiries].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function createInquiry(input: InquiryInput) {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from("inquiries")
      .insert({
        name: input.name,
        contact: input.contact,
        type: input.type,
        message: input.message,
        status: "new",
      })
      .select("id, name, contact, type, message, status, created_at")
      .single();

    if (error) {
      throw error;
    }

    return normalizeInquiryRow(data);
  }

  const inquiries = readLocalStorage(INQUIRY_STORAGE_KEY, seedInquiries);
  const nextInquiry: Inquiry = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    status: "new",
    ...input,
  };
  const nextInquiries = [nextInquiry, ...inquiries];
  writeLocalStorage(INQUIRY_STORAGE_KEY, nextInquiries);
  return nextInquiry;
}

export async function getSiteTexts(): Promise<Record<string, string>> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("site_texts")
        .select("key, value");
      if (error) throw error;
      return Object.fromEntries((data ?? []).map((row) => [row.key, row.value]));
    } catch {
      // 테이블이 없을 수 있으므로 localStorage로 fallback
    }
  }
  return readLocalStorage<Record<string, string>>(SITE_TEXTS_STORAGE_KEY, {});
}

export async function getSiteImages(): Promise<Record<string, string>> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("site_images")
        .select("key, url");
      if (error) throw error;
      return Object.fromEntries((data ?? []).map((row) => [row.key, row.url]));
    } catch {
      // 테이블이 없을 수 있으므로 localStorage로 fallback
    }
  }
  return readLocalStorage<Record<string, string>>(SITE_IMAGES_STORAGE_KEY, {});
}

async function convertIfHeic(file: File): Promise<File> {
  const isHeic = file.type === "image/heic" || file.type === "image/heif" || file.name.toLowerCase().endsWith(".heic") || file.name.toLowerCase().endsWith(".heif");
  if (!isHeic) return file;

  const converted = await heic2any({ blob: file, toType: "image/jpeg", quality: 0.9 });
  const blob = Array.isArray(converted) ? converted[0] : converted;
  const newName = file.name.replace(/\.(heic|heif)$/i, ".jpg");
  return new File([blob], newName, { type: "image/jpeg" });
}

async function compressImage(file: File, maxPx = 1200, quality = 0.85): Promise<File> {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      const { naturalWidth: w, naturalHeight: h } = img;
      const scale = Math.min(1, maxPx / Math.max(w, h));
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(w * scale);
      canvas.height = Math.round(h * scale);
      canvas.getContext("2d")!.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(
        (blob) => {
          if (!blob) { resolve(file); return; }
          const name = file.name.replace(/\.[^.]+$/, ".jpg");
          resolve(new File([blob], name, { type: "image/jpeg" }));
        },
        "image/jpeg",
        quality,
      );
    };
    img.onerror = () => { URL.revokeObjectURL(url); resolve(file); };
    img.src = url;
  });
}

export async function uploadGalleryImage(file: File): Promise<string> {
  const convertedFile = await compressImage(await convertIfHeic(file));
  const ext = convertedFile.name.split(".").pop() ?? "jpg";
  const key = `gallery/${crypto.randomUUID()}.${ext}`;

  if (isSupabaseConfigured && supabase) {
    const { error: uploadError } = await supabase.storage
      .from("site-images")
      .upload(key, convertedFile, { upsert: false, contentType: convertedFile.type });

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from("site-images").getPublicUrl(key);
    return data.publicUrl;
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(convertedFile);
  });
}

export async function uploadSiteImage(key: string, file: File): Promise<string> {
  const convertedFile = await compressImage(await convertIfHeic(file));
  const uploadKey = key.replace(/\.(heic|heif)$/i, ".jpg");

  if (isSupabaseConfigured && supabase) {
    const { error: uploadError } = await supabase.storage
      .from("site-images")
      .upload(uploadKey, convertedFile, { upsert: true, contentType: convertedFile.type });

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from("site-images").getPublicUrl(uploadKey);
    const url = `${data.publicUrl}?t=${Date.now()}`;

    const { error: dbError } = await supabase
      .from("site_images")
      .upsert({ key, url, updated_at: new Date().toISOString() });

    if (dbError) throw dbError;
    return url;
  }

  // localStorage fallback: data URL로 저장
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const url = reader.result as string;
      const images = readLocalStorage<Record<string, string>>(SITE_IMAGES_STORAGE_KEY, {});
      images[key] = url;
      writeLocalStorage(SITE_IMAGES_STORAGE_KEY, images);
      resolve(url);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function normalizeNoticeRow(row: {
  id: string;
  title: string;
  content: string;
  is_active: boolean | null;
  created_at: string | null;
}): Notice {
  return {
    id: row.id,
    title: row.title,
    content: row.content,
    isActive: row.is_active ?? true,
    createdAt: row.created_at ?? new Date().toISOString(),
  };
}

export async function getNotices(): Promise<Notice[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from("notices")
      .select("id, title, content, is_active, created_at")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data ?? []).map(normalizeNoticeRow);
  }
  return [];
}

export async function createNotice(input: NoticeInput): Promise<Notice> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from("notices")
      .insert({ title: input.title, content: input.content, is_active: input.isActive })
      .select("id, title, content, is_active, created_at")
      .single();
    if (error) throw error;
    return normalizeNoticeRow(data);
  }
  throw new Error("Supabase가 연결되지 않았습니다.");
}

export async function updateNotice(id: string, input: NoticeInput): Promise<void> {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase
      .from("notices")
      .update({ title: input.title, content: input.content, is_active: input.isActive })
      .eq("id", id);
    if (error) throw error;
    return;
  }
  throw new Error("Supabase가 연결되지 않았습니다.");
}

export async function deleteNotice(id: string): Promise<void> {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase.from("notices").delete().eq("id", id);
    if (error) throw error;
    return;
  }
  throw new Error("Supabase가 연결되지 않았습니다.");
}

export async function updateSiteText(key: string, value: string): Promise<void> {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase
      .from("site_texts")
      .upsert({ key, value, updated_at: new Date().toISOString() });
    if (error) throw error;
    return;
  }
  const texts = readLocalStorage<Record<string, string>>(SITE_TEXTS_STORAGE_KEY, {});
  texts[key] = value;
  writeLocalStorage(SITE_TEXTS_STORAGE_KEY, texts);
}

function normalizeStudentWorkRow(row: {
  id: string;
  title: string;
  student_name: string;
  description: string;
  image_url: string;
  display_order: number | null;
  created_at: string | null;
}): StudentWork {
  return {
    id: row.id,
    title: row.title,
    studentName: row.student_name,
    description: row.description,
    imageUrl: row.image_url,
    displayOrder: row.display_order ?? 0,
    createdAt: row.created_at ?? new Date().toISOString(),
  };
}

export async function getStudentWorks(): Promise<StudentWork[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from("student_works")
      .select("id, title, student_name, description, image_url, display_order, created_at")
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data ?? []).map(normalizeStudentWorkRow);
  }
  const items = readLocalStorage<StudentWork[]>(STUDENT_WORKS_STORAGE_KEY, []);
  return [...items].sort((a, b) => a.displayOrder - b.displayOrder);
}

export async function createStudentWork(input: StudentWorkInput): Promise<StudentWork> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from("student_works")
      .insert({
        title: input.title,
        student_name: input.studentName,
        description: input.description,
        image_url: input.imageUrl,
        display_order: input.displayOrder,
      })
      .select("id, title, student_name, description, image_url, display_order, created_at")
      .single();
    if (error) throw error;
    return normalizeStudentWorkRow(data);
  }
  const items = readLocalStorage<StudentWork[]>(STUDENT_WORKS_STORAGE_KEY, []);
  const next: StudentWork = { id: crypto.randomUUID(), createdAt: new Date().toISOString(), ...input };
  writeLocalStorage(STUDENT_WORKS_STORAGE_KEY, [...items, next]);
  return next;
}

export async function updateStudentWork(id: string, input: StudentWorkInput): Promise<StudentWork> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from("student_works")
      .update({
        title: input.title,
        student_name: input.studentName,
        description: input.description,
        image_url: input.imageUrl,
        display_order: input.displayOrder,
      })
      .eq("id", id)
      .select("id, title, student_name, description, image_url, display_order, created_at")
      .single();
    if (error) throw error;
    return normalizeStudentWorkRow(data);
  }
  const items = readLocalStorage<StudentWork[]>(STUDENT_WORKS_STORAGE_KEY, []);
  const updated = items.find((i) => i.id === id);
  if (!updated) throw new Error("항목을 찾을 수 없습니다.");
  const next = { ...updated, ...input };
  writeLocalStorage(STUDENT_WORKS_STORAGE_KEY, items.map((i) => (i.id === id ? next : i)));
  return next;
}

export async function deleteStudentWork(id: string): Promise<void> {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase.from("student_works").delete().eq("id", id);
    if (error) throw error;
    return;
  }
  const items = readLocalStorage<StudentWork[]>(STUDENT_WORKS_STORAGE_KEY, []);
  writeLocalStorage(STUDENT_WORKS_STORAGE_KEY, items.filter((i) => i.id !== id));
}

export async function updateInquiryStatus(id: string, status: InquiryStatus) {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase
      .from("inquiries")
      .update({ status })
      .eq("id", id);

    if (error) {
      throw error;
    }

    return;
  }

  const inquiries = readLocalStorage(INQUIRY_STORAGE_KEY, seedInquiries);
  const nextInquiries = inquiries.map((inquiry) =>
    inquiry.id === id ? { ...inquiry, status } : inquiry,
  );
  writeLocalStorage(INQUIRY_STORAGE_KEY, nextInquiries);
}
