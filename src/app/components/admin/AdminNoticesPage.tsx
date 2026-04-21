import { useEffect, useState } from "react";
import { BellRing, Plus, Trash2, Pencil, X, Check } from "lucide-react";
import { toast } from "sonner";
import { getNotices, createNotice, updateNotice, deleteNotice } from "../../lib/contentRepository";
import type { Notice, NoticeInput } from "../../types/content";

const emptyForm: NoticeInput = { title: "", content: "", isActive: true };

export function AdminNoticesPage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<NoticeInput>(emptyForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    void load();
  }, []);

  const load = async () => {
    setLoading(true);
    try {
      setNotices(await getNotices());
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "공지 목록을 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (notice: Notice) => {
    setEditingId(notice.id);
    setForm({ title: notice.title, content: notice.content, isActive: notice.isActive });
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.content.trim()) {
      toast.error("제목과 내용을 모두 입력해주세요.");
      return;
    }
    setSaving(true);
    try {
      if (editingId) {
        await updateNotice(editingId, form);
        setNotices((prev) =>
          prev.map((n) => (n.id === editingId ? { ...n, ...form } : n))
        );
        toast.success("공지가 수정되었습니다.");
      } else {
        const created = await createNotice(form);
        setNotices((prev) => [created, ...prev]);
        toast.success("공지가 등록되었습니다.");
      }
      closeForm();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "저장에 실패했습니다.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("공지를 삭제할까요?")) return;
    try {
      await deleteNotice(id);
      setNotices((prev) => prev.filter((n) => n.id !== id));
      toast.success("공지가 삭제되었습니다.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "삭제에 실패했습니다.");
    }
  };

  return (
    <div className="space-y-8">
      <section className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs tracking-[0.25em] uppercase text-[#8b7355]">Admin</p>
          <h1 className="text-4xl font-['Noto_Serif_KR',serif]">공지 관리</h1>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="inline-flex items-center gap-2 rounded-2xl bg-[#2d2a26] px-5 py-2.5 text-sm text-white hover:bg-[#3d3a36] transition-colors"
        >
          <Plus className="h-4 w-4" />
          공지 등록
        </button>
      </section>

      {showForm && (
        <section className="rounded-[2rem] bg-white/70 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-['Noto_Serif_KR',serif]">{editingId ? "공지 수정" : "새 공지 등록"}</h2>
            <button type="button" onClick={closeForm} className="text-[#8b7355] hover:text-[#2d2a26]">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="제목"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              className="w-full rounded-xl border border-[#d8caba] bg-[#faf7f2] px-4 py-2.5 text-sm outline-none focus:border-[#8b7355]"
            />
            <textarea
              placeholder="내용"
              value={form.content}
              onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
              rows={4}
              className="w-full rounded-xl border border-[#d8caba] bg-[#faf7f2] px-4 py-2.5 text-sm outline-none focus:border-[#8b7355] resize-none"
            />
            <label className="flex items-center gap-2 text-sm text-[#5c574f] cursor-pointer">
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={(e) => setForm((f) => ({ ...f, isActive: e.target.checked }))}
                className="rounded"
              />
              공개 (홈 화면에 표시)
            </label>
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={closeForm} className="rounded-xl border border-[#d8caba] px-4 py-2 text-sm text-[#5c574f] hover:bg-[#f5f0e8]">
              취소
            </button>
            <button
              type="button"
              onClick={() => void handleSave()}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-xl bg-[#8b7355] px-4 py-2 text-sm text-white hover:bg-[#6b583f] disabled:opacity-50"
            >
              <Check className="h-4 w-4" />
              {saving ? "저장 중..." : "저장"}
            </button>
          </div>
        </section>
      )}

      <section className="rounded-[2rem] bg-white/70 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-['Noto_Serif_KR',serif]">공지 목록</h2>
          <span className="text-sm text-[#5c574f]">{notices.length}건</span>
        </div>

        {loading ? (
          <div className="rounded-2xl border border-dashed border-[#d8caba] px-6 py-10 text-center text-sm text-[#5c574f]">
            공지 목록을 불러오는 중입니다.
          </div>
        ) : notices.length === 0 ? (
          <div className="rounded-[1.5rem] bg-[#f9f5ef] px-6 py-12 text-center">
            <BellRing className="mx-auto h-6 w-6 text-[#8b7355]" />
            <p className="mt-4 text-lg font-['Noto_Serif_KR',serif]">등록된 공지가 없습니다.</p>
            <p className="mt-2 text-sm text-[#5c574f]">공지 등록 버튼을 눌러 첫 공지를 작성해보세요.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {notices.map((notice) => (
              <article key={notice.id} className="rounded-[1.5rem] border border-[#e4d7c9] bg-[#fcfaf7] p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-[#2d2a26]">{notice.title}</h3>
                      {!notice.isActive && (
                        <span className="rounded-full bg-[#ede8e0] px-2 py-0.5 text-xs text-[#8b7355]">비공개</span>
                      )}
                    </div>
                    <p className="text-sm text-[#5c574f] leading-relaxed whitespace-pre-line">{notice.content}</p>
                    <p className="text-xs tracking-[0.15em] uppercase text-[#8b7355]">
                      {new Date(notice.createdAt).toLocaleDateString("ko-KR")}
                    </p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => openEdit(notice)}
                      className="rounded-xl border border-[#d8caba] p-2 text-[#5c574f] hover:bg-[#f5f0e8] transition-colors"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => void handleDelete(notice.id)}
                      className="rounded-xl border border-[#d8caba] p-2 text-[#5c574f] hover:bg-red-50 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
