"use client";

import React, { useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import { useRouter } from "next/navigation";
import Image from "next/image";
import type { User } from "@supabase/supabase-js";

const SOCIALS = [
  {
    provider: "discord",
    label: "Discord로 로그인",
    color: "bg-[#5865F2]",
    icon: "/discord.svg",
  },
  {
    provider: "github",
    label: "GitHub로 로그인",
    color: "bg-black",
    icon: "/github.svg",
  },
  {
    provider: "kakao",
    label: "Kakao로 로그인",
    color: "bg-[#FEE500] text-black",
    icon: "/kakao.svg",
  },
];

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [success, setSuccess] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    if (isSignUp) {
      // 비밀번호 확인 체크
      if (password !== passwordCheck) {
        setError("비밀번호가 일치하지 않습니다.");
        setLoading(false);
        return;
      }
      // 회원가입
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) setError(error.message);
      else {
        setIsSignUp(false); // 회원가입 성공 시 로그인 폼으로 전환
        setSuccess("회원가입 성공! 이메일을 확인해 주세요.");
        setEmail("");
        setPassword("");
        setPasswordCheck("");
      }
    } else {
      // 로그인
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) setError(error.message);
      else router.push("/board"); // 로그인 성공 시 게시판으로 이동
    }
    setLoading(false);
  };

  const handleSocialLogin = async (provider: string) => {
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithOAuth({
      provider: provider as any,
    });
    if (error) setError(error.message);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-orange-100">
      <div className="w-full max-w-md bg-zinc-900 rounded-2xl shadow-2xl p-8 border border-orange-400">
        <h2 className="text-3xl font-extrabold text-orange-400 mb-6 text-center drop-shadow">
          {isSignUp ? "회원가입" : "로그인"}
        </h2>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-base font-bold text-orange-300 mb-1"
            >
              이메일
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 text-orange-100 placeholder-orange-300 bg-black"
              placeholder="이메일을 입력하세요"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-base font-bold text-orange-300 mb-1"
            >
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 text-orange-100 placeholder-orange-300 bg-black"
              placeholder="비밀번호를 입력하세요"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {/* 비밀번호 확인 입력란 (회원가입 시에만) */}
          {isSignUp && (
            <div>
              <label
                htmlFor="passwordCheck"
                className="block text-base font-bold text-orange-300 mb-1"
              >
                비밀번호 확인
              </label>
              <input
                type="password"
                id="passwordCheck"
                className="w-full px-4 py-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 text-orange-100 placeholder-orange-300 bg-black"
                placeholder="비밀번호를 한 번 더 입력하세요"
                required
                value={passwordCheck}
                onChange={(e) => setPasswordCheck(e.target.value)}
              />
            </div>
          )}
          {error && (
            <div className="text-orange-400 text-sm font-bold">{error}</div>
          )}
          {!isSignUp && success && (
            <div className="text-green-400 text-sm font-bold">{success}</div>
          )}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-orange-400 text-black py-2 rounded-md font-bold hover:from-orange-600 hover:to-orange-500 transition-colors border-2 border-orange-400 shadow-lg disabled:opacity-50"
            disabled={loading}
          >
            {loading
              ? isSignUp
                ? "회원가입 중..."
                : "로그인 중..."
              : isSignUp
              ? "회원가입"
              : "로그인"}
          </button>
        </form>
        {/* 소셜 로그인 버튼 */}
        {!isSignUp && (
          <div className="mt-8">
            <div className="flex items-center mb-4">
              <div className="flex-grow border-t border-orange-300" />
              <span className="mx-2 text-orange-300 text-sm">또는</span>
              <div className="flex-grow border-t border-orange-300" />
            </div>
            <div className="flex flex-col gap-3">
              {SOCIALS.map((s) => (
                <button
                  key={s.provider}
                  type="button"
                  className={`w-full flex items-center justify-center gap-2 py-2 rounded-md font-bold border-2 border-orange-400 bg-black text-orange-300 hover:bg-orange-400 hover:text-black transition-colors`}
                  onClick={() => handleSocialLogin(s.provider)}
                  disabled={loading}
                >
                  <Image src={s.icon} alt={s.provider} width={24} height={24} />
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        )}
        <div className="mt-6 text-center">
          {isSignUp ? (
            <>
              <span className="text-orange-200">이미 계정이 있으신가요? </span>
              <button
                className="text-orange-400 hover:underline font-bold"
                onClick={() => {
                  setIsSignUp(false);
                  setError("");
                  setSuccess("");
                }}
              >
                로그인
              </button>
            </>
          ) : (
            <>
              <span className="text-orange-200">계정이 없으신가요? </span>
              <button
                className="text-orange-400 hover:underline font-bold"
                onClick={() => {
                  setIsSignUp(true);
                  setError("");
                  setSuccess("");
                }}
              >
                회원가입
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// [환경변수 등록 위치 안내]
// 1. my-next-app/.env.local 파일에 아래와 같이 입력하세요:
// NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
// NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
//
// 2. Supabase 클라이언트 초기화는 src/utils/supabaseClient.ts 파일에서 처리합니다.
