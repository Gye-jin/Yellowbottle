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
              left: "17%",
              right: "22%",
              bottom: "18%",
              border: "1px solid lightgray",
              background: "#e8e6d8",
              overflow: "auto",
              WebkitOverflowScrolling: "touch",
              borderRadius: "5%",
              outline: "none",
              padding: "20px",
            },
          }}
        >
          <div>
            <img
              src="/img/close_btn.png"
              className="modalForWrite-close-btn"
              onClick={() => setUpdateBoardModal(false)}
            />
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
