import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";

import { auth, db } from "../firebase/firebase";

import {
  IoHeartOutline,
  IoChatbubbleOutline,
  IoDocumentTextOutline,
} from "react-icons/io5";

export default function MyPosts() {

  const navigate = useNavigate();
  const user = auth.currentUser;

  const [posts, setPosts] = useState([]);

  useEffect(() => {

    if (!user) return;

    const q = query(
      collection(db, "community_posts"),
      where("uid", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(q, (snap) => {

      const data = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPosts(data);

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

      {/* header */}

      <div
        style={{
          padding: "60px 20px 10px",
        }}
      >

        <div
          style={{
            fontSize: 24,
            fontWeight: 700,
          }}
        >
          내가 작성한 글
        </div>

      </div>

      {/* list */}

      <div style={{ padding: "0 20px 40px" }}>

        {posts.length === 0 && (

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: 80,
              color: "#9CA3AF",
            }}
          >

            <IoDocumentTextOutline size={48} color="#D1D5DB" />

            <div style={{ marginTop: 12 }}>
              아직 작성한 글이 없습니다.
            </div>

          </div>

        )}

        {posts.map((item) => (

          <div
            key={item.id}
            onClick={() => navigate(`/community/${item.id}`)}
            style={{
              background: "#fff",
              padding: 16,
              borderRadius: 14,
              marginBottom: 14,
              cursor: "pointer",
            }}
          >

            {/* title */}

            <div
              style={{
                fontSize: 16,
                fontWeight: 600,
                marginBottom: 6,
              }}
            >
              {item.title}
            </div>

            {/* content */}

            <div
              style={{
                color: "#6B7280",
                fontSize: 14,
                marginBottom: 10,
              }}
            >
              {item.content}
            </div>

            {/* bottom */}

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >

                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <IoHeartOutline size={16} color="#9CA3AF" />
                  <div style={{ fontSize: 12, color: "#9CA3AF" }}>
                    {item.likeCount || 0}
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <IoChatbubbleOutline size={16} color="#9CA3AF" />
                  <div style={{ fontSize: 12, color: "#9CA3AF" }}>
                    {item.commentCount || 0}
                  </div>
                </div>

              </div>

              <div
                style={{
                  fontSize: 12,
                  color: "#9CA3AF",
                }}
              >
                {item.createdAt?.toDate
                  ? item.createdAt.toDate().toLocaleDateString()
                  : ""}
              </div>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}