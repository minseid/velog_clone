"use client";
import { useState } from "react";

export default function UserAddPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    userId: "",
    introduction: "",
    agree: false,
  });
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const error = () =>{
    console.log("submitted:", submitted, "name:", form.name, "userId:", form.userId);
    if(!form.name.trim()) return <p>프로필 이름을 입력해주세요.</p>
    if(!form.userId.trim()) return <p>사용자 ID를 입력해주세요.</p>
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if(!form.name.trim() || !form.userId.trim()){
        setMessage("");
        return;
    }

    if (!form.agree) {
      setMessage("이용약관에 동의해야 합니다.");
      return;
    }
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        id: form.userId,
        introduction: form.introduction,
      }),
    });
    const data = await res.json();
    setMessage(data.message);
  };
  return (
    <div className="min-h-screen flex items-start justify-start bg-white text-black">
      <div className="p-0  mt-3 ml-5">
        <h1 className="text-5xl font-bold mb-2 text-left text-black">환영합니다!</h1>
        <div className="text-gray-600 mb-15 text-left">기본 회원 정보를 등록해주세요.</div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">프로필 이름</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="프로필 이름을 입력하세요"
              className="w-full px-1 py-2 border-0 border-b border-gray-300 focus:border-teal-500 focus:ring-0 bg-transparent text-2xl"
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">이메일</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="이메일을 입력하세요"
              className="w-full px-1 py-2 border-0 border-b border-gray-300 focus:border-teal-500 focus:ring-0 bg-transparent text-2xl"
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">사용자 ID</label>
            <input
              type="text"
              name="userId"
              value={form.userId}
              onChange={handleChange}
              placeholder="사용자 ID를 입력하세요."
              className="w-full px-1 py-2 border-0 border-b border-gray-300 focus:border-teal-500 focus:ring-0 bg-transparent text-2xl"
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">한 줄 소개</label>
            <textarea
              name="introduction"
              value={form.introduction}
              onChange={handleChange}
              placeholder="당신을 한 줄로 소개해보세요"
              className="w-full px-1 py-2 border-0 border-b border-gray-300 focus:border-teal-500 focus:ring-0 bg-transparent text-2xl resize-none"
              rows={1}
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="agree"
              checked={form.agree}
              onChange={handleChange}
              className="mr-2 accent-teal-500"
            />
            <span>
              <span className="text-teal-600 font-medium">이용약관</span>과 <span className="text-teal-600 font-medium">개인정보취급방침</span>에 동의합니다.
            </span>
        </div>
        {/* 가입버튼 클릭하면 에러문구 or DB전송 */}
            {submitted  && error()} 
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              className="flex-1 py-- bg-gray-200 text-gray-700 text-2xl rounded-full font-semibold hover:bg-gray-300 transition"
              onClick={() => window.history.back()}
            >
              취소
            </button>
            <button
              type="submit"
              className="flex-1 py-2 bg-teal-500 text-white text-2xl rounded-full font-semibold hover:bg-teal-600 transition"
            >
              가입
            </button>
            
          </div>
        </form>
      </div>
    </div>
  );
}
