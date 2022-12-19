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
      <div>
        <button onClick={() => setRecommendBoardModal(true)}>
          추천 게시글 보기
        </button>
        <Modal
          isOpen={recommendBoardModal}
          onRequestClose={() => setRecommendBoardModal(false)}
        >
          <div>
            <button onClick={() => setRecommendBoardModal(false)}>닫기</button>
          </div>
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
