export interface SiteImageMeta {
  defaultUrl: string;
  label: string;
  usage: string;
}

export const DEFAULT_SITE_IMAGES: Record<string, SiteImageMeta> = {
  hero: {
    defaultUrl: "",
    label: "Hero 배경",
    usage: "홈 모바일 배경",
  },
  wheelHands: {
    defaultUrl: "https://images.unsplash.com/photo-1720176472643-731fc581b10e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3R0ZXJ5JTIwd2hlZWwlMjBoYW5kcyUyMG1ha2luZ3xlbnwxfHx8fDE3NzQwMzk1ODh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    label: "물레 작업",
    usage: "홈 클래스 소개 · 수업안내",
  },
  artistProfile: {
    defaultUrl: "https://images.unsplash.com/photo-1720176472643-731fc581b10e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3R0ZXJ5JTIwd2hlZWwlMjBoYW5kcyUyMG1ha2luZ3xlbnwxfHx8fDE3NzQwMzk1ODh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    label: "도예가 프로필 사진",
    usage: "공방이야기 · 도예가 소개 섹션",
  },
  warmInterior: {
    defaultUrl: "",
    label: "공방 내부",
    usage: "소개 페이지 철학 섹션",
  },
  toolsClay: {
    defaultUrl: "",
    label: "작업 도구",
    usage: "소개 페이지 과정 섹션",
  },
  celadon: {
    defaultUrl: "",
    label: "청자 다기 세트",
    usage: "홈 대표작품",
  },
  whitePorcelain: {
    defaultUrl: "",
    label: "백자 달항아리",
    usage: "홈 대표작품",
  },
  handmadeCups: {
    defaultUrl: "",
    label: "데일리 머그",
    usage: "홈 대표작품",
  },
};
