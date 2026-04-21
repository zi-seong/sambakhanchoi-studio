import { useEffect, useRef, useState } from "react";
import { Pencil, Plus, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";
import {
  createStudentWork,
  deleteStudentWork,
  getStudentWorks,
  updateStudentWork,
  uploadGalleryImage,
} from "../../lib/contentRepository";
import type { StudentWork, StudentWorkInput } from "../../types/content";

const emptyForm: StudentWorkInput = {
  title: "",
  studentName: "",
  description: "",
  imageUrl: "",
  displayOrder: 1,
};

export function AdminStudentWorksPage() {
  const [items, setItems] = useState<StudentWork[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<StudentWorkInput>(emptyForm);
  const [preview, setPreview] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    void loadItems();
  }, []);

  const loadItems = async () => {
    setLoading(true);
    try {
      setItems(await getStudentWorks());
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "수강생 작품을 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setPreview("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadGalleryImage(file);
      setForm((prev) => ({ ...prev, imageUrl: url }));
      setPreview(url);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "이미지 업로드에 실패했습니다.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    try {
      if (editingId) {
        await updateStudentWork(editingId, form);
        toast.success("수강생 작품이 수정되었습니다.");
      } else {
        await createStudentWork(form);
        toast.success("수강생 작품이 등록되었습니다.");
      }
      resetForm();
      await loadItems();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "저장에 실패했습니다.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item: StudentWork) => {
    setEditingId(item.id);
    setForm({
      title: item.title,
      studentName: item.studentName,
      description: item.description,
      imageUrl: item.imageUrl,
      displayOrder: item.displayOrder,
    });
    setPreview(item.imageUrl);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteStudentWork(id);
      toast.success("수강생 작품이 삭제되었습니다.");
      if (editingId === id) resetForm();
      await loadItems();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "삭제에 실패했습니다.");
    }
  };

  return (
    <div className="space-y-8">
      <section className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs tracking-[0.25em] uppercase text-[#8b7355]">Admin</p>
          <h1 className="text-4xl font-['Noto_Serif_KR',serif]">수강생 작품 관리</h1>
        </div>
        <p className="max-w-xl text-sm leading-6 text-[#5c574f]">
          수강생들의 작품을 등록하고 관리합니다.
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
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="rounded-2xl border border-[#d8caba] bg-white px-4 py-3 outline-none transition focus:border-[#8b7355]"
                required
              />
            </label>

            <label className="flex flex-col gap-2 text-sm">
              수강생 이름
              <input
                value={form.studentName}
                onChange={(e) => setForm({ ...form, studentName: e.target.value })}
                className="rounded-2xl border border-[#d8caba] bg-white px-4 py-3 outline-none transition focus:border-[#8b7355]"
                required
              />
            </label>

            <div className="flex flex-col gap-2 text-sm">
              이미지
              <div
                className="relative flex cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl border border-dashed border-[#d8caba] bg-white transition hover:border-[#8b7355]"
                style={{ minHeight: "160px" }}
                onClick={() => fileInputRef.current?.click()}
              >
                {preview ? (
                  <img src={preview} alt="미리보기" className="h-full w-full object-cover" style={{ maxHeight: "240px" }} />
                ) : (
                  <>
                    <Upload className="h-6 w-6 text-[#8b7355]" />
                    <span className="text-[#8b7355]">{uploading ? "업로드 중..." : "클릭하여 이미지 선택"}</span>
                    <span className="text-xs text-[#a09080]">JPG, PNG, WebP, HEIC 지원</span>
                  </>
                )}
                {uploading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/70">
                    <span className="text-sm text-[#8b7355]">업로드 중...</span>
                  </div>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,.heic,.heif"
                className="hidden"
                onChange={(e) => void handleFileChange(e)}
              />
              {preview && (
                <button
                  type="button"
                  className="text-xs text-[#8b7355] hover:text-[#2d2a26]"
                  onClick={() => fileInputRef.current?.click()}
                >
                  이미지 변경
                </button>
              )}
            </div>

            <label className="flex flex-col gap-2 text-sm">
              설명 (선택)
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={3}
                className="rounded-2xl border border-[#d8caba] bg-white px-4 py-3 outline-none transition focus:border-[#8b7355]"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm">
              표시 순서
              <input
                type="number"
                min={1}
                value={form.displayOrder}
                onChange={(e) => setForm({ ...form, displayOrder: Number(e.target.value) || 1 })}
                className="rounded-2xl border border-[#d8caba] bg-white px-4 py-3 outline-none transition focus:border-[#8b7355]"
                required
              />
            </label>

            <button
              type="submit"
              disabled={saving || uploading || !form.imageUrl}
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-2xl bg-[#2d2a26] px-5 py-4 text-sm tracking-[0.2em] text-white transition hover:bg-[#8b7355] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Plus className="h-4 w-4" />
              {uploading ? "이미지 업로드 중..." : saving ? "저장 중..." : editingId ? "작품 수정" : "작품 등록"}
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
              목록을 불러오는 중입니다.
            </div>
          ) : (
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {items.map((item) => (
                <article key={item.id} className="overflow-hidden rounded-[1.5rem] border border-[#e4d7c9] bg-[#fcfaf7]">
                  <div className="aspect-[4/3] bg-[#e8ded1]">
                    <img src={item.imageUrl} alt={item.title} className="h-full w-full object-cover" />
                  </div>
                  <div className="space-y-3 p-5">
                    <div>
                      <p className="text-xs tracking-[0.2em] uppercase text-[#8b7355]">{item.studentName}</p>
                      <h3 className="mt-1 text-xl font-['Noto_Serif_KR',serif]">{item.title}</h3>
                    </div>
                    {item.description && (
                      <p className="text-sm leading-6 text-[#5c574f]">{item.description}</p>
                    )}
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
