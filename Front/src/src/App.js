import React from "react";
import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Main from "./pages/Main.js";
import Login from "./pages/Login.js";
import Join from "./pages/Join.js";
import Feed from "./pages/Feed.js";
import ReadBoard from "./pages/ReadBoard.js";
import NotFound from "./pages/NotFound.js";

function App() {
  return (
    <div>

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/readboard/*" element={<ReadBoard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

    </div>
  );
}

export default App;
