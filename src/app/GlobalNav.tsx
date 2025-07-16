"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import type { User } from "@supabase/supabase-js";

export default function GlobalNav() {
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

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <nav className="w-full flex justify-between items-center gap-2 px-6 py-3 bg-black/90 backdrop-blur border-b border-orange-400 shadow-sm sticky top-0 z-20">
      <div
        className="flex items-center gap-2 cursor-pointer select-none"
        onClick={() => router.push("/")}
      >
        <span className="text-2xl font-extrabold tracking-tight text-orange-400 drop-shadow">
          H3 <span className="text-white">SOLUTION</span>
        </span>
        <span className="text-xs font-bold text-black bg-orange-400 rounded px-2 py-0.5 ml-1">
          BETA
        </span>
      </div>
      <div className="flex gap-2">
        <button
          className="px-4 py-1 rounded-full font-semibold text-orange-400 border border-orange-400 bg-black hover:bg-orange-400 hover:text-black shadow-sm transition-colors"
          onClick={() => router.push("/")}
        >
          홈
        </button>
        {user ? (
          <button
            className="px-4 py-1 rounded-full font-semibold text-white border border-gray-700 bg-black hover:bg-orange-400 hover:text-black shadow-sm transition-colors"
            onClick={handleLogout}
          >
            로그아웃
          </button>
        ) : (
          <button
            className="px-4 py-1 rounded-full font-semibold text-orange-400 border border-orange-400 bg-black hover:bg-orange-400 hover:text-black shadow-sm transition-colors"
            onClick={() => router.push("/login")}
          >
            로그인
          </button>
        )}
      </div>
    </nav>
  );
}
