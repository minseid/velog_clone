import React, { useState } from "react";

interface LoginModalProps {
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(mode === 'login' ? '/api/signin' : '/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const text = await res.text();
        setError(text || '서버 오류');
      } else {
        // 성공 처리 (예: 모달 닫기, 알림 등)
        onClose();
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message || '네트워크 오류');
      } else {
        setError('네트워크 오류');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0  bg-opacity-80 flex items-center justify-center z-10">
      <div
        className="bg-white flex flex-col sm:flex-row w-full h-full rounded-none sm:w-[600px] sm:h-[400px] sm:rounded-lg overflow-hidden relative"
      >
        {/* 닫기 버튼 */}
        <button
          className="absolute top-3 right-2 text-gray-500 text-4xl z-20"
          onClick={onClose}
          aria-label="닫기"
        >
          ×
        </button>
        {/* 왼쪽: 환영 일러스트 및 텍스트 */}
        <div className="hidden sm:flex flex-col items-center justify-center w-1/3 bg-gray-200">
          <img src="/video-from-rawpixel-id-17028946-gif.gif" alt="welcome" className="w-70 h-32 mb-4" />
          <div className="text-2xl font-bold text-gray-800">환영합니다!</div>
        </div>
        {/* 오른쪽: 로그인/회원가입 폼 */}
        <div className="flex flex-1 flex-col justify-start px-8 py-6 sm:w-1/2">
          <div className="text-2xl font-bold mb-5 sm:mb-8 text-black pt-15">{mode === 'login' ? '로그인' : '회원가입'}</div>
          {mode === 'login' ? (
            <form onSubmit={handleSubmit}>
              <div className="text-sm text-gray-700 mb-2">이메일로 로그인</div>
              <div className="flex mb-4 text-black">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="이메일을 입력하세요."
                  className="flex-1 border border-gray-300  px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                  required
                />
                <button type="submit" className="bg-green-500 text-white px-6 py-2  font-semibold" disabled={loading}>
                  {loading ? '로딩...' : '로그인'}
                </button>
              </div>
              {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
            </form>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="text-sm text-gray-700 mb-2">이메일로 회원가입</div>
              <div className="flex mb-4 text-black">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="이메일을 입력하세요."
                  className="flex-1 border border-gray-300 rounded-l px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                  required
                />
                <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded-r font-semibold" disabled={loading}>
                  {loading ? '로딩...' : '회원가입'}
                </button>
              </div>
              {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
            </form>
          )}
          <div className="text-20px text-gray-500 mb-2 mt- font-medium">소셜 계정으로 {mode === 'login' ? '로그인' : '회원가입'}</div>
          <div className="flex gap-20 mb-6 mt-4 justify-center">
            <button className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100">
              <img src="/icons8-github의.svg" alt="github" width={32} height={32} />
            </button>
            <button className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100">
              <img src="/google_logo.svg" alt="google" width={32} height={32} />
            </button>
            <button className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100">
              <img src="/facebook_logo.svg" alt="facebook" width={32} height={32} />
            </button>
          </div>
          <div className="text-right text-green-500 text-sm mt-auto mt-100">
            {mode === 'login' ? (
              <>아직 회원이 아니신가요? <button type="button" className="font-bold hover:underline" onClick={() => setMode('register')}>회원가입</button></>
            ) : (
              <>이미 회원이신가요? <button type="button" className="font-bold hover:underline" onClick={() => setMode('login')}>로그인</button></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;