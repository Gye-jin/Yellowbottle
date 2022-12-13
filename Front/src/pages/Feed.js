import React from "react";
import Header from "../components/Header";
import { AccessAgreeBoardWrite } from "../components/AccessAgree";
import Boards from "../components/Board";

// 실천내용 전체 페이지
function Feed() {
  // 버튼 클릭 시 맨 위로 이동
  const goToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <>
      <Header />
      <body>
        <div className="container">
          <Boards />
          <button
            className="writeBoard"
            // 게시글 작성 버튼 눌렀을떄 회원은 게시글 작성페이지로, 비회원은 로그인 페이지로 이동!
            onClick={() => AccessAgreeBoardWrite()}
          >
            실천내용 작성하기
          </button>
          <button className="goToTop" onClick={goToTop}>
            상단이동
          </button>
        </div>
      </body>
    </>
  );
}

export default Feed;
