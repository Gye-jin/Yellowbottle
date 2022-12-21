import React, { useState } from "react";
import Modal from "react-modal";
import { AccessAgreeBoardWrite } from "../../../components/AccessAgree";
import BoardWrite from "../BoardWrite";
import styled from "styled-components";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";

const ControlPointOutlinedIcons = styled(ControlPointOutlinedIcon)`
  background-color: rgb(255, 217, 44);
  border-radius: 10%;
  color: white;
  //   border: 1px solid lightgray;
  width: 70px;
  height: 70px;
  font-size: 3rem;
`;

export default function ModalForWrite() {
  // [변수지정]
  // 팝업창 열고 닫기
  const [wirteBoardModal, setWirteBoardModal] = useState(false);

  return (
    <>
      <div>
        <ControlPointOutlinedIcons
          // className="writeBoard"
          // 게시글 작성 버튼 눌렀을떄 회원은 게시글 작성 팝업 실행, 비회원은 로그인 페이지로 이동!
          onClick={() => AccessAgreeBoardWrite(setWirteBoardModal)}
        />
        <Modal
          isOpen={wirteBoardModal}
          onRequestClose={() => setWirteBoardModal(false)}
        >
          <div>
            <button onClick={() => setWirteBoardModal(false)}>닫기</button>
          </div>
          <br />
          {/* 컴퍼넌트 들어가는 자리 */}
          <BoardWrite />
        </Modal>
      </div>
    </>
  );
}
