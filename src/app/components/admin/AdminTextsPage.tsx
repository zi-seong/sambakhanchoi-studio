import { useState } from "react";
import { toast } from "sonner";
import { Pencil, Check, X, Plus, Trash2 } from "lucide-react";
import { useSiteTexts } from "../SiteTextsProvider";
import { DEFAULT_SITE_TEXTS } from "../../lib/siteTextsDefaults";

const EDITABLE_KEYS: Record<string, string[]> = {
  홈: [
    "home.hero.title",
    "home.hero.subtitle",
    "home.brand.title",
    "home.brand.body",
    "home.classes.title",
    "home.classes.body",
  ],
  공방이야기: [
    "about.title",
    "about.philosophy.title",
    "about.philosophy.body1",
    "about.philosophy.body2",
    "about.process.title",
    "about.process.body",
    "about.artist.role",
    "about.artist.name",
    "about.artist.quote",
  ],
  문의: [
    "contact.title",
    "contact.info.title",
    "contact.info.body",
    "contact.address.label",
    "contact.address.value",
    "contact.phone.label",
    "contact.phone.value",
    "contact.phone.hours",
  ],
  공통: [
    "footer.tagline",
    "footer.address",
    "footer.hours",
    "footer.phone",
    "footer.email",
    "footer.owner",
  ],
};

function CareerEditor() {
  const { t, save } = useSiteTexts();

  const parseCareers = (): string[] => {
    try {
      const raw = t("about.artist.careers");
      if (raw) return JSON.parse(raw) as string[];
    } catch {}
    return [t("about.artist.career1"), t("about.artist.career2"), t("about.artist.career3")].filter(Boolean);
  };

  const [careers, setCareers] = useState<string[]>(parseCareers);
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");
  const [saving, setSaving] = useState(false);

  const persist = async (next: string[]) => {
    setSaving(true);
    try {
      await save("about.artist.careers", JSON.stringify(next));
      setCareers(next);
      toast.success("경력이 저장되었습니다.");
    } catch {
      toast.error("저장에 실패했습니다.");
    } finally {
      setSaving(false);
    }
  };

  const startEdit = (idx: number) => {
    setEditingIdx(idx);
    setEditValue(careers[idx]);
  };

  const confirmEdit = async () => {
    if (editingIdx === null) return;
    const next = careers.map((c, i) => (i === editingIdx ? editValue : c));
    await persist(next);
    setEditingIdx(null);
  };

  const deleteItem = async (idx: number) => {
    await persist(careers.filter((_, i) => i !== idx));
  };

  const addItem = async () => {
    const next = [...careers, "새 경력 항목"];
    await persist(next);
    setEditingIdx(next.length - 1);
    setEditValue("새 경력 항목");
  };

  return (
    <section>
      <h3 className="text-xs font-bold tracking-widest uppercase text-[#8b7355] mb-4 pb-2 border-b border-[#dfd1bf]">
        도예가 경력
      </h3>
      <div className="flex flex-col gap-3">
        {careers.map((career, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-[#e5e0d8] p-4">
            <div className="flex items-center gap-4">
              <div className="flex-1 min-w-0">
                {editingIdx === idx ? (
                  <input
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="w-full px-3 py-2 text-sm text-[#2d2a26] bg-[#faf9f6] border border-[#8b7355] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#8b7355]"
                    autoFocus
                    onKeyDown={(e) => { if (e.key === "Enter") void confirmEdit(); }}
                  />
                ) : (
                  <p className="text-sm text-[#2d2a26]">{career}</p>
                )}
              </div>
              <div className="flex gap-2 shrink-0">
                {editingIdx === idx ? (
                  <>
                    <button
                      onClick={() => void confirmEdit()}
                      disabled={saving}
                      className="p-1.5 rounded-lg bg-[#2d2a26] text-white hover:bg-[#8b7355] transition-colors disabled:opacity-50"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setEditingIdx(null)}
                      disabled={saving}
                      className="p-1.5 rounded-lg bg-[#e5e0d8] text-[#5c574f] hover:bg-[#dfd1bf] transition-colors disabled:opacity-50"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => startEdit(idx)}
                      className="p-1.5 rounded-lg bg-[#f5f5f0] text-[#5c574f] hover:bg-[#e5e0d8] transition-colors"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => void deleteItem(idx)}
                      disabled={saving}
                      className="p-1.5 rounded-lg bg-[#f5f5f0] text-[#5c574f] hover:bg-[#fee2e2] hover:text-red-500 transition-colors disabled:opacity-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
        <button
          onClick={() => void addItem()}
          disabled={saving}
          className="flex items-center justify-center gap-2 rounded-2xl border border-dashed border-[#d8caba] py-3 text-sm text-[#8b7355] hover:border-[#8b7355] hover:bg-[#faf9f6] transition-colors disabled:opacity-50"
        >
          <Plus className="w-4 h-4" />
          경력 추가
        </button>
      </div>
    </section>
  );
}

export function AdminTextsPage() {
  const { t, save } = useSiteTexts();
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [savingKey, setSavingKey] = useState<string | null>(null);

  const grouped = Object.entries(EDITABLE_KEYS).map(([page, keys]) => ({
    page,
    items: keys
      .map((key) => [key, DEFAULT_SITE_TEXTS[key]] as const)
      .filter(([, meta]) => meta !== undefined),
  }));

  const startEdit = (key: string) => {
    setEditingKey(key);
    setEditValue(t(key));
  };

  const cancelEdit = () => {
    setEditingKey(null);
    setEditValue("");
  };

  const handleSave = async (key: string) => {
    try {
      setSavingKey(key);
      await save(key, editValue);
      toast.success("저장되었습니다.");
      setEditingKey(null);
    } catch {
      toast.error("저장에 실패했습니다.");
    } finally {
      setSavingKey(null);
    }
  };

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h2 className="text-2xl font-['Noto_Serif_KR',serif] text-[#2d2a26]">텍스트 관리</h2>
        <p className="text-sm text-[#5c574f] mt-2">화면에 표시되는 모든 텍스트를 수정할 수 있습니다. 줄바꿈은 Enter로 입력하세요.</p>
      </div>

      <div className="flex flex-col gap-10">
        {grouped.map(({ page, items }) => (
          <section key={page}>
            <h3 className="text-xs font-bold tracking-widest uppercase text-[#8b7355] mb-4 pb-2 border-b border-[#dfd1bf]">
              {page}
            </h3>
            <div className="flex flex-col gap-3">
              {items.map(([key, meta]) => {
                const isEditing = editingKey === key;
                const isSaving = savingKey === key;
                const currentValue = t(key);
                const isMultiline = currentValue.includes("\n") || meta.value.includes("\n");

                return (
                  <div key={key} className="bg-white rounded-2xl border border-[#e5e0d8] p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-[#a8a196] tracking-wide mb-1">{meta.label}</p>
                        {isEditing ? (
                          <textarea
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            rows={isMultiline ? 4 : 2}
                            className="w-full px-3 py-2 text-sm text-[#2d2a26] bg-[#faf9f6] border border-[#8b7355] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#8b7355] resize-none"
                            autoFocus
                          />
                        ) : (
                          <p className="text-sm text-[#2d2a26] leading-relaxed whitespace-pre-line line-clamp-3">
                            {currentValue}
                          </p>
                        )}
                      </div>

                      <div className="flex gap-2 shrink-0 mt-1">
                        {isEditing ? (
                          <>
                            <button
                              onClick={() => void handleSave(key)}
                              disabled={isSaving}
                              className="p-1.5 rounded-lg bg-[#2d2a26] text-white hover:bg-[#8b7355] transition-colors disabled:opacity-50"
                              title="저장"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              onClick={cancelEdit}
                              disabled={isSaving}
                              className="p-1.5 rounded-lg bg-[#e5e0d8] text-[#5c574f] hover:bg-[#dfd1bf] transition-colors disabled:opacity-50"
                              title="취소"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => startEdit(key)}
                            className="p-1.5 rounded-lg bg-[#f5f5f0] text-[#5c574f] hover:bg-[#e5e0d8] transition-colors"
                            title="수정"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {page === "공방이야기" && <CareerEditor />}
          </section>
        ))}
      </div>
    </div>
  );
}
