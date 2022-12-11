import React from "react";
import Header from "../components/Header";
import Board from "../components/Board";
import { Navigate, useNavigate } from "react-router-dom";

function Feed() {
  //페이지 이동 함수
  const navigate = useNavigate();

  return (
    <>
      <Header />

      <div className="container">
        <Board />
      </div>
      <button className="writeBoard" onClick={() => navigate("/writeBoard")}>
        실천내용 작성하기
      </button>
    </>
  );
}

export default Feed;
