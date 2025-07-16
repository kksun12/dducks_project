"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabaseClient";

interface Post {
  id: number;
  title: string;
  author: string;
  date: string;
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
      .select("id, title, author, date")
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
    const today = new Date();
    const dateStr = today.toISOString().slice(0, 10);
    const { error } = await supabase.from("posts").insert([
      {
        title: formTitle,
        author: formAuthor,
        content: formContent,
        date: dateStr,
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
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">게시판</h1>
          <div className="flex gap-2">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700"
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
            className="mb-6 p-4 border rounded bg-gray-50 flex flex-col gap-3"
          >
            <label className="font-bold text-gray-900">제목</label>
            <input
              className="border px-3 py-2 rounded text-gray-900 placeholder-gray-500 bg-white"
              placeholder="제목"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              required
            />
            <label className="font-bold text-gray-900">작성자</label>
            <input
              className="border px-3 py-2 rounded text-gray-900 placeholder-gray-500 bg-white"
              placeholder="작성자"
              value={formAuthor}
              onChange={(e) => setFormAuthor(e.target.value)}
              required
            />
            <label className="font-bold text-gray-900">내용</label>
            <textarea
              className="border px-3 py-2 rounded text-gray-900 placeholder-gray-500 bg-white min-h-[100px] resize-y"
              placeholder="내용을 입력하세요"
              value={formContent}
              onChange={(e) => setFormContent(e.target.value)}
              required
            />
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-blue-700 text-white px-4 py-2 rounded font-bold hover:bg-blue-800"
                disabled={formLoading}
              >
                {formLoading ? "등록 중..." : "등록"}
              </button>
              <button
                type="button"
                className="bg-gray-400 text-white px-4 py-2 rounded font-bold hover:bg-gray-500"
                onClick={() => setShowForm(false)}
                disabled={formLoading}
              >
                취소
              </button>
            </div>
            {error && (
              <div className="text-red-600 text-sm font-bold">{error}</div>
            )}
          </form>
        )}
        {/* 게시글 목록 */}
        {loading ? (
          <div className="text-center text-gray-500 py-8">불러오는 중...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-8">{error}</div>
        ) : posts.length === 0 ? (
          <div className="text-center text-gray-400 py-8">
            게시글이 없습니다.
          </div>
        ) : (
          <ul>
            {posts.map((post) => (
              <li
                key={post.id}
                className="border-b border-gray-200 py-4 flex justify-between items-center"
              >
                <span className="font-medium text-gray-800">{post.title}</span>
                <span className="text-sm text-gray-500">
                  {post.author} | {post.date}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
