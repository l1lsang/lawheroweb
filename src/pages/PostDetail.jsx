import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { db } from "../firebase/firebase";

import {
  doc,
  getDoc,
  updateDoc,
  increment
} from "firebase/firestore";

export default function PostDetail() {

  const { id } = useParams();

  const [post, setPost] = useState(null);

  useEffect(() => {

    async function loadPost() {

      const ref = doc(db, "community_posts", id);

      const snap = await getDoc(ref);

      if (snap.exists()) {

        setPost({ id: snap.id, ...snap.data() });

        // 🔥 조회수 증가
        await updateDoc(ref, {
          viewCount: increment(1)
        });

      }

    }

    loadPost();

  }, [id]);

  if (!post) return <div className="container">Loading...</div>;

  return (
    <div className="container">

      {/* 제목 */}
      <div style={{
        display: "flex",
        alignItems: "center",
        marginBottom: 10
      }}>

        {post.likeCount >= 10 && (
          <span style={{
            background: "#FEE2E2",
            color: "#EF4444",
            fontWeight: 700,
            fontSize: 12,
            padding: "3px 6px",
            borderRadius: 4,
            marginRight: 6
          }}>
            🔥 인기
          </span>
        )}

        <h1 style={{ margin: 0 }}>
          {post.title}
        </h1>

      </div>

      {/* 작성자 */}
      <div style={{
        color: "#6B7280",
        marginBottom: 20
      }}>
        {post.nickname || "작성자"}
      </div>

      {/* 내용 */}
      <p style={{
        fontSize: 16,
        lineHeight: 1.6,
        whiteSpace: "pre-line"
      }}>
        {post.content}
      </p>

      {/* 좋아요 / 댓글 / 조회수 */}
      <div style={{
        marginTop: 30,
        color: "#6B7280"
      }}>
        ❤️ {post.likeCount || 0}
        {" · "}
        💬 {post.commentCount || 0}
        {" · "}
        👁 {post.viewCount || 0}
      </div>

      <hr style={{ margin: "40px 0" }} />

      {/* 앱 설치 유도 */}
      <div style={{
        textAlign: "center"
      }}>

        <h3>더 많은 상담은 LawHero 앱에서</h3>

        <a href="/install">
          <button style={{
            marginTop: 10,
            padding: "12px 20px",
            fontSize: 16,
            borderRadius: 10,
            border: "none",
            background: "#111827",
            color: "white",
            cursor: "pointer"
          }}>
            LawHero 앱 설치
          </button>
        </a>

      </div>

    </div>
  );

}