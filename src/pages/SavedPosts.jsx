import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  collection,
  doc,
  getDoc,
  onSnapshot
} from "firebase/firestore";

import { auth, db } from "../firebase/firebase";

import {
  IoHeartOutline,
  IoChatbubbleOutline,
  IoBookmarkOutline
} from "react-icons/io5";

export default function SavedPosts() {

  const navigate = useNavigate();
  const user = auth.currentUser;

  const [posts, setPosts] = useState([]);

  useEffect(() => {

    if (!user) return;

    const savedRef = collection(
      db,
      "app_users",
      user.uid,
      "savedPosts"
    );

    const unsub = onSnapshot(savedRef, async (snap) => {

      const postList = [];

      for (const d of snap.docs) {

        const postId = d.id;

        const postSnap = await getDoc(
          doc(db, "community_posts", postId)
        );

        if (postSnap.exists()) {

          postList.push({
            id: postSnap.id,
            ...postSnap.data(),
          });

        }

      }

      setPosts(postList);

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

      {/* header */}

      <div style={{ padding: "60px 20px 10px" }}>

        <div
          style={{
            fontSize: 24,
            fontWeight: 700
          }}
        >
          저장한 글
        </div>

      </div>

      {/* list */}

      <div style={{ padding: 20 }}>

        {posts.length === 0 && (

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: 80,
              color: "#9CA3AF"
            }}
          >

            <IoBookmarkOutline size={48} color="#D1D5DB" />

            <div style={{ marginTop: 12 }}>
              저장한 글이 없습니다.
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
              cursor: "pointer"
            }}
          >

            {/* title */}

            <div
              style={{
                fontSize: 16,
                fontWeight: 600
              }}
            >
              {item.title}
            </div>

            {/* content */}

            <div
              style={{
                color: "#6B7280",
                marginTop: 6,
                fontSize: 14
              }}
            >
              {item.content}
            </div>

            {/* bottom */}

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 10
              }}
            >

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12
                }}
              >

                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <IoHeartOutline size={16} color="#9CA3AF" />
                  <div style={{ fontSize: 12 }}>
                    {item.likesCount || 0}
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <IoChatbubbleOutline size={16} color="#9CA3AF" />
                  <div style={{ fontSize: 12 }}>
                    {item.commentCount || 0}
                  </div>
                </div>

              </div>

              <div
                style={{
                  fontSize: 12,
                  color: "#9CA3AF"
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