export interface SiteImageMeta {
  defaultUrl: string;
  label: string;
  usage: string;
}

export const DEFAULT_SITE_IMAGES: Record<string, SiteImageMeta> = {
  hero: {
    defaultUrl: "https://images.unsplash.com/photo-1765329843964-5968a383fa4c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwcG90dGVyeSUyMGNlcmFtaWN8ZW58MXx8fHwxNzc0MDczMzQzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    label: "Hero 배경",
    usage: "홈 모바일 배경",
  },
  wheelHands: {
    defaultUrl: "https://images.unsplash.com/photo-1720176472643-731fc581b10e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3R0ZXJ5JTIwd2hlZWwlMjBoYW5kcyUyMG1ha2luZ3xlbnwxfHx8fDE3NzQwMzk1ODh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    label: "물레 작업",
    usage: "홈 클래스 소개 · 수업안내 · 소개 작가 사진",
  },
  warmInterior: {
    defaultUrl: "https://images.unsplash.com/photo-1758627506826-0658170e5cf6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXJtJTIwd29ya3Nob3AlMjBpbnRlcmlvciUyMHN1bmxpZ2h0fGVufDF8fHx8MTc3NDA3MzM0M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    label: "공방 내부",
    usage: "소개 페이지 철학 섹션",
  },
  toolsClay: {
    defaultUrl: "https://images.unsplash.com/photo-1695815870444-da67db99d7c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3R0ZXJ5JTIwdG9vbHMlMjBjbGF5fGVufDF8fHx8MTc3NDA3MzM0NHww&ixlib=rb-4.1.0&q=80&w=1080",
    label: "작업 도구",
    usage: "소개 페이지 과정 섹션",
  },
  celadon: {
    defaultUrl: "https://images.unsplash.com/photo-1752718069156-0367b18ae4ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBjZWxhZG9uJTIwcG90dGVyeXxlbnwxfHx8fDE3NzQwNzMzNDd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    label: "청자 다기 세트",
    usage: "홈 대표작품",
  },
  whitePorcelain: {
    defaultUrl: "https://images.unsplash.com/photo-1519916478825-b1d7aef08f54?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB3aGl0ZSUyMHBvcmNlbGFpbnxlbnwxfHx8fDE3NzQwNzMzNDd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    label: "백자 달항아리",
    usage: "홈 대표작품",
  },
  handmadeCups: {
    defaultUrl: "https://images.unsplash.com/photo-1720356778193-3b5d2667c4b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMGNlcmFtaWMlMjBjdXBzfGVufDF8fHx8MTc3NDA3MzM0M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    label: "데일리 머그",
    usage: "홈 대표작품",
  },
};
