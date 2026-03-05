import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { doc } from "firebase/firestore";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  where
} from "firebase/firestore";
import {
  doc,
  getDoc,
  updateDoc,
  increment
} from "firebase/firestore";
import heartIcon from "../assets/heart.png";
import bobbleIcon from "../assets/bobble.png";
import lawyerImage from "../assets/lawyer.png";
import { useNavigate } from "react-router-dom";
import level1 from "../assets/1.png";
import level2 from "../assets/2.png";
import level3 from "../assets/3.png";
import level4 from "../assets/4.png";
import level5 from "../assets/5.png";

function getProfileImage(level) {
  switch (level) {
    case 1:
      return level1;
    case 2:
      return level2;
    case 3:
      return level3;
    case 4:
      return level4;
    case 5:
      return level5;
    default:
      return null;
  }
}
const MAIN_TABS = [
  { key: "experience", label: "경험" },
  { key: "expert", label: "전문가" },
  { key: "info", label: "정보" },
];

export default function Community() {
  const navigate = useNavigate();
const [authorLevels, setAuthorLevels] = useState({});
  const [mainTab, setMainTab] = useState("experience");
  const [posts, setPosts] = useState([]);
useEffect(() => {

  if (posts.length === 0) return;

  const unsubscribers = posts
    .filter((p) => p.uid)
    .map((p) => {

      const ref = doc(db, "app_users", p.uid);

      return onSnapshot(ref, (snap) => {

        if (snap.exists()) {

          const level = snap.data().profileLevel ?? 0;

          setAuthorLevels((prev) => ({
            ...prev,
            [p.uid]: level,
          }));

        }

      });

    });

  return () => unsubscribers.forEach((unsub) => unsub());

}, [posts]);
 useEffect(() => {

  const base = collection(db, "community_posts");

  const q = query(
    base,
    where("category", "==", mainTab),
    orderBy("createdAt", "desc"),
    limit(50)
  );

  const unsub = onSnapshot(q, (snap) => {

    const list = snap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setPosts(list);

  });

  return () => unsub();

}, [mainTab]);
  return (
    <div className="container">

  {/* 제목 */}
  <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 20 }}>
    커뮤니티
  </h1>

  {/* 탭 */}
  <div
    style={{
      display: "flex",
      gap: 20,
      marginBottom: 30,
    }}
  >
    {MAIN_TABS.map((tab) => (
      <div
        key={tab.key}
        onClick={() => setMainTab(tab.key)}
        style={{
          fontWeight: 700,
          fontSize: 18,
          cursor: "pointer",
          color: mainTab === tab.key ? "#111827" : "#9CA3AF",
        }}
      >
        {tab.label}
      </div>
    ))}
  </div>

  {/* 글 목록 */}
  <div>

    {posts.map((post) => (

  <div
    key={post.id}
    onClick={() => navigate(`/community/${post.id}`)}
    style={{
      padding: "18px 0",
      borderBottom: "1px solid #E5E7EB",
      cursor: "pointer"
    }}
  >

    {/* 유저 정보 */}
    <div
      style={{
        display: "flex",
        alignItems: "center",
        marginBottom: 10
      }}
    >

      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          overflow: "hidden",
          background: "#F3F4F6",
          marginRight: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >

        {authorLevels[post.uid] > 0 ? (
          <img
            src={getProfileImage(authorLevels[post.uid])}
            style={{ width: 36, height: 36 }}
          />
        ) : (
          <span style={{ color: "#9CA3AF" }}>👤</span>
        )}

      </div>

      <div>

        <div style={{ fontWeight: 700 }}>
          {post.nickname || "유저"}
        </div>

        <div
          style={{
            fontSize: 12,
            color: "#9CA3AF"
          }}
        >
          {post.createdAt?.toDate?.().toLocaleString?.()}
        </div>

      </div>

    </div>

    {/* 제목 */}
    <div
      style={{
        display: "flex",
        alignItems: "center",
        marginBottom: 6
      }}
    >

      {post.likeCount >= 10 && (
        <img
          src={fireIcon}
          style={{
            width: 16,
            height: 16,
            marginRight: 6
          }}
        />
      )}

      <h3
        style={{
          fontSize: 18,
          fontWeight: 800,
          margin: 0
        }}
      >
        {post.title}
      </h3>

    </div>

    {/* 내용 */}
    <p
      style={{
        color: "#374151",
        marginBottom: 10
      }}
    >
      {post.content?.slice(0, 120)}...
    </p>

    {/* 태그 */}
    {post.subCategory && (
      <span
        style={{
          background: "#EEF2FF",
          padding: "4px 10px",
          borderRadius: 6,
          fontSize: 12,
          fontWeight: 600,
          color: "#4F46E5"
        }}
      >
        {post.subCategory}
      </span>
    )}

    {/* 좋아요 / 댓글 */}
    <div
      style={{
        display: "flex",
        gap: 16,
        marginTop: 8
      }}
    >

      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={heartIcon}
          style={{
            width: 14,
            height: 14,
            marginRight: 4
          }}
        />
        <span>{post.likeCount || 0}</span>
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={bobbleIcon}
          style={{
            width: 14,
            height: 14,
            marginRight: 4
          }}
        />
        <span>{post.commentCount || 0}</span>
      </div>

    </div>

  </div>

))}
  </div>

</div>
  );
}