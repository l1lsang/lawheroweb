import { BrowserRouter, Routes, Route } from "react-router-dom";

/* 메인 */
import Home from "../pages/Home";
import TabHome from "../pages/TabHome";
/* 커뮤니티 */
import Community from "../pages/Community";
import PostDetail from "../pages/CommunityDetail";
import WritePost from "../pages/WritePost";

/* 커뮤니티 활동 */
import SavedPosts from "../pages/SavedPosts";
import RecentPosts from "../pages/RecentPosts";
import LikedPosts from "../pages/LikedPosts";

/* 마이페이지 */
import MyPage from "../pages/mypage";
import MyPosts from "../pages/MyPosts";
import MyComments from "../pages/MyComments";

/* 상담 */
import GeneralConsult from "../pages/GeneralConsult";
import QuickStart from "../pages/QuickStart";
import WaitingScreen from "../pages/WaitingScreen";

/* 채팅 */
import ChatList from "../pages/ChatList";
import ChatRoom from "../pages/chat";

/* 기타 */
import Install from "../pages/Install";

/* 인증 */
import AuthLanding from "../auth";
import Nickname from "../auth/signup";
import PhoneInfo from "../auth/phone-info";
import VerifyScreen from "../auth/verify";

/* 인증 가드 */
import AuthGuard from "../components/AuthGuard";

export default function Router() {
  return (
    <BrowserRouter>

      <Routes>

        {/* ================= 메인 ================= */}

        <Route path="/" element={<Home />} />
        <Route path="/home" element={<TabHome/>} />

        {/* ================= 커뮤니티 ================= */}

        <Route
          path="/community"
          element={
            <AuthGuard>
              <Community />
            </AuthGuard>
          }
        />

        <Route
          path="/community/:id"
          element={
            <AuthGuard>
              <PostDetail />
            </AuthGuard>
          }
        />

        <Route
          path="/community/write"
          element={
            <AuthGuard>
              <WritePost />
            </AuthGuard>
          }
        />

        <Route
          path="/community/saved"
          element={
            <AuthGuard>
              <SavedPosts />
            </AuthGuard>
          }
        />

        <Route
          path="/community/recent"
          element={
            <AuthGuard>
              <RecentPosts />
            </AuthGuard>
          }
        />

        <Route
          path="/community/likes"
          element={
            <AuthGuard>
              <LikedPosts />
            </AuthGuard>
          }
        />

        {/* ================= 마이페이지 ================= */}

        <Route
          path="/mypage"
          element={
            <AuthGuard>
              <MyPage />
            </AuthGuard>
          }
        />

        <Route
          path="/mypage/posts"
          element={
            <AuthGuard>
              <MyPosts />
            </AuthGuard>
          }
        />

        <Route
          path="/mypage/comments"
          element={
            <AuthGuard>
              <MyComments />
            </AuthGuard>
          }
        />

        {/* ================= 상담 ================= */}

        <Route
          path="/consult/general"
          element={
            <AuthGuard>
              <GeneralConsult />
            </AuthGuard>
          }
        />

        <Route
          path="/consult/quick"
          element={
            <AuthGuard>
              <QuickStart />
            </AuthGuard>
          }
        />

        <Route
          path="/waiting"
          element={
            <AuthGuard>
              <WaitingScreen />
            </AuthGuard>
          }
        />

        {/* ================= 채팅 ================= */}

        <Route
          path="/chat"
          element={
            <AuthGuard>
              <ChatList />
            </AuthGuard>
          }
        />

        <Route
          path="/chat/:id"
          element={
            <AuthGuard>
              <ChatRoom />
            </AuthGuard>
          }
        />

        {/* ================= 기타 ================= */}

        <Route path="/install" element={<Install />} />

        {/* ================= 인증 ================= */}

        <Route path="/auth" element={<AuthLanding />} />
        <Route path="/auth/nickname" element={<Nickname />} />
        <Route path="/auth/phone" element={<PhoneInfo />} />
        <Route path="/auth/verify" element={<VerifyScreen />} />

      </Routes>

    </BrowserRouter>
  );
}