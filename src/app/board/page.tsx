"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabaseClient";

interface Post {
  id: number;
  title: string;
  author: string;
  content: string;
  created_at?: string;
}

export default function BoardPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // 글쓰기 폼 상태
  const [showForm, setShowForm] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const [formAuthor, setFormAuthor] = useState("");
  const [formContent, setFormContent] = useState("");
  const [formLoading, setFormLoading] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    setError("");
    const { data, error } = await supabase
      .from("posts")
      .select("id, title, author, content, created_at")
      .order("id", { ascending: false });
    if (error) setError(error.message);
    else setPosts(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // 글 등록
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setError("");
    const { error } = await supabase.from("posts").insert([
      {
        title: formTitle,
        author: formAuthor,
        content: formContent,
        // date: dateStr, // 제거
      },
    ]);
    if (error) setError(error.message);
    else {
      setShowForm(false);
      setFormTitle("");
      setFormAuthor("");
      setFormContent("");
      fetchPosts();
    }
    setFormLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-orange-100 flex flex-col items-center py-10">
      <div className="w-full max-w-2xl bg-zinc-900 rounded-2xl shadow-2xl p-8 border border-orange-400">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-extrabold text-orange-400 drop-shadow">
            게시판
          </h1>
          <div className="flex gap-2">
            <button
              className="bg-gradient-to-r from-orange-500 to-orange-400 text-black px-4 py-2 rounded-md font-bold border-2 border-orange-400 shadow hover:from-orange-600 hover:to-orange-500 transition-colors"
              onClick={() => setShowForm(true)}
            >
              글쓰기
            </button>
          </div>
        </div>
        {/* 글쓰기 폼 */}
        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="mb-6 p-4 border-2 border-orange-400 rounded-xl bg-black flex flex-col gap-3 shadow"
          >
            <label className="font-bold text-orange-300">제목</label>
            <input
              className="border border-orange-300 px-3 py-2 rounded text-orange-100 placeholder-orange-300 bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="제목"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              required
            />
            <label className="font-bold text-orange-300">작성자</label>
            <input
              className="border border-orange-300 px-3 py-2 rounded text-orange-100 placeholder-orange-300 bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="작성자"
              value={formAuthor}
              onChange={(e) => setFormAuthor(e.target.value)}
              required
            />
            <label className="font-bold text-orange-300">내용</label>
            <textarea
              className="border border-orange-300 px-3 py-2 rounded text-orange-100 placeholder-orange-300 bg-zinc-900 min-h-[100px] resize-y focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="내용을 입력하세요"
              value={formContent}
              onChange={(e) => setFormContent(e.target.value)}
              required
            />
            <div className="flex gap-2 mt-2">
              <button
                type="submit"
                className="bg-gradient-to-r from-orange-500 to-orange-400 text-black px-4 py-2 rounded font-bold border-2 border-orange-400 shadow hover:from-orange-600 hover:to-orange-500 transition-colors"
                disabled={formLoading}
              >
                {formLoading ? "등록 중..." : "등록"}
              </button>
              <button
                type="button"
                className="bg-gray-700 text-orange-200 px-4 py-2 rounded font-bold border-2 border-orange-300 hover:bg-orange-400 hover:text-black transition-colors"
                onClick={() => setShowForm(false)}
                disabled={formLoading}
              >
                취소
              </button>
            </div>
            {error && (
              <div className="text-orange-400 text-sm font-bold mt-2">
                {error}
              </div>
            )}
          </form>
        )}
        {/* 게시글 목록 */}
        {loading ? (
          <div className="text-center text-orange-300 py-8">불러오는 중...</div>
        ) : error ? (
          <div className="text-center text-orange-400 py-8 font-bold">
            {error}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center text-orange-200 py-8">
            게시글이 없습니다.
          </div>
        ) : (
          <ul>
            {posts.map((post) => (
              <li
                key={post.id}
                className="border-b border-orange-300 py-4 flex justify-between items-center hover:bg-orange-50/10 transition-colors"
              >
                <span className="font-bold text-orange-100 text-lg truncate max-w-[60%]">
                  {post.title}
                </span>
                <span className="text-sm text-orange-300">
                  {post.author} | {post.created_at?.slice(0, 10)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
