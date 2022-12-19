import React, { useState } from "react";
import Modal from "react-modal";
import { AccessAgreeBoardWrite } from "../../../components/AccessAgree";
import BoardWrite from "../BoardWrite";

const ModalForWrite = () => {
  // [변수지정]
  // 팝업창 열고 닫기
  const [wirteBoardModal, setWirteBoardModal] = useState(false);

  return (
    <>
      <div>
        <button
          className="writeBoard"
          // 게시글 작성 버튼 눌렀을떄 회원은 게시글 작성 팝업 실행, 비회원은 로그인 페이지로 이동!
          onClick={() => AccessAgreeBoardWrite(setWirteBoardModal)}
        >
          실천내용 작성하기
        </button>
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
};

export default ModalForWrite;
