import React from "react";
import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Main from "./pages/Main.js";
import Login from "./pages/Login.js";
import Join from "./pages/Join.js";
import Feed from "./pages/Feed.js";
import ReadBoard from "./pages/ReadBoard.js";
import NotFound from "./pages/NotFound.js";
import FindPw from "./pages/FindPw";
import FindId from "./pages/FindId";
import ResetPw from "./pages/ResetPw";
import ConfirmId from "./pages/ConfirmId";
import MyPage from "./pages/MyPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/readboard/*" element={<ReadBoard />} />
        <Route path="/findId" element={<FindId />} />
        <Route path="/findPw" element={<FindPw />} />
        <Route path="/confirmId" element={<ConfirmId />} />
        <Route path="/resetPw" element={<ResetPw />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </div>
  );
}

export default App;
