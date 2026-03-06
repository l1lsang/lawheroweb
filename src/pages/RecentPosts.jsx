import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  collection,
  onSnapshot,
  orderBy,
  query
} from "firebase/firestore";

import { auth, db } from "../firebase/firebase";

export default function RecentPosts() {

  const navigate = useNavigate();
  const user = auth.currentUser;

  const [posts, setPosts] = useState([]);

  useEffect(() => {

    if (!user) return;

    const q = query(
      collection(db, "app_users", user.uid, "recentPosts"),
      orderBy("viewedAt", "desc")
    );

    const unsub = onSnapshot(q, (snap) => {

      const list = snap.docs.map((d) => ({
        id: d.id,
        ...d.data()
      }));

      setPosts(list);

    });

    return () => unsub();

  }, [user]);

  return (

    <div
      style={{
        maxWidth: 720,
        margin: "0 auto",
        background: "#F9FAFB",
        minHeight: "100vh"
      }}
    >

      <div style={{ padding: "60px 20px 20px" }}>

        <div
          style={{
            fontSize: 22,
            fontWeight: 800,
            marginBottom: 20
          }}
        >
          최근 본 글
        </div>

        {posts.length === 0 ? (

          <div
            style={{
              marginTop: 80,
              textAlign: "center",
              color: "#9CA3AF"
            }}
          >
            최근 본 글이 없습니다.
          </div>

        ) : (

          posts.map((post) => (

            <div
              key={post.id}
              onClick={() => navigate(`/community/${post.id}`)}
              style={{
                padding: "16px 0",
                borderBottom: "1px solid #E5E7EB",
                cursor: "pointer"
              }}
            >

              <div
                style={{
                  fontWeight: 700,
                  fontSize: 16
                }}
              >
                {post.title}
              </div>

              <div
                style={{
                  color: "#6B7280",
                  marginTop: 4,
                  fontSize: 14
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