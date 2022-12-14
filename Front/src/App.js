import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Main from "./pages/main/Main.js";
import Login from "./pages/log/Login.js";
import Join from "./pages/log/Join.js";
import Feed from "./pages/board/Feed.js";
import NotFound from "./pages/etc/NotFound.js";
import FindPw from "./pages/log/FindPw";
import FindId from "./pages/log/FindId";
import ResetPw from "./pages/log/ResetPw";
import MyPage from "./pages/user/MyPage";
import BoardWrite from "./pages/board/BoardWrite";
import AdminLogPage from "./pages/admin/AdminLogPage";
import DetailBoard from "./pages/board/DetailBoard";
import AdminMailPage from "./pages/admin/AdminMailPage";
import AnotherUserPage from "./pages/user/AnotherUserPage";

function App() {
  return (
    <div>
      <Routes>
        {/* 메인페이지 */}
        <Route path="/" element={<Main />} />
        {/* logPage : 회원가입, 로그인, 아이디/비밀번호 찾기, 비밀번호 변경 */}
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/findId" element={<FindId />} />
        <Route path="/findPw" element={<FindPw />} />
        <Route path="/resetPw" element={<ResetPw />} />
        {/* boardPage : 실천내용 전체, 게시글 작성, 싱세게시물 */}
        <Route path="/feed" element={<Feed />} />
        <Route path="/boardWrite" element={<BoardWrite />} />
        <Route path="/DetailBoard/:boardNo" element={<DetailBoard />} />
        {/* userPage : 마이페이지, 타유저페이지 */}
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/anotherUserPage" element={<AnotherUserPage />} />
        {/* adminPage : 관리자로그페이지, 관리자메신저페이지 */}
        <Route path="/adminLogPage" element={<AdminLogPage />} />
        <Route path="/adminMailPage" element={<AdminMailPage />} />
        {/* 기타페이지 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
