import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main.js";
import Login from "./pages/Login.js";
import Join from "./pages/Join.js";
import Feed from "./pages/Feed.js";
import BoardDetail from "./pages/BoardDetail";
import NotFound from "./pages/NotFound.js";
import FindPw from "./pages/FindPw";
import FindId from "./pages/FindId";
import ResetPw from "./pages/ResetPw";
import MyPage from "./pages/MyPage";
import BoardWrite from "./pages/BoardWrite";
import AdminPage from "./pages/AdminPage";
import Boards from "./components/Board";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/boardDetail/*" element={<BoardDetail />} />
        <Route path="/findId" element={<FindId />} />
        <Route path="/findPw" element={<FindPw />} />
        <Route path="/resetPw" element={<ResetPw />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/boardWrite" element={<BoardWrite />} />
        <Route path="/adminPage" element={<AdminPage />} />
        <Route path="/boards" element={<Boards />} />
      </Routes>
    </div>
  );
}

export default App;
