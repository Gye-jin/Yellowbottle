import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main.js";
import Login from "./pages/Login.js";
import Join from "./pages/Join.js";
import Feed from "./pages/Feed.js";
import NotFound from "./pages/NotFound.js";
import FindPw from "./pages/FindPw";
import FindId from "./pages/FindId";
import ResetPw from "./pages/ResetPw";
import MyPage from "./pages/MyPage";
import BoardWrite from "./pages/BoardWrite";
import AdminLogPage from "./pages/AdminLogPage";
import Boards from "./components/Board";
import DetailBoard from "./pages/DetailBoard";
import AdminMailPage from "./pages/AdminMailPage";
import RecommendBoard from "./pages/RecommendBoard";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/findId" element={<FindId />} />
        <Route path="/findPw" element={<FindPw />} />
        <Route path="/resetPw" element={<ResetPw />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/DetailBoard/:boardNo" element={<DetailBoard />} />
        <Route path="/recommendBoard/:boardNo" element={<RecommendBoard />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/boardWrite" element={<BoardWrite />} />
        <Route path="/adminLogPage" element={<AdminLogPage />} />
        <Route path="/adminMailPage" element={<AdminMailPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
