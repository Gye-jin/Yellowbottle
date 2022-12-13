import { useState } from "react";
import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Main from "./pages/Main.js";
import Login from "./pages/Login.js";
import Join from "./pages/Join.js";
import Feed from "./pages/Feed.js";
import Board from "./components/Boards";
import WriteBoard from "./pages//WriteBoard.js";
import NotFound from "./pages/NotFound.js";
import FindPw from "./pages/FindPw";
import FindId from "./pages/FindId";
import ResetPw from "./pages/ResetPw";
import MyPage from "./pages/MyPage";

function App() {
  const [data, setData] = useState({});
  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/board/*" element={<Board />} />
        <Route path="/writeBoard" element={<WriteBoard />} />
        <Route path="/findId" element={<FindId />} />
        <Route path="/findPw" element={<FindPw />} />
        <Route path="/resetPw" element={<ResetPw />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
