import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  collectionGroup,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";

import { auth, db } from "../firebase/firebase";

import { IoChatbubbleOutline } from "react-icons/io5";

export default function MyComments() {

  const navigate = useNavigate();
  const user = auth.currentUser;

  const [comments, setComments] = useState([]);

  useEffect(() => {

    if (!user) return;

    const q = query(
      collectionGroup(db, "comments"),
      where("authorId", "==", user.uid),
      orderBy("createdAt", "desc"),
      limit(30)
    );

    const unsub = onSnapshot(q, (snap) => {

      const data = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setComments(data);

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

      <div style={{ padding: "60px 20px 20px" }}>

        <div
          style={{
            fontSize: 24,
            fontWeight: 700,
          }}
        >
          내가 작성한 댓글
        </div>

      </div>

      {/* list */}

      <div style={{ padding: 20 }}>

        {comments.length === 0 && (

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: 80,
              color: "#9CA3AF",
            }}
          >

            <IoChatbubbleOutline size={48} color="#D1D5DB" />

            <div style={{ marginTop: 12 }}>
              작성한 댓글이 없습니다.
            </div>

          </div>

        )}

        {comments.map((item) => {

          const postId = item.postId || item.postRef?.id;

          return (

            <div
              key={item.id}
              onClick={() => navigate(`/community/${postId}`)}
              style={{
                background: "#fff",
                padding: 16,
                borderRadius: 14,
                marginBottom: 14,
                cursor: "pointer",
              }}
            >

              <div
                style={{
                  fontSize: 14,
                  color: "#6B7280",
                }}
              >
                {item.content}
              </div>

              <div
                style={{
                  fontSize: 12,
                  color: "#9CA3AF",
                  marginTop: 8,
                }}
              >
                {item.createdAt?.toDate
                  ? item.createdAt.toDate().toLocaleString()
                  : ""}
              </div>

            </div>

          );

        })}

      </div>

    </div>

  );

}