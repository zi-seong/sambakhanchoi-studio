import { IMAGES } from "../utils/images";
import type { GalleryItem, Inquiry } from "../types/content";

export const seedGalleryItems: GalleryItem[] = [
  {
    id: "seed-celadon",
    title: "청자 달항아리",
    category: "오브제",
    description: "고려청자의 비색을 현대적으로 재해석한 대표 작품입니다.",
    imageUrl: IMAGES.celadon,
    featured: true,
    displayOrder: 1,
    createdAt: "2026-03-21T00:00:00.000Z",
  },
  {
    id: "seed-white-bowl",
    title: "백자 면기",
    category: "식기",
    description: "단아한 곡선으로 완성한 일상용 백자 면기입니다.",
    imageUrl: IMAGES.whitePorcelain,
    featured: true,
    displayOrder: 2,
    createdAt: "2026-03-21T00:00:00.000Z",
  },
  {
    id: "seed-teacup",
    title: "손물레 찻잔",
    category: "다기",
    description: "손맛이 살아있는 질감과 균형감이 특징인 찻잔 세트입니다.",
    imageUrl: IMAGES.handmadeCups,
    featured: false,
    displayOrder: 3,
    createdAt: "2026-03-21T00:00:00.000Z",
  },
  {
    id: "seed-vase",
    title: "흙빛 화병",
    category: "오브제",
    description: "자연 흙의 결을 그대로 살린 오브제 화병입니다.",
    imageUrl: IMAGES.vasesDisplay,
    featured: false,
    displayOrder: 4,
    createdAt: "2026-03-21T00:00:00.000Z",
  },
  {
    id: "seed-horong",
    title: "전통 호롱",
    category: "소품",
    description: "따뜻한 빛을 담는 전통 무드의 도자 조명 오브제입니다.",
    imageUrl: IMAGES.tradCeramics,
    featured: false,
    displayOrder: 5,
    createdAt: "2026-03-21T00:00:00.000Z",
  },
  {
    id: "seed-wheel",
    title: "물레 시연작",
    category: "과정",
    description: "제작 과정의 생생한 흔적이 남아 있는 시연 작품입니다.",
    imageUrl: IMAGES.wheelHands,
    featured: false,
    displayOrder: 6,
    createdAt: "2026-03-21T00:00:00.000Z",
  },
];

export const seedInquiries: Inquiry[] = [];
