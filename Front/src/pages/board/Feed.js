import React from "react";
import Header from "../../components/header/Header";
import FeedBoard from "../../components/FeedBoard";
import ModalForWrite from "./modal/ModalForWrite";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import styled from "styled-components";

const ArrowUpwardOutlinedIcons = styled(ArrowUpwardOutlinedIcon)`
  margin-top: 10px;
  color: #fff;
  border-radius: 10%;
  background-color: rgb(251, 182, 3);
  width: 70px;
  height: 70px;
`;

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
            <ArrowUpwardOutlinedIcons onClick={() => goToTop()} />
          </div>
        </div>
      </body>
    </>
  );
}

export default Feed;
