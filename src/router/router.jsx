import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Community from "../pages/Community";
import PostDetail from "../pages/PostDetail";
import Install from "../pages/Install";

/* 회원가입 */
import AuthLanding from "../auth";
import Nickname from "../auth/signup";
import PhoneInfo from "../auth/phone-info";
import VerifyScreen from "../auth/verify";

export default function Router() {
  return (
    <BrowserRouter>

      <Routes>

        {/* 메인 */}
        <Route path="/" element={<Home />} />

        {/* 커뮤니티 */}
        <Route path="/community" element={<Community />} />
        <Route path="/community/:id" element={<PostDetail />} />

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