import { useRef, useState } from "react";
import { toast } from "sonner";
import { Upload, Loader2 } from "lucide-react";
import { useSiteImages } from "../SiteImagesProvider";
import { DEFAULT_SITE_IMAGES } from "../../lib/siteImagesDefaults";

const IMAGE_KEYS = Object.keys(DEFAULT_SITE_IMAGES);

export function AdminImagesPage() {
  const { img, upload } = useSiteImages();
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const handleFileChange = async (key: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("이미지 파일만 업로드 가능합니다.");
      return;
    }

    try {
      setUploadingKey(key);
      await upload(key, file);
      toast.success("이미지가 업로드되었습니다.");
    } catch {
      toast.error("업로드에 실패했습니다.");
    } finally {
      setUploadingKey(null);
      if (fileInputRefs.current[key]) {
        fileInputRefs.current[key]!.value = "";
      }
    }
  };

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h2 className="text-2xl font-['Noto_Serif_KR',serif] text-[#2d2a26]">이미지 관리</h2>
        <p className="text-sm text-[#5c574f] mt-2">사이트에 사용되는 이미지를 교체할 수 있습니다. JPG, PNG, WEBP 지원.</p>
      </div>

      <div className="flex flex-col gap-4">
        {IMAGE_KEYS.map((key) => {
          const meta = DEFAULT_SITE_IMAGES[key];
          const isUploading = uploadingKey === key;
          const currentUrl = img(key);

          return (
            <div key={key} className="bg-white rounded-2xl border border-[#e5e0d8] p-4 flex items-center gap-4">
              {/* 썸네일 */}
              <div className="w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-[#f5f5f0]">
                <img
                  src={currentUrl}
                  alt={meta.label}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* 정보 */}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-[#2d2a26] text-sm">{meta.label}</p>
                <p className="text-xs text-[#a8a196] mt-0.5">{meta.usage}</p>
              </div>

              {/* 업로드 버튼 */}
              <div className="shrink-0">
                <input
                  type="file"
                  accept="image/*,.jpg,.jpeg,.png,.webp,.heic,.heif"
                  className="hidden"
                  ref={(el) => { fileInputRefs.current[key] = el; }}
                  onChange={(e) => void handleFileChange(key, e)}
                />
                <button
                  onClick={() => fileInputRefs.current[key]?.click()}
                  disabled={isUploading}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#f5f5f0] text-[#5c574f] hover:bg-[#e5e0d8] transition-colors text-sm disabled:opacity-50"
                >
                  {isUploading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Upload className="w-4 h-4" />
                  )}
                  {isUploading ? "업로드 중..." : "교체"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
