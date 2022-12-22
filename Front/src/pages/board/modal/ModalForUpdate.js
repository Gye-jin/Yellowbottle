import React, { useState } from "react";
import Modal from "react-modal";
import UpdateBoard from "../UpdateBoard";

const ModalForUpdate = ({ boardNo }) => {
  // [변수지정]
  // 팝업창 열고 닫기
  const [updateBoardModal, setUpdateBoardModal] = useState(false);

  return (
    <>
      <span>
        <button
          className="detailboard-u"
          onClick={() => setUpdateBoardModal(true)}
        >
          글수정
        </button>
        <Modal
          isOpen={updateBoardModal}
          onRequestClose={() => setUpdateBoardModal(false)}
        >
          <div>
            <button onClick={() => setUpdateBoardModal(false)}>닫기</button>
          </div>
          <br />
          {/* 컴퍼넌트 들어가는 자리 */}
          <UpdateBoard boardNo={boardNo} />
        </Modal>
      </span>
    </>
  );
};

export default ModalForUpdate;
