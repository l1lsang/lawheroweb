import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

import { auth, db } from "../firebase/firebase";

export default function LikedPosts() {

  const navigate = useNavigate();
  const user = auth.currentUser;

  const [posts, setPosts] = useState([]);

  useEffect(() => {

    if (!user) return;

    const q = query(
      collection(db, "app_users", user.uid, "likedPosts"),
      orderBy("likedAt", "desc")
    );

    const unsub = onSnapshot(q, async (snap) => {

      const ids = snap.docs.map((d) => d.id);

      // 실제 community_posts 가져오기
      const fullPosts = await Promise.all(

        ids.map(async (id) => {

          const ref = doc(db, "community_posts", id);
          const postSnap = await getDoc(ref);

          if (postSnap.exists()) {
            return {
              id: postSnap.id,
              ...postSnap.data(),
            };
          }

          return null;

        })

      );

      setPosts(fullPosts.filter(Boolean));

    });

    return () => unsub();

  }, [user]);

  return (

    <div
      style={{
        maxWidth: 720,
        margin: "0 auto",
        background: "#F9FAFB",
        minHeight: "100vh",
      }}
    >

      <div style={{ padding: 20, paddingTop: 60 }}>

        <div
          style={{
            fontSize: 22,
            fontWeight: 800,
            marginBottom: 20,
          }}
        >
          관심글
        </div>

        {posts.length === 0 ? (

          <div
            style={{
              marginTop: 80,
              textAlign: "center",
              color: "#9CA3AF",
            }}
          >
            좋아요한 글이 없습니다.
          </div>

        ) : (

          posts.map((post) => (

            <div
              key={post.id}
              onClick={() => navigate(`/community/${post.id}`)}
              style={{
                padding: "16px 0",
                borderBottom: "1px solid #E5E7EB",
                cursor: "pointer",
              }}
            >

              <div
                style={{
                  fontWeight: 700,
                  fontSize: 16,
                }}
              >
                {post.title}
              </div>

              <div
                style={{
                  color: "#6B7280",
                  marginTop: 4,
                  fontSize: 14,
                }}
              >
                {post.content}
              </div>

            </div>

          ))

        )}

      </div>

    </div>

  );

}