import * as React from "react";
import { AccessAgreeBoardWrite } from "./AccessAgree";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import styled from "styled-components";

const ControlPointOutlinedIcons = styled(ControlPointOutlinedIcon)`
  background-color: rgb(255, 217, 44);
  border-radius: 10%;
  color: white;
  //   border: 1px solid lightgray;
  width: 70px;
  height: 70px;
  font-size: 3rem;
`;
const ArrowUpwardOutlinedIcons = styled(ArrowUpwardOutlinedIcon)`
  margin-top: 10px;
  color: #fff;
  border-radius: 10%;
  background-color: rgb(251, 182, 3);
  width: 70px;
  height: 70px;
`;

export default function FeedSideBar() {
  // 버튼 클릭 시 맨 위로 이동
  const goToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className="FeedSideBar-Btn">
      {/* <div className="FeedSideBar-BoardWriteBtn"> */}
      <ControlPointOutlinedIcons onClick={() => AccessAgreeBoardWrite()} />

      {/* </ControlPointOutlinedIcons> */}
      <ArrowUpwardOutlinedIcons onClick={() => goToTop()} />
    </div>
  );
}
