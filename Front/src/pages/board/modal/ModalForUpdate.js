import React, { useState } from "react";
import Modal from "react-modal";
import BoardUpdate from "../BoardUpdate";

const ModalForUpdate = ({ boardNo }) => {
  // [변수지정]
  // 팝업창 열고 닫기
  const [updateBoardModal, setUpdateBoardModal] = useState(false);

  return (
    <>
      <div>
        <button onClick={() => setUpdateBoardModal(true)}>수정하기</button>
        <Modal
          isOpen={updateBoardModal}
          onRequestClose={() => setUpdateBoardModal(false)}
        >
          <div>
            <button onClick={() => setUpdateBoardModal(false)}>닫기</button>
          </div>
          <br />
          {/* 컴퍼넌트 들어가는 자리 */}
          <BoardUpdate boardNo={boardNo} />
        </Modal>
      </div>
    </>
  );
};

export default ModalForUpdate;
