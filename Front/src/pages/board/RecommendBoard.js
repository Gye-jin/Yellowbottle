import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AccessAgreeBoardDetail } from "../../components/AccessAgree";

const RecommendBoard = ({ recommendBoards, setRecommendBoardModal }) => {
  // [변수 지정]
  // 추천게시물 Index
  const [recommendIndex, setRecommendIndex] = useState(0);
  // 직접 보여줄 추천게시물
  const [viewBoard, setViewBoard] = useState(recommendBoards[0]);
  // 추천 게시물의 마지막 index
  const lastRecommendIndex = recommendBoards.length - 1;
  // 이동하는 함수
  const navigate = useNavigate();

  // [함수지정]
  // 추천게시물 페이지에서 화살표를 눌렀을때 다른 index의 추천게시물 보여주는 함수
  function plusRecommendIndex(changeRecommendIndex) {
    if (
      changeRecommendIndex >= 0 &&
      changeRecommendIndex <= lastRecommendIndex
    ) {
      setRecommendIndex(changeRecommendIndex);
      setViewBoard(recommendBoards[changeRecommendIndex]);
    }
  }

  return (
    <div className="recommend-modal">
      <div className="modal-close-btn">
        <img
          src="/img/close_btn.png"
          width={"25px"}
          onClick={() => setRecommendBoardModal(false)}
        />
      </div>
      <br />
      <br />
      {/* 삼항연산자로 board가 있을때 출력되도록 함. */}
      {viewBoard ? (
        <div className="recommend-view">
          <div className="recommend-outer">
            <div key={viewBoard.boardNo} className="recommend-inner">
              {/* 왼쪽으로 넘어가는 버튼 */}
              {recommendIndex != 0 ? (
                <div className="board_recommendLeftBtn">
                  <img
                    src="/img/recommend_left_btn.png"
                    width={"30%"}
                    onClick={() => plusRecommendIndex(recommendIndex - 1)}
                  />
                </div>
              ) : (
                <div className="board_recommendLeftBtn"></div>
              )}

              {/* 추천 게시물 */}
              <div key={viewBoard.boardNo} className="recommend-board">
                <div className="board_Header">
                  <h3
                    className="recommend_userId"
                    onClick={() => navigate(`/personPage/${viewBoard.userId}`)}
                  >
                    {viewBoard.userId}
                  </h3>
                  {viewBoard.files &&
                    viewBoard.files.map((file) => (
                      <img
                        // React 라이브러리는 컴포넌트와 DOM요소 간의 관계를 이용해 리렌더링 여부를 결정한다.
                        //따라서 불필요한 리렌더링을 방지하기 위해 각 자식 컴포넌트마다 독립적인 Key값을 넣어줘야한다.
                        key={file}
                        className="recommend-boardImage"
                        // 두개 이상의 자식을 붙여서 사용할때는 ${}를 따로 두개 쓰는 것이 아니라 ${} 하나에 + 를 사용해서 넣자!
                        src={`${file.filePath + file.fileName}`}
                        alt="boardimage"
                        onClick={() =>
                          AccessAgreeBoardDetail(viewBoard.boardNo)
                        }
                      />
                    ))}

                  <div className="recommend-boardContent">
                    <div className="recommend-content">
                      <br />
                      {viewBoard.boardContent}
                    </div>
                    <br />
                    <div className="recommend_viewCount">
                      조회수:
                      {viewBoard.viewCount}
                      &nbsp;&nbsp;&nbsp;&nbsp; 댓글수 : {viewBoard.countComment}
                    </div>
                    <div className="recommend-createDate">
                      {viewBoard.createDate}
                    </div>
                  </div>
                </div>
              </div>
              {/* 오른쪽으로 넘어가는 버튼 */}
              {recommendIndex < lastRecommendIndex ? (
                <div className="board_recommendRightBtn">
                  <img
                    src="/img/recommend_right_btn.png"
                    width={"30%"}
                    onClick={() => plusRecommendIndex(recommendIndex + 1)}
                  />
                </div>
              ) : (
                <div className="board_recommendRightBtn"></div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <>
          <h1>관련된 추천 게시글이 없습니다</h1>
          <button onClick={() => setRecommendBoardModal(false)}>
            돌아가기
          </button>
        </>
      )}
    </div>
  );
};
export default RecommendBoard;
