import { useState } from "react";
import { toast } from "sonner";
import { Pencil, Check, X } from "lucide-react";
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
    "about.artist.career1",
    "about.artist.career2",
    "about.artist.career3",
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
          </section>
        ))}
      </div>
    </div>
  );
}
