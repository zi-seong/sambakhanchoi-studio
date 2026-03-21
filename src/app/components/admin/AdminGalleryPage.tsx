import { useEffect, useState } from "react";
import { Pencil, Plus, Star, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  createGalleryItem,
  deleteGalleryItem,
  getGalleryItems,
  updateGalleryItem,
} from "../../lib/contentRepository";
import type { GalleryCategory, GalleryItem, GalleryItemInput } from "../../types/content";

const categories: GalleryCategory[] = ["식기", "다기", "오브제", "소품", "과정"];

const emptyForm: GalleryItemInput = {
  title: "",
  category: "식기",
  description: "",
  imageUrl: "",
  featured: false,
  displayOrder: 1,
};

export function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<GalleryItemInput>(emptyForm);

  useEffect(() => {
    void loadItems();
  }, []);

  const loadItems = async () => {
    setLoading(true);
    try {
      setItems(await getGalleryItems());
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "갤러리 데이터를 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);

    try {
      if (editingId) {
        await updateGalleryItem(editingId, form);
        toast.success("작품 정보가 수정되었습니다.");
      } else {
        await createGalleryItem(form);
        toast.success("새 작품이 등록되었습니다.");
      }

      resetForm();
      await loadItems();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "작품 저장에 실패했습니다.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item: GalleryItem) => {
    setEditingId(item.id);
    setForm({
      title: item.title,
      category: item.category,
      description: item.description,
      imageUrl: item.imageUrl,
      featured: item.featured ?? false,
      displayOrder: item.displayOrder,
    });
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteGalleryItem(id);
      toast.success("작품이 삭제되었습니다.");
      if (editingId === id) {
        resetForm();
      }
      await loadItems();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "작품 삭제에 실패했습니다.");
    }
  };

  return (
    <div className="space-y-8">
      <section className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs tracking-[0.25em] uppercase text-[#8b7355]">Admin</p>
          <h1 className="text-4xl font-['Noto_Serif_KR',serif]">갤러리 관리</h1>
        </div>
        <p className="max-w-xl text-sm leading-6 text-[#5c574f]">
          공개 갤러리에 노출될 작품을 등록하고 대표작 여부와 노출 순서를 정리합니다.
        </p>
      </section>

      <section className="grid gap-6 xl:grid-cols-[420px_1fr]">
        <form onSubmit={handleSubmit} className="rounded-[2rem] bg-[#f9f5ef] p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-['Noto_Serif_KR',serif]">
              {editingId ? "작품 수정" : "새 작품 등록"}
            </h2>
            {editingId ? (
              <button type="button" onClick={resetForm} className="text-sm text-[#5c574f] hover:text-[#2d2a26]">
                새로 작성
              </button>
            ) : null}
          </div>

          <div className="mt-6 flex flex-col gap-4">
            <label className="flex flex-col gap-2 text-sm">
              작품명
              <input
                value={form.title}
                onChange={(event) => setForm({ ...form, title: event.target.value })}
                className="rounded-2xl border border-[#d8caba] bg-white px-4 py-3 outline-none transition focus:border-[#8b7355]"
                required
              />
            </label>

            <label className="flex flex-col gap-2 text-sm">
              카테고리
              <select
                value={form.category}
                onChange={(event) =>
                  setForm({ ...form, category: event.target.value as GalleryCategory })
                }
                className="rounded-2xl border border-[#d8caba] bg-white px-4 py-3 outline-none transition focus:border-[#8b7355]"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-2 text-sm">
              이미지 URL
              <input
                value={form.imageUrl}
                onChange={(event) => setForm({ ...form, imageUrl: event.target.value })}
                className="rounded-2xl border border-[#d8caba] bg-white px-4 py-3 outline-none transition focus:border-[#8b7355]"
                placeholder="https://..."
                required
              />
            </label>

            <label className="flex flex-col gap-2 text-sm">
              설명
              <textarea
                value={form.description}
                onChange={(event) => setForm({ ...form, description: event.target.value })}
                rows={4}
                className="rounded-2xl border border-[#d8caba] bg-white px-4 py-3 outline-none transition focus:border-[#8b7355]"
                required
              />
            </label>

            <label className="flex flex-col gap-2 text-sm">
              표시 순서
              <input
                type="number"
                min={1}
                value={form.displayOrder}
                onChange={(event) =>
                  setForm({ ...form, displayOrder: Number(event.target.value) || 1 })
                }
                className="rounded-2xl border border-[#d8caba] bg-white px-4 py-3 outline-none transition focus:border-[#8b7355]"
                required
              />
            </label>

            <label className="mt-1 inline-flex items-center gap-3 text-sm">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(event) => setForm({ ...form, featured: event.target.checked })}
                className="h-4 w-4 accent-[#2d2a26]"
              />
              메인 대표작 섹션에도 노출
            </label>

            <button
              type="submit"
              disabled={saving}
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-2xl bg-[#2d2a26] px-5 py-4 text-sm tracking-[0.2em] text-white transition hover:bg-[#8b7355] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Plus className="h-4 w-4" />
              {saving ? "저장 중..." : editingId ? "작품 수정" : "작품 등록"}
            </button>
          </div>
        </form>

        <section className="rounded-[2rem] bg-white/70 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-['Noto_Serif_KR',serif]">등록된 작품</h2>
            <span className="text-sm text-[#5c574f]">{items.length}개</span>
          </div>

          {loading ? (
            <div className="mt-6 rounded-2xl border border-dashed border-[#d8caba] px-6 py-10 text-center text-sm text-[#5c574f]">
              작품 목록을 불러오는 중입니다.
            </div>
          ) : (
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {items.map((item) => (
                <article key={item.id} className="overflow-hidden rounded-[1.5rem] border border-[#e4d7c9] bg-[#fcfaf7]">
                  <div className="aspect-[4/3] bg-[#e8ded1]">
                    <img src={item.imageUrl} alt={item.title} className="h-full w-full object-cover" />
                  </div>
                  <div className="space-y-4 p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs tracking-[0.2em] uppercase text-[#8b7355]">{item.category}</p>
                        <h3 className="mt-2 text-xl font-['Noto_Serif_KR',serif]">{item.title}</h3>
                      </div>
                      {item.featured ? <Star className="h-4 w-4 fill-[#8b7355] text-[#8b7355]" /> : null}
                    </div>
                    <p className="text-sm leading-6 text-[#5c574f]">{item.description}</p>
                    <div className="flex items-center justify-between text-sm text-[#8b7355]">
                      <span>표시 순서 {item.displayOrder}</span>
                      <div className="flex gap-4">
                        <button type="button" onClick={() => handleEdit(item)} className="inline-flex items-center gap-1 hover:text-[#2d2a26]">
                          <Pencil className="h-4 w-4" />
                          수정
                        </button>
                        <button type="button" onClick={() => void handleDelete(item.id)} className="inline-flex items-center gap-1 hover:text-[#2d2a26]">
                          <Trash2 className="h-4 w-4" />
                          삭제
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </section>
    </div>
  );
}
