'use client';
import { useState } from 'react';
import LoginModal from "@/components/LoginModal";

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
    <header className="w-full h-16 flex items-center justify-between px-6 shadow-sm fixed top-0 bg-white z-5">
      <div className="text-1xl font-bold text-black">velog</div>
      <div />
      <div className="flex items-center gap-4">
        <button className="bg-black text-white px-4 py-1 rounded-full"
          onClick={() => setShowModal(true)}>
          로그인
        </button>
      </div>
    </header>
    {showModal && <LoginModal onClose={() => setShowModal(false)} />}
    </>
  );
}
