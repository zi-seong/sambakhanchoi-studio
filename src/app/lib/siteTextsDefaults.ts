export interface SiteTextMeta {
  value: string;
  label: string;
  page: string;
}

export const DEFAULT_SITE_TEXTS: Record<string, SiteTextMeta> = {
  // 홈
  "home.hero.title": { value: "흙과 불, 그리고\n기다림의 시간", label: "Hero 제목", page: "홈" },
  "home.hero.subtitle": { value: "삼박한최 공방은 일상에 스며드는 따뜻한 도자기를 빚습니다.", label: "Hero 부제목", page: "홈" },
  "home.brand.title": { value: "손끝에서 피어나는 담백함", label: "브랜드 소개 제목", page: "홈" },
  "home.brand.body": { value: "자연스러운 흙의 질감과 차분한 유약의 색상.\n우리의 일상 속 식탁과 공간에 스며들어 편안함을 주는 도자기를 만듭니다.\n삼박한최 공방의 모든 작품은 작가의 세심한 손길로 완성되는 단 하나의 공예품입니다.", label: "브랜드 소개 본문", page: "홈" },
  "home.works.title": { value: "대표 작품", label: "대표작품 제목", page: "홈" },
  "home.works.subtitle": { value: "삼박한최의 시그니처 시리즈", label: "대표작품 부제목", page: "홈" },
  "home.works.item1.title": { value: "청자 다기 세트", label: "작품1 제목", page: "홈" },
  "home.works.item1.desc": { value: "은은한 비색이 감도는 찻자리", label: "작품1 설명", page: "홈" },
  "home.works.item2.title": { value: "백자 달항아리", label: "작품2 제목", page: "홈" },
  "home.works.item2.desc": { value: "비움과 채움의 미학", label: "작품2 설명", page: "홈" },
  "home.works.item3.title": { value: "데일리 머그", label: "작품3 제목", page: "홈" },
  "home.works.item3.desc": { value: "손에 착 감기는 편안함", label: "작품3 설명", page: "홈" },
  "home.classes.title": { value: "흙을 만지는 시간,\n오롯이 나에게 집중하는 순간", label: "클래스 소개 제목", page: "홈" },
  "home.classes.body": { value: "차분한 공방에서 흙을 만지며 일상의 스트레스를 비워보세요.\n초보자도 쉽게 따라할 수 있는 원데이 클래스부터,\n깊이 있게 배우는 정규반까지 다양한 수업이 준비되어 있습니다.", label: "클래스 소개 본문", page: "홈" },

  // 공방이야기
  "about.title": { value: "공방 이야기", label: "페이지 제목", page: "공방이야기" },
  "about.philosophy.title": { value: "삼박한최,\n세가지 박자가 맞는 공간", label: "철학 제목", page: "공방이야기" },
  "about.philosophy.body1": { value: "흙, 불, 그리고 사람.\n이 세 가지 요소가 조화롭게 어우러지는 곳, 삼박한최 공방입니다.", label: "철학 본문1", page: "공방이야기" },
  "about.philosophy.body2": { value: "우리는 자연에서 온 재료에 사람의 온기를 더해, 일상에서 오래도록 쓰일 수 있는 도자기를 빚습니다. 화려한 기교보다는 쓰임새를 먼저 생각하며, 시간이 지날수록 손때가 묻어 더욱 아름다워지는 그릇을 추구합니다.", label: "철학 본문2", page: "공방이야기" },
  "about.process.title": { value: "천천히, 묵묵하게", label: "작업 철학 제목", page: "공방이야기" },
  "about.process.body": { value: "도자기를 만드는 과정은 기다림의 연속입니다. 흙을 빚고 말리는 시간, 초벌과 재벌을 거치며 불 속에서 견디는 시간. 그 모든 과정을 조급해하지 않고 묵묵히 지켜보며 가장 자연스러운 결과물을 기다립니다.", label: "작업 철학 본문", page: "공방이야기" },
  "about.artist.role": { value: "도예가", label: "작가 역할", page: "공방이야기" },
  "about.artist.name": { value: "최도예", label: "작가 이름", page: "공방이야기" },
  "about.artist.quote": { value: "\"쓰는 사람의 온도가 더해질 때, 비로소 도자기가 완성된다고 믿습니다.\n너무 무겁지 않되 깊이가 있고, 가볍지 않되 편안한 그릇을 만들고자 합니다.\"", label: "작가 코멘트", page: "공방이야기" },
  "about.artist.career1": { value: "2020 한국도자재단 신진작가 공모전 입상", label: "경력1", page: "공방이야기" },
  "about.artist.career2": { value: "2021 개인전 '흙의 시간' (갤러리 아토)", label: "경력2", page: "공방이야기" },
  "about.artist.career3": { value: "2023 삼박한최 도예공방 오픈", label: "경력3", page: "공방이야기" },

  // 수업안내
  "classes.title": { value: "수업 안내", label: "페이지 제목", page: "수업안내" },
  "classes.hero.title": { value: "흙을 빚는 오롯한 시간", label: "히어로 제목", page: "수업안내" },
  "classes.hero.body": { value: "손끝에 닿는 차가운 흙의 감촉과\n부드럽게 돌아가는 물레의 리듬에 맞춰\n복잡한 생각은 비우고 나만의 도자기를 만들어보세요.", label: "히어로 본문", page: "수업안내" },
  "classes.oneday.title": { value: "원데이 클래스", label: "원데이 제목", page: "수업안내" },
  "classes.oneday.body": { value: "처음 흙을 만져보시는 분들을 위한 체험형 수업입니다. 물레 또는 핸드빌딩 방식을 선택하여, 나만의 컵, 접시, 혹은 작은 오브제를 완성해볼 수 있습니다.", label: "원데이 설명", page: "수업안내" },
  "classes.oneday.item1": { value: "소요시간: 약 120분", label: "원데이 항목1", page: "수업안내" },
  "classes.oneday.item2": { value: "완성품: 1-2개의 도자기 (가마 소성 후 3~4주 뒤 수령)", label: "원데이 항목2", page: "수업안내" },
  "classes.oneday.item3": { value: "대상: 초보자 환영, 커플/친구/가족", label: "원데이 항목3", page: "수업안내" },
  "classes.regular.title": { value: "정규 클래스", label: "정규 제목", page: "수업안내" },
  "classes.regular.body": { value: "도예의 기초부터 심화 과정까지 체계적으로 배우는 수업입니다. 흙 꼬막 밀기, 중심 잡기부터 시작해 다양한 형태의 기물을 만들고, 직접 유약을 바르는 과정까지 전 과정을 경험할 수 있습니다.", label: "정규 설명", page: "수업안내" },
  "classes.regular.item1": { value: "진행방식: 주 1회 (월 4회 기준)", label: "정규 항목1", page: "수업안내" },
  "classes.regular.item2": { value: "수업내용: 기초 핸드빌딩, 전기물레, 유약 시유 등", label: "정규 항목2", page: "수업안내" },
  "classes.regular.item3": { value: "대상: 취미로 꾸준히 도예를 배우고 싶으신 분", label: "정규 항목3", page: "수업안내" },
  "classes.process.title": { value: "도자기가 완성되는 과정", label: "제작과정 제목", page: "수업안내" },
  "classes.process.step1.title": { value: "흙 빚기 (성형)", label: "과정1 제목", page: "수업안내" },
  "classes.process.step1.desc": { value: "손이나 물레를 이용해 형태를 만듭니다.", label: "과정1 설명", page: "수업안내" },
  "classes.process.step2.title": { value: "건조 및 굽깎기", label: "과정2 제목", page: "수업안내" },
  "classes.process.step2.desc": { value: "반건조 상태에서 바닥을 깎고 다듬습니다.", label: "과정2 설명", page: "수업안내" },
  "classes.process.step3.title": { value: "초벌구이", label: "과정3 제목", page: "수업안내" },
  "classes.process.step3.desc": { value: "800도 가마에서 1차로 구워냅니다.", label: "과정3 설명", page: "수업안내" },
  "classes.process.step4.title": { value: "유약 및 재벌구이", label: "과정4 제목", page: "수업안내" },
  "classes.process.step4.desc": { value: "색을 입힌 후 1250도에서 2차로 구워 완성합니다.", label: "과정4 설명", page: "수업안내" },
  "classes.process.note": { value: "* 원데이 클래스 수강 시 완성품 수령까지 약 3~4주가 소요됩니다.", label: "과정 안내", page: "수업안내" },
  "classes.cta.title": { value: "나만의 도자기를 빚어볼까요?", label: "CTA 제목", page: "수업안내" },
  "classes.cta.body": { value: "궁금한 점이 있으시다면 언제든 편하게 문의해주세요.", label: "CTA 본문", page: "수업안내" },

  // 문의
  "contact.title": { value: "문의하기", label: "페이지 제목", page: "문의" },
  "contact.info.title": { value: "어떤 점이 궁금하신가요?", label: "문의 안내 제목", page: "문의" },
  "contact.info.body": { value: "수업 안내, 도자기 구매, 협업 제안 등 궁금한 점을 남겨주시면 확인 후 이메일이나 문자로 정성껏 답변해 드리겠습니다.", label: "문의 안내 본문", page: "문의" },
  "contact.address.label": { value: "오시는 길", label: "주소 레이블", page: "문의" },
  "contact.address.value": { value: "서울시 종로구 북촌로 123\n(안국역 2번 출구에서 도보 10분)", label: "주소", page: "문의" },
  "contact.phone.label": { value: "전화 문의", label: "전화 레이블", page: "문의" },
  "contact.phone.value": { value: "02-1234-5678", label: "전화번호", page: "문의" },
  "contact.phone.hours": { value: "화-토 11:00 - 19:00 (일,월 휴무)", label: "운영시간", page: "문의" },

  // 공통 (푸터)
  "footer.tagline": { value: "흙의 따뜻함과 손길이 닿아 만들어내는\n자연스러운 형태의 도자기를 선보입니다.", label: "소개 문구", page: "공통" },
  "footer.address": { value: "서울시 종로구 북촌로 123 (가상주소)", label: "주소", page: "공통" },
  "footer.hours": { value: "화-토 11:00 - 19:00 (일,월 휴무)", label: "운영시간", page: "공통" },
  "footer.phone": { value: "02-1234-5678", label: "전화번호", page: "공통" },
  "footer.email": { value: "sambakhanchoi@email.com", label: "이메일", page: "공통" },
  "footer.owner": { value: "대표: 최도예 | 사업자등록번호: 123-45-67890", label: "사업자정보", page: "공통" },
};
