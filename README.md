# 덕규를 위한 컴퓨터 성능분석 서비스

이 프로젝트는 Next.js, Supabase, Tailwind CSS 기반의 **컴퓨터 성능분석/게시판 서비스**입니다.

- **로그인/회원가입**: 이메일, Discord, GitHub, Kakao 소셜 로그인 지원
- **이메일 인증/비밀번호 확인**: 회원가입 시 이메일 인증, 비밀번호 확인
- **게시판**: 글 목록, 글쓰기(제목/작성자/내용), 실시간 조회
- **반응형/모던 UI**: Tailwind 기반의 일관된 디자인, 글로벌 네비게이션, 카드형 UI
- **친구 덕규를 위한 맞춤 서비스 컨셉**

---

## 주요 기능

- **메인화면**: 서비스 소개, 로그인 버튼(로그인 시 미노출)
- **로그인/회원가입**: 이메일/비밀번호, 소셜 로그인, 비밀번호 확인, 에러/성공 메시지
- **글쓰기**: 제목/작성자/내용 입력, 등록/취소, 입력값 검증
- **게시판**: Supabase posts 테이블 연동, 실시간 목록, 로딩/에러/빈 목록 처리
- **글로벌 네비게이션**: 홈/로그인/로그아웃, 상단 고정, 서비스명/로고

---

## 기술 스택

- **Next.js (App Router, TypeScript)**
- **Supabase (인증, DB, 소셜 로그인)**
- **Tailwind CSS**
- **React 19**

---

## 개발 및 실행 방법

1. **의존성 설치**
   ```bash
   npm install
   ```
2. **환경변수 설정**
   - `my-next-app/.env.local` 파일 생성 후 아래 내용 입력
     ```env
     NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
     ```
   - Supabase 프로젝트의 Project Settings > API에서 값 확인
3. **개발 서버 실행**
   ```bash
   npm run dev
   ```
4. **브라우저에서 접속**
   - [http://localhost:3000](http://localhost:3000)

---

## Supabase 연동 안내

- **posts 테이블**
  - 컬럼: `id`(PK, int), `title`(string), `author`(string), `content`(text), `date`(string)
- **인증/소셜 로그인**: Supabase Auth에서 Discord, GitHub, Kakao provider 활성화 및 Redirect URL 등록 필요
- **이메일 인증**: 기본적으로 회원가입 시 이메일 인증 필요(테스트용으로 비활성화 가능)

---

## 커스텀 디자인 특징

- 서비스명/로고, BETA 뱃지, 카드형 UI, 컬러 팔레트, 그림자/라운드, 반응형
- 입력폼, 버튼, 에러/성공 메시지 등 실서비스 수준의 가독성/접근성
- 덕규를 위한 맞춤형 문구와 친근한 분위기

---

## 기타

- 추가 기능(댓글, 상세보기, 수정/삭제, 성능 벤치마크 등) 확장 가능
- 문의: [프로젝트 관리자에게 연락]
