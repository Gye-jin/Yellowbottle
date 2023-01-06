import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { recommendBoardFetchData } from "../../../Api/BoardData";
import RecommendBoard from "../RecommendBoard";

const ModalForRecommend = ({ boardNo }) => {
  // [변수지정]
  // 팝업창 열고 닫기
  const [recommendBoardModal, setRecommendBoardModal] = useState(false);
  // 추천게시글 3개
  const [recommendBoards, setRecommendBoards] = useState([]);

  // [함수지정]
  // recommendBoards 요청
  useEffect(() => {
    const response = recommendBoardFetchData(boardNo);
    response.then((data) => {
      setRecommendBoards(data);
    });
  }, []);

  return (
    <>
      <div className="modalforrecommand-btn-set">
        <span className="modal-recommand-btn">
          <button
            className="recommand-btn"
            onClick={() => setRecommendBoardModal(true)}
          >
            추천 게시글 보기
          </button>
        </span>
        <Modal
          isOpen={recommendBoardModal}
          onRequestClose={() => setRecommendBoardModal(false)}
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
              top: "40px",
              left: "300px",
              right: "300px",
              bottom: "40px",
              border: "1px solid #ccc",
              background: "#e8e6d9",
              overflow: "auto",
              WebkitOverflowScrolling: "touch",
              borderRadius: "4px",
              outline: "none",
              padding: "2px",
            },
          }}
        >
          <br />
          {recommendBoards ? (
            <RecommendBoard
              boardNo={boardNo}
              recommendBoards={recommendBoards}
              setRecommendBoardModal={setRecommendBoardModal}
            />
          ) : (
            <div>로딩중입니다.</div>
          )}
        </Modal>
      </div>
    </>
  );
};

export default ModalForRecommend;
