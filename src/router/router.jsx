import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Community from "../pages/Community";
import PostDetail from "../pages/PostDetail";
import Install from "../pages/Install";

/* 커뮤니티 추가 페이지 */
import WritePost from "../pages/WritePost";
import EditPost from "../pages/EditPost";
import SavedPosts from "../pages/SavedPosts";
import RecentPosts from "../pages/RecentPosts";

/* 회원가입 */
import AuthLanding from "../auth";
import Nickname from "../auth/signup";
import PhoneInfo from "../auth/phone-info";
import VerifyScreen from "../auth/verify";

import AuthGuard from "../components/AuthGuard";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 메인 */}
        <Route path="/" element={<Home />} />

        {/* 커뮤니티 */}
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

        {/* 글 작성 */}
        <Route
          path="/community/write"
          element={
            <AuthGuard>
              <WritePost />
            </AuthGuard>
          }
        />

        {/* 글 수정 */}
        <Route
          path="/community/edit/:id"
          element={
            <AuthGuard>
              <EditPost />
            </AuthGuard>
          }
        />

        {/* 저장한 글 */}
        <Route
          path="/community/saved"
          element={
            <AuthGuard>
              <SavedPosts />
            </AuthGuard>
          }
        />

        {/* 최근 본 글 */}
        <Route
          path="/community/recent"
          element={
            <AuthGuard>
              <RecentPosts />
            </AuthGuard>
          }
        />

        {/* 앱 설치 */}
        <Route path="/install" element={<Install />} />

        {/* 인증 / 회원가입 */}
        <Route path="/auth" element={<AuthLanding />} />
        <Route path="/auth/nickname" element={<Nickname />} />
        <Route path="/auth/phone" element={<PhoneInfo />} />
        <Route path="/auth/verify" element={<VerifyScreen />} />

      </Routes>
    </BrowserRouter>
  );
}