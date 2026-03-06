import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  increment,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";
import { auth, db } from "../firebase/firebase";
import {
  IoChevronDown,
  IoClose,
  IoImageOutline,
} from "react-icons/io5";

const EXPERIENCE_TYPES = ["고민", "후기", "상담 후기", "일상"];
const storage = getStorage();

function calculateLevel(postCount = 0, commentCount = 0) {
  if (postCount >= 500 && commentCount >= 1000) return 5;
  if (postCount >= 300 && commentCount >= 500) return 4;
  if (postCount >= 100 && commentCount >= 100) return 3;
  if (postCount >= 30 && commentCount >= 30) return 2;
  if (postCount >= 1 && commentCount >= 1) return 1;
  return 0;
}

export default function WritePost() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const inputRef = useRef(null);

  const initialCategory = searchParams.get("category") || "experience";
  const initialSubCategory = searchParams.get("subCategory") || "고민";

  const [selectedType, setSelectedType] = useState(initialSubCategory);
  const [showTypeMenu, setShowTypeMenu] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [nickname, setNickname] = useState("");
  const [loading, setLoading] = useState(false);

  const maxLength = 1000;

  const isValid = useMemo(() => {
    return title.trim().length > 0 && content.trim().length > 0;
  }, [title, content]);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(async (user) => {
      if (!user) return;

      const snap = await getDoc(doc(db, "app_users", user.uid));
      if (snap.exists()) {
        setNickname(snap.data().nickname || "유저");
      }
    });

    return unsub;
  }, []);

  const handlePickImages = (e) => {
    const files = Array.from(e.target.files || []);

    if (files.length === 0) return;

    const mapped = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      id: `${file.name}-${file.size}-${Date.now()}-${Math.random()}`,
    }));

    setImages((prev) => [...prev, ...mapped]);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const removeImage = (id) => {
    setImages((prev) => {
      const target = prev.find((img) => img.id === id);
      if (target?.preview) URL.revokeObjectURL(target.preview);
      return prev.filter((img) => img.id !== id);
    });
  };

  useEffect(() => {
    return () => {
      images.forEach((img) => {
        if (img.preview) URL.revokeObjectURL(img.preview);
      });
    };
  }, [images]);

  const uploadImageAsync = async (file) => {
    const filename = `community/${Date.now()}_${Math.random()}_${file.name}`;
    const storageRef = ref(storage, filename);

    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  const handleSubmit = async () => {
    const user = auth.currentUser;
    if (!user || loading) return;

    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    try {
      setLoading(true);

      let uploadedUrls = [];

      if (images.length > 0) {
        uploadedUrls = await Promise.all(
          images.map((item) => uploadImageAsync(item.file))
        );
      }

      const postData = {
        category: initialCategory,
        uid: user.uid,
        authorId: user.uid,
        nickname: nickname?.trim() ? nickname : "유저",
        subCategory: selectedType,
        title: title.trim(),
        content: content.trim(),
        createdAt: serverTimestamp(),
        likeCount: 0,
        commentCount: 0,
      };

      if (uploadedUrls.length > 0) {
        postData.imageUrls = uploadedUrls;
      }

      await addDoc(collection(db, "community_posts"), postData);

      await updateDoc(doc(db, "app_users", user.uid), {
        postCount: increment(1),
      });

      const updatedSnap = await getDoc(doc(db, "app_users", user.uid));
      const data = updatedSnap.data() || {};

      const newLevel = calculateLevel(
        data.postCount || 0,
        data.commentCount || 0
      );

      if ((data.profileLevel || 0) < newLevel) {
        await updateDoc(doc(db, "app_users", user.uid), {
          profileLevel: newLevel,
        });
        alert("🎉 레벨 업! 프로필이 업그레이드 되었습니다!");
      } else {
        alert("등록 완료");
      }

      navigate("/community");
    } catch (err) {
      console.log(err);
      alert("글 작성 중 문제가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F9FAFB",
      }}
    >
      <div
        style={{
          maxWidth: 760,
          margin: "0 auto",
          minHeight: "100vh",
          background: "#F9FAFB",
        }}
      >
        {/* 헤더 */}
        <div
          style={{
            position: "sticky",
            top: 0,
            zIndex: 20,
            background: "#F9FAFB",
            borderBottom: "1px solid #EEF2F7",
            padding: "18px 20px 14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <button
            onClick={() => navigate(-1)}
            style={iconBtn}
            aria-label="닫기"
          >
            <IoClose size={24} color="#111827" />
          </button>

          <div
            style={{
              fontSize: 18,
              fontWeight: 800,
              color: "#111827",
            }}
          >
            경험 글쓰기
          </div>

          <div style={{ width: 40 }} />
        </div>

        {/* 본문 */}
        <div
          style={{
            padding: "20px 20px 96px",
          }}
        >
          {/* 카테고리 */}
          <div style={{ marginBottom: 24 }}>
            <div
              style={{
                fontWeight: 800,
                fontSize: 15,
                color: "#111827",
                marginBottom: 10,
              }}
            >
              카테고리
            </div>

            <div style={{ position: "relative" }}>
              <button
                onClick={() => setShowTypeMenu((prev) => !prev)}
                style={{
                  width: "100%",
                  padding: "14px 0",
                  border: "none",
                  borderBottom: "1px solid #E5E7EB",
                  background: "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: "pointer",
                }}
              >
                <span
                  style={{
                    fontSize: 16,
                    color: "#111827",
                  }}
                >
                  {selectedType}
                </span>

                <IoChevronDown size={20} color="#6B7280" />
              </button>

              {showTypeMenu && (
                <div
                  style={{
                    position: "absolute",
                    top: "calc(100% + 8px)",
                    left: 0,
                    width: 220,
                    background: "white",
                    borderRadius: 16,
                    boxShadow: "0 12px 30px rgba(0,0,0,0.10)",
                    border: "1px solid #E5E7EB",
                    overflow: "hidden",
                    zIndex: 30,
                  }}
                >
                  {EXPERIENCE_TYPES.map((item) => (
                    <button
                      key={item}
                      onClick={() => {
                        setSelectedType(item);
                        setShowTypeMenu(false);
                      }}
                      style={{
                        width: "100%",
                        textAlign: "left",
                        background: "white",
                        border: "none",
                        padding: "14px 18px",
                        cursor: "pointer",
                        fontSize: 15,
                        fontWeight: selectedType === item ? 800 : 500,
                        color: "#111827",
                      }}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 제목 */}
          <input
            placeholder="제목을 입력해 주세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              width: "100%",
              border: "none",
              outline: "none",
              background: "transparent",
              fontSize: 22,
              fontWeight: 800,
              color: "#111827",
              marginBottom: 18,
            }}
          />

          {/* 본문 */}
          <textarea
            placeholder="자신의 경험을 자유롭게 작성해주세요."
            value={content}
            onChange={(e) => setContent(e.target.value.slice(0, maxLength))}
            style={{
              width: "100%",
              minHeight: 240,
              border: "none",
              outline: "none",
              resize: "vertical",
              background: "transparent",
              fontSize: 15,
              lineHeight: 1.6,
              color: "#111827",
            }}
          />

          {/* 글자 수 */}
          <div
            style={{
              textAlign: "right",
              color: "#9CA3AF",
              marginTop: 10,
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            {content.length}/{maxLength}
          </div>

          {/* 사진 추가 */}
          <div style={{ marginTop: 20 }}>
            <input
              ref={inputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handlePickImages}
              style={{ display: "none" }}
            />

            <button
              onClick={() => inputRef.current?.click()}
              style={{
                border: "none",
                background: "transparent",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                padding: 0,
              }}
            >
              <IoImageOutline size={22} color="#111827" />
              <span
                style={{
                  marginLeft: 8,
                  color: "#6B7280",
                  fontWeight: 600,
                  fontSize: 14,
                }}
              >
                사진 추가 ({images.length})
              </span>
            </button>
          </div>

          {/* 이미지 미리보기 */}
          {images.length > 0 && (
            <div
              style={{
                display: "flex",
                gap: 10,
                overflowX: "auto",
                marginTop: 16,
                paddingBottom: 4,
              }}
            >
              {images.map((item) => (
                <div
                  key={item.id}
                  style={{
                    position: "relative",
                    flex: "0 0 auto",
                  }}
                >
                  <img
                    src={item.preview}
                    alt="preview"
                    style={{
                      width: 120,
                      height: 120,
                      borderRadius: 12,
                      objectFit: "cover",
                      display: "block",
                    }}
                  />

                  <button
                    onClick={() => removeImage(item.id)}
                    style={{
                      position: "absolute",
                      top: 6,
                      right: 6,
                      width: 24,
                      height: 24,
                      borderRadius: 12,
                      border: "none",
                      background: "rgba(0,0,0,0.65)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                    aria-label="이미지 삭제"
                  >
                    <IoClose size={14} color="white" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 하단 버튼 */}
        <div
          style={{
            position: "sticky",
            bottom: 0,
            background: "#F9FAFB",
            padding: "12px 20px 20px",
            borderTop: "1px solid #EEF2F7",
          }}
        >
          <button
            onClick={handleSubmit}
            disabled={!isValid || loading}
            style={{
              width: "100%",
              border: "none",
              borderRadius: 14,
              padding: "16px 18px",
              fontWeight: 800,
              fontSize: 16,
              cursor: !isValid || loading ? "not-allowed" : "pointer",
              background: isValid ? "#5B6BE8" : "#E5E7EB",
              color: isValid ? "white" : "#9CA3AF",
            }}
          >
            {loading ? "등록 중..." : "남기기"}
          </button>
        </div>
      </div>
    </div>
  );
}

const iconBtn = {
  width: 40,
  height: 40,
  borderRadius: 20,
  border: "none",
  background: "transparent",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
};