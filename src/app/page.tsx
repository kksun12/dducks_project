"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

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
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-orange-100 flex flex-col items-center justify-center font-sans">
      <header className="w-full max-w-3xl text-center py-12 flex flex-col items-center">
        <div className="flex items-center justify-center mb-4">
          <Image
            src="/globe.svg"
            alt="AI 분석"
            width={56}
            height={56}
            className="drop-shadow-lg"
          />
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-600 to-black mb-4 drop-shadow">
          <span className="text-orange-400">H3 SOLUTION</span> AI 컴퓨터 성능
          분석
        </h1>
        <p className="text-lg sm:text-xl text-zinc-200 mb-8 max-w-2xl mx-auto">
          <span className="font-semibold text-orange-400">AI</span>가 내
          컴퓨터의 하드웨어와 소프트웨어를 분석하여
          <br className="sm:hidden" />
          <span className="font-semibold text-orange-400">
            최적의 성능
          </span>과{" "}
          <span className="font-semibold text-orange-400">효율적인 사용법</span>
          을 제안합니다.
          <br />
          벤치마크, 실시간 비교, 맞춤형 AI 리포트까지 한 번에!
        </p>
        {/* 로그인 안 된 경우에만 버튼 표시 */}
        {!user && (
          <button
            className="mt-4 px-10 py-3 bg-gradient-to-r from-orange-500 to-orange-400 text-black text-lg font-bold rounded-full shadow-lg hover:from-orange-600 hover:to-orange-500 transition-colors border-2 border-orange-400"
            onClick={() => router.push("/login")}
          >
            AI 분석 시작하기
          </button>
        )}
      </header>
      <main className="w-full max-w-3xl bg-black/80 rounded-2xl shadow-2xl p-10 flex flex-col gap-10 items-center border border-orange-400">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full">
          <div className="flex flex-col items-center bg-zinc-900 rounded-xl p-6 shadow border border-orange-300">
            <Image src="/window.svg" alt="AI 벤치마크" width={48} height={48} />
            <h2 className="text-lg font-bold text-orange-400 mt-3 mb-1">
              AI 벤치마크
            </h2>
            <p className="text-zinc-200 text-center text-sm">
              AI가 CPU, GPU, 메모리 등 주요 부품을 자동 진단하고
              <br />
              최적의 성능을 위한 팁을 제공합니다.
            </p>
          </div>
          <div className="flex flex-col items-center bg-zinc-900 rounded-xl p-6 shadow border border-orange-300">
            <Image src="/globe.svg" alt="실시간 비교" width={48} height={48} />
            <h2 className="text-lg font-bold text-orange-400 mt-3 mb-1">
              실시간 비교
            </h2>
            <p className="text-zinc-200 text-center text-sm">
              다른 사용자와 내 컴퓨터를
              <br />
              실시간으로 비교하고 순위를 확인하세요.
            </p>
          </div>
          <div className="flex flex-col items-center bg-zinc-900 rounded-xl p-6 shadow border border-orange-300">
            <Image src="/file.svg" alt="AI 리포트" width={48} height={48} />
            <h2 className="text-lg font-bold text-orange-400 mt-3 mb-1">
              AI 맞춤 리포트
            </h2>
            <p className="text-zinc-200 text-center text-sm">
              AI가 분석한 결과를 바탕으로
              <br />
              개인별 맞춤 리포트를 제공합니다.
            </p>
          </div>
        </div>
      </main>
      <footer className="mt-16 text-orange-300 text-sm text-center">
        © 2024 H3 SOLUTION AI 컴퓨터 성능분석. Powered by Next.js, Supabase & AI
      </footer>
    </div>
  );
}
