import Modal from "react-modal";
import React, { useState } from "react";
import EditComment from "./EditComment";

const ModalForComment = ({ comment }) => {
  const [editCommentModal, setEditCommentModal] = useState(false);
  return (
    <>
      {/* 설명: 팝업 생성 버튼 */}
      <button
        className="modalforcomment-ucomment-btn"
        onClick={() => setEditCommentModal(true)}
      >
        edit
      </button>
      {/* 설명1: isOpen => true: 팝업 생성 / false: 팝업 닫기 */}
      <Modal
        isOpen={editCommentModal}
        onRequestClose={() => setEditCommentModal(false)}
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
            top: "30%",
            left: "40%",
            right: "36%",
            bottom: "48%",
            border: "1px solid lightgray",
            background: "#fff",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            borderRadius: "10px",
            outline: "none",
            padding: "20px",
          },
        }}
      >
        {/* 설명 : 팝업 출력 시 보여지는 component */}
        <EditComment
          setEditCommentModal={setEditCommentModal}
          commentNo={comment.commentNo}
          boardNo={comment.boardNo}
          commentContent={comment.commentContent}
        />
      </Modal>
    </>
  );
};

export default ModalForComment;
