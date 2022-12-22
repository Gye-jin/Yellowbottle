import React, { useState } from "react";
import Modal from "react-modal";
import { AccessAgreeBoardWrite } from "../../../components/AccessAgree";
import WriteBoard from "../WriteBoard";

export default function ModalForWrite() {
  // [변수지정]
  // 팝업창 열고 닫기
  const [wirteBoardModal, setWirteBoardModal] = useState(false);

  return (
    <>
      <div>
        {/* 게시글 작성 버튼
        기능: 회원 => 게시글 작성 팝업 실행 / 비회원 => 로그인 페이지 이동 */}
        <img
          onClick={() => AccessAgreeBoardWrite(setWirteBoardModal)}
          src="/img/boardWriteBtn.png"
          alt="boardWriteBtn"
          className="feed-boardWriteBtn"
          style={{ cursor: "pointer" }}
        />
        <Modal
          isOpen={wirteBoardModal}
          onRequestClose={() => setWirteBoardModal(false)}
          style={{
            overlay: {
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(255, 255, 255, 0.75)",
            },
            content: {
              position: "absolute",
              top: "10%",
              left: "15%",
              right: "15%",
              bottom: "10%",
              border: "1px solid lightgray",
              background: "#fff",
              overflow: "auto",
              WebkitOverflowScrolling: "touch",
              borderRadius: "5%",
              outline: "none",
              padding: "20px",
            },
          }}
        >
          <img
            src="/img/close_btn.png"
            className="modalForWrite-close-btn"
            onClick={() => setWirteBoardModal(false)}
          />

          <br />
          {/* 컴퍼넌트 들어가는 자리 */}
          <WriteBoard />
        </Modal>
      </div>
    </>
  );
}
