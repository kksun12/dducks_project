"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";

export default function GlobalNav() {
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

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <nav className="w-full flex justify-between items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur border-b border-gray-200 shadow-sm sticky top-0 z-20">
      <div
        className="flex items-center gap-2 cursor-pointer select-none"
        onClick={() => router.push("/")}
      >
        <span className="text-2xl font-extrabold text-blue-700 tracking-tight">
          덕규컴성
        </span>
        <span className="text-xs font-bold text-blue-400 bg-blue-100 rounded px-2 py-0.5 ml-1">
          BETA
        </span>
      </div>
      <div className="flex gap-2">
        <button
          className="px-4 py-1 rounded-full font-semibold text-blue-700 border border-blue-200 bg-white hover:bg-blue-50 shadow-sm transition-colors"
          onClick={() => router.push("/")}
        >
          홈
        </button>
        {user ? (
          <button
            className="px-4 py-1 rounded-full font-semibold text-gray-700 border border-gray-200 bg-white hover:bg-gray-100 shadow-sm transition-colors"
            onClick={handleLogout}
          >
            로그아웃
          </button>
        ) : (
          <button
            className="px-4 py-1 rounded-full font-semibold text-blue-700 border border-blue-200 bg-white hover:bg-blue-50 shadow-sm transition-colors"
            onClick={() => router.push("/login")}
          >
            로그인
          </button>
        )}
      </div>
    </nav>
  );
}
