import { seedGalleryItems, seedInquiries } from "./contentSeed";
import { isSupabaseConfigured, supabase } from "./supabase";
import type {
  GalleryItem,
  GalleryItemInput,
  Inquiry,
  InquiryInput,
  InquiryStatus,
} from "../types/content";

const GALLERY_STORAGE_KEY = "sambakhanchoi.gallery_items";
const INQUIRY_STORAGE_KEY = "sambakhanchoi.inquiries";

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
