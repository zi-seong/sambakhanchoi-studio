# 삼박한최

피그마 초안을 바탕으로 생성된 `Vite + React` 웹사이트입니다.

원본 피그마:
https://www.figma.com/design/pTMIgDNo0dGn7EYLNI9Vd2/%EC%82%BC%EB%B0%95%ED%95%9C%EC%B5%9C

## 요구 사항

- Node.js 20 이상 권장
- npm 사용

## 로컬 실행

```bash
npm install
npm run dev
```

개발 서버 주소:

```text
http://127.0.0.1:4173
```

## 프로덕션 빌드

```bash
npm run build
```

빌드 결과물은 `dist/` 폴더에 생성됩니다.

빌드 결과를 로컬에서 미리보려면:

```bash
npm run preview
```

## 현재 포함된 페이지

- 메인
- 공방 이야기
- 작품 갤러리
- 수업 안내
- 문의하기
- 관리자 로그인
- 관리자 갤러리 관리
- 관리자 문의 관리

## 관리자 페이지

관리자 화면 경로:

```text
/admin
```

현재 구조는 두 가지 모드로 동작합니다.

- Supabase 미설정: 브라우저 `localStorage` 기반 데모 모드
- Supabase 설정 완료: 실제 DB + Auth 기반 운영 모드

### Supabase 연결

`.env` 파일을 만들고 아래 값을 넣으면 됩니다.

```bash
cp .env.example .env
```

```env
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

### 권장 테이블

`gallery_items`

- `id` uuid primary key default gen_random_uuid()
- `title` text not null
- `category` text not null
- `description` text not null
- `image_url` text not null
- `featured` boolean default false
- `display_order` int default 0
- `created_at` timestamptz default now()

`inquiries`

- `id` uuid primary key default gen_random_uuid()
- `name` text not null
- `contact` text not null
- `type` text not null
- `message` text not null
- `status` text default 'new'
- `created_at` timestamptz default now()

### 권장 운영 방식

- `gallery_items`: 공개 읽기, 관리자만 쓰기
- `inquiries`: 공개 쓰기, 관리자만 읽기/수정
- 관리자 로그인: Supabase Auth 이메일 계정 사용

## 참고

- 현재 이미지는 실제 공방 사진이 아니라 피그마 초안용 임시 이미지가 포함되어 있습니다.
- 실제 운영용으로 바꾸려면 문구, 연락처, 주소, 이미지 에셋을 실데이터로 교체하는 작업이 필요합니다.

## 저장소 규칙

- Codex 및 작업 규칙: [AGENTS.md](/Users/jiseongpark/Documents/New project/AGENTS.md)
- 코드 스타일: [docs/engineering/code-style.md](/Users/jiseongpark/Documents/New project/docs/engineering/code-style.md)
- Git 작업 방식: [docs/engineering/git-workflow.md](/Users/jiseongpark/Documents/New project/docs/engineering/git-workflow.md)
