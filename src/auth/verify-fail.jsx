import { useNavigate } from "react-router-dom";

export default function VerifyFail() {

  const nav = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >

      <h1
        style={{
          fontSize: 20,
          fontWeight: "bold",
        }}
      >
        ❌ 본인 인증 실패
      </h1>

      <button
        onClick={() => nav("/")}
        style={{
          marginTop: 20,
          backgroundColor: "#3B4CCA",
          padding: "15px 24px",
          borderRadius: 10,
          border: "none",
          color: "white",
          cursor: "pointer",
          fontSize: 16,
        }}
      >
        홈으로 이동
      </button>

    </div>
  );
}