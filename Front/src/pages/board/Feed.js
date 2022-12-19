import React from "react";
import Header from "../../components/header/Header";
import FeedBoard from "../../components/FeedBoard";
import ModalForwrite from "./modal/ModalForWrite";

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
          <FeedBoard />
          {/* 모달 들어갈 자리 */}
          <ModalForwrite />
          <button className="goToTop" onClick={goToTop}>
            상단이동
          </button>
        </div>
      </body>
    </>
  );
}

export default Feed;
