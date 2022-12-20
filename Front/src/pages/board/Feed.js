import React from "react";
import Header from "../../components/header/Header";
import FeedBoard from "../../components/FeedBoard";
import FeedSideBar from "../../components/FeedSideBar";

// 실천내용 전체 페이지
function Feed() {
  return (
    <>
      <Header />
      <body>
        <div className="container">
          <FeedBoard />
          <FeedSideBar />
        </div>
      </body>
    </>
  );
}

export default Feed;
