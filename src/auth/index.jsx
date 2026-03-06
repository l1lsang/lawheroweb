import { useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { auth, db } from "../firebase/firebase";

export default function AuthLanding() {

  const nav = useNavigate();
  const [loading, setLoading] = useState(false);

  /* 구글 로그인 */
  const handleGoogleLogin = async () => {

    if (loading) return;
    setLoading(true);

    try {

      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const uid = result.user.uid;

      const snap = await getDoc(doc(db, "app_users", uid));

      if (!snap.exists()) {
        nav("/auth/nickname");
        return;
      }

      const data = snap.data();

      if (!data?.nickname?.trim()) {
        nav("/auth/nickname");
        return;
      }

      if (!data?.phoneVerified) {
        nav("/auth/verify");
        return;
      }

      nav("/home");

    } catch (e) {
      console.log("GOOGLE LOGIN ERROR:", e);
      alert("구글 로그인 실패");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        background: "#F3F4F6",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20
      }}
    >
      <div
        style={{
          background: "white",
          width: "100%",
          maxWidth: 420,
          padding: 40,
          borderRadius: 16,
          boxShadow: "0 8px 20px rgba(0,0,0,0.06)"
        }}
      >

        <h1
          style={{
            textAlign: "center",
            fontSize: 24,
            marginBottom: 10,
            fontWeight: 700
          }}
        >
          LawHero
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#6B7280",
            marginBottom: 30
          }}
        >
          당신에게 맞는 전문가와 연결됩니다
        </p>

        <img
          src="/auth_cards.png"
          style={{
            width: "100%",
            marginBottom: 30,
            borderRadius: 12
          }}
        />

        <button
          onClick={handleGoogleLogin}
          style={{
            width: "100%",
            padding: 14,
            background: "#111827",
            color: "white",
            border: "none",
            borderRadius: 10,
            fontSize: 16,
            fontWeight: 600,
            cursor: "pointer",
            marginBottom: 12
          }}
        >
          Google로 시작하기
        </button>

        <button
          onClick={() => nav("/home")}
          style={{
            width: "100%",
            padding: 14,
            background: "#F3F4F6",
            border: "none",
            borderRadius: 10,
            fontSize: 15,
            cursor: "pointer"
          }}
        >
          나중에 가입
        </button>

        <p
          style={{
            marginTop: 20,
            textAlign: "center",
            fontSize: 13,
            color: "#9CA3AF"
          }}
        >
          로그인하면 서비스 이용약관 및 개인정보 처리방침에 동의하게 됩니다.
        </p>

      </div>
    </div>
  );
}