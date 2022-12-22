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
          <WriteBoard />
        </Modal>
      </div>
    </>
  );
}
