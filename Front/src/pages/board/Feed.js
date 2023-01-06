import React from "react";
import Header from "../../components/header/Header";
import FeedBoard from "../../components/FeedBoard";
import ModalForWrite from "./modal/ModalForWrite";

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
          <div className="FeedSideBar-Btn">
            <ModalForWrite />
            <br />
            <img
              onClick={() => goToTop()}
              src="/img/goToTopBtn.png"
              alt="goToTopBtn"
              className="feed-goToTopBtn"
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
      </body>
    </>
  );
}

export default Feed;
