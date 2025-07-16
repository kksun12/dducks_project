"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import type { User } from "@supabase/supabase-js";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-orange-900 text-white px-4 py-12">
      {/* HERO SECTION */}
      <section className="w-full max-w-3xl flex flex-col items-center gap-6 p-8 rounded-3xl shadow-xl bg-black/80 border border-orange-400 mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-orange-400 drop-shadow mb-2 text-center">
          H3 SOLUTION
        </h1>
        <h2 className="text-xl md:text-2xl font-bold text-white mb-4 text-center">
          AI 기반 컴퓨터 성능 분석 & 솔루션 플랫폼
        </h2>
        <p className="text-base md:text-lg text-gray-200 text-center mb-6">
          내 컴퓨터의 성능을 AI가 자동으로 분석하고, <br />
          최적의 활용법, 업그레이드, 보안, 관리까지{" "}
          <span className="text-orange-300 font-semibold">한 번에!</span>
        </p>
        <div className="flex gap-4 w-full justify-center">
          <a
            href="/login"
            className="px-6 py-2 rounded-full font-bold text-black bg-orange-400 hover:bg-orange-500 shadow transition-colors text-lg"
          >
            로그인 / 회원가입
          </a>
          <a
            href="/board"
            className="px-6 py-2 rounded-full font-bold text-orange-400 border border-orange-400 bg-black hover:bg-orange-400 hover:text-black shadow transition-colors text-lg"
          >
            게시판 바로가기
          </a>
        </div>
        <div className="w-full flex flex-col items-center mt-8">
          <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-orange-400 via-orange-600 to-black flex items-center justify-center mb-4 shadow-lg">
            <svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              className="mx-auto"
            >
              <rect
                x="3"
                y="5"
                width="18"
                height="14"
                rx="2"
                fill="#fff"
                fillOpacity="0.1"
              />
              <path
                d="M7 15h2v2H7zM11 15h2v2h-2zM15 15h2v2h-2z"
                fill="#FFA500"
              />
              <path d="M7 11h10v2H7z" fill="#FFA500" />
              <path d="M7 7h10v2H7z" fill="#FFA500" />
            </svg>
          </div>
          <span className="text-sm text-gray-400">
            AI가 분석한 내 PC의 성능을 한눈에!
          </span>
        </div>
      </section>

      {/* AI 서비스 소개 섹션 */}
      <section className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-zinc-900/80 border border-orange-400 rounded-2xl p-6 flex flex-col items-center shadow-lg hover:scale-105 transition-transform">
          <svg
            width="40"
            height="40"
            fill="none"
            viewBox="0 0 24 24"
            className="mb-3"
          >
            <circle cx="12" cy="12" r="10" fill="#FFA500" fillOpacity="0.15" />
            <path
              d="M8 12h8M12 8v8"
              stroke="#FFA500"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <h3 className="font-bold text-lg text-orange-300 mb-2">
            AI 성능 벤치마크
          </h3>
          <p className="text-gray-300 text-sm text-center">
            CPU, GPU, RAM 등 주요 부품을 AI가 자동 진단하고, <br />
            실시간 벤치마크 결과와 순위를 제공합니다.
          </p>
        </div>
        <div className="bg-zinc-900/80 border border-orange-400 rounded-2xl p-6 flex flex-col items-center shadow-lg hover:scale-105 transition-transform">
          <svg
            width="40"
            height="40"
            fill="none"
            viewBox="0 0 24 24"
            className="mb-3"
          >
            <rect
              x="4"
              y="4"
              width="16"
              height="16"
              rx="4"
              fill="#FFA500"
              fillOpacity="0.15"
            />
            <path
              d="M8 12h8M12 8v8"
              stroke="#FFA500"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <h3 className="font-bold text-lg text-orange-300 mb-2">
            AI 업그레이드 추천
          </h3>
          <p className="text-gray-300 text-sm text-center">
            내 PC 환경을 분석해{" "}
            <span className="text-orange-200 font-semibold">
              최적의 업그레이드
            </span>{" "}
            조합과 예상 효과를 제안합니다.
          </p>
        </div>
        <div className="bg-zinc-900/80 border border-orange-400 rounded-2xl p-6 flex flex-col items-center shadow-lg hover:scale-105 transition-transform">
          <svg
            width="40"
            height="40"
            fill="none"
            viewBox="0 0 24 24"
            className="mb-3"
          >
            <rect
              x="3"
              y="3"
              width="18"
              height="18"
              rx="5"
              fill="#FFA500"
              fillOpacity="0.15"
            />
            <path
              d="M7 12h10M12 7v10"
              stroke="#FFA500"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <h3 className="font-bold text-lg text-orange-300 mb-2">
            AI 보안 & 관리
          </h3>
          <p className="text-gray-300 text-sm text-center">
            취약점 진단, 바이러스 탐지, <br />
            AI 기반 자동 관리 기능(예정)까지!
          </p>
        </div>
      </section>

      {/* 예시/데모 섹션 */}
      <section className="w-full max-w-4xl bg-black/70 border border-zinc-800 rounded-2xl p-8 mb-12 flex flex-col md:flex-row gap-8 items-center shadow-lg">
        <div className="flex-1 flex flex-col gap-2">
          <h4 className="text-orange-300 font-bold text-lg mb-1">
            AI 분석 예시
          </h4>
          <ul className="text-gray-200 text-sm list-disc pl-5 space-y-1">
            <li>CPU: Intel i7-12700K (성능: 상위 5%)</li>
            <li>GPU: NVIDIA RTX 3070 (성능: 상위 10%)</li>
            <li>RAM: 32GB (충분함)</li>
            <li>SSD: 1TB (속도 양호)</li>
            <li>
              AI 추천:{" "}
              <span className="text-orange-200 font-semibold">
                그래픽카드 업그레이드 시 게임 성능 20%↑
              </span>
            </li>
          </ul>
        </div>
        <div className="flex-1 flex flex-col items-center">
          <div className="w-40 h-40 rounded-full bg-gradient-to-tr from-orange-400 via-orange-600 to-black flex items-center justify-center mb-2 shadow-lg">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
              <circle
                cx="12"
                cy="12"
                r="10"
                fill="#FFA500"
                fillOpacity="0.12"
              />
              <path
                d="M8 12h8M12 8v8"
                stroke="#FFA500"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <span className="text-xs text-gray-400">
            실제 분석 결과는 로그인 후 확인 가능
          </span>
        </div>
      </section>

      {/* FAQ/미리보기/예정 서비스 */}
      <section className="w-full max-w-4xl mb-16">
        <h4 className="text-orange-300 font-bold text-lg mb-4">
          앞으로 제공될 AI 서비스
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-zinc-900/80 border border-orange-400 rounded-xl p-5 flex flex-col gap-2 shadow hover:scale-[1.02] transition-transform">
            <span className="font-semibold text-orange-200">
              AI 자동 드라이버 관리
            </span>
            <span className="text-gray-300 text-sm">
              최신 드라이버 자동 설치/업데이트, 호환성 체크
            </span>
          </div>
          <div className="bg-zinc-900/80 border border-orange-400 rounded-xl p-5 flex flex-col gap-2 shadow hover:scale-[1.02] transition-transform">
            <span className="font-semibold text-orange-200">
              AI 하드웨어 수명 예측
            </span>
            <span className="text-gray-300 text-sm">
              부품별 수명 예측 및 교체 시기 알림
            </span>
          </div>
          <div className="bg-zinc-900/80 border border-orange-400 rounded-xl p-5 flex flex-col gap-2 shadow hover:scale-[1.02] transition-transform">
            <span className="font-semibold text-orange-200">
              AI 맞춤형 튜닝 가이드
            </span>
            <span className="text-gray-300 text-sm">
              게임/작업별 최적화 세팅 자동 추천
            </span>
          </div>
          <div className="bg-zinc-900/80 border border-orange-400 rounded-xl p-5 flex flex-col gap-2 shadow hover:scale-[1.02] transition-transform">
            <span className="font-semibold text-orange-200">
              AI 커뮤니티 Q&A
            </span>
            <span className="text-gray-300 text-sm">
              AI가 실시간으로 질문 답변, 팁 제공
            </span>
          </div>
        </div>
      </section>

      <footer className="mt-8 text-xs text-gray-500 text-center">
        &copy; {new Date().getFullYear()} H3 SOLUTION. All rights reserved.
      </footer>
    </main>
  );
}
