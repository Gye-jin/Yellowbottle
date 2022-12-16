import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { recommendBoardFetchData } from "../../Api/BoardData";
import Header from "../../components/header/Header";

const RecommendBoard = () => {
  // 파라미터를 활용하여 boardNo 받기
  const boardNo = useParams().boardNo;

  // 해당 게시물과 관련된 추천게시물 3개 저장하는 객체
  const [boards, setBoards] = useState([]);
  // 보여주는 추천게시물 저장해놓는 객체
  const [viewBoard, setViewBoard] = useState([]);
  // 추천게시물 번호
  const [recommendNo, setRecommendNo] = useState(0);
  // 이동하는 함수
  const navigate = useNavigate();
  // 게시물상세페이지에서 -> 버튼 누르면 추천게시물 백에서 받아오게하는 함수
  useEffect(() => {
    const response = recommendBoardFetchData(boardNo);
    response.then((data) => {
      setBoards(data);
      setViewBoard(data[recommendNo]);
    });
  }, []);
  // 추천게시물 페이지에서 오른쪽 화살표를 눌렀을때 다음 추천게시물 보이게 해주는 함수
  function plusRecommendNo(changeRecommendNo) {
    if (changeRecommendNo >= 0 && changeRecommendNo <= 2) {
      setRecommendNo(changeRecommendNo);
      setViewBoard(boards[changeRecommendNo]);
    } else if (changeRecommendNo < 0) {
      navigate(`/detailBoard/${boardNo}`);
    }
  }
  // 추천게시물 페이지에서 왼쪽 화살표를 눌렀을때 이전 추천게시물 보이게 해주는 함수
  function backDetailBoard() {
    navigate(`/detailBoard/${boardNo}`);
  }

  return (
    <>
      <Header />
      <div>
        <ul>
          {/* 삼항연산자로 board가 있을때 출력되도록 함. */}
          {viewBoard ? (
            <div key={viewBoard.boardNo}>
              <div className="board">
                <h3>{viewBoard.userId}</h3>
                {/* 이미지 출력 */}
                {/* React는 렌더링이 화면에 커밋된 후에 모든 효과를 실행한다.
                    즉, 데이터가 들어오기 전에 board.fileDTO.map을 실행시키며 이 데이터는 undefined로 나온다. */}
                {/* 따라서 true && expression(false면 null)을 설정해서 앞에 값들이 들어오면 그때 expression을 실행시키게 하면된다! */}
                {viewBoard.files &&
                  viewBoard.files.map((file) => (
                    <img
                      // React 라이브러리는 컴포넌트와 DOM요소 간의 관계를 이용해 리렌더링 여부를 결정한다.
                      //따라서 불필요한 리렌더링을 방지하기 위해 각 자식 컴포넌트마다 독립적인 Key값을 넣어줘야한다.
                      key={file}
                      className="boardImage"
                      // 두개 이상의 자식을 붙여서 사용할때는 ${}를 따로 두개 쓰는 것이 아니라 ${} 하나에 + 를 사용해서 넣자!
                      src={`${file.filePath + file.fileName}`}
                      width="350" // 350,300 고정값으로 가되, 추후 반응형 세부작업 가능성
                      height="300"
                      alt="boardimage"
                    />
                  ))}

                <div>
                  <h3>
                    <span>
                      조회수
                      {viewBoard.viewCount}
                    </span>
                  </h3>
                </div>
              </div>
              <div>{viewBoard.boardContent}</div>
              <button onClick={() => plusRecommendNo(recommendNo - 1)}>
                ←
              </button>
              {recommendNo < 2 ? (
                <button onClick={() => plusRecommendNo(recommendNo + 1)}>
                  →
                </button>
              ) : (
                <></>
              )}
            </div>
          ) : (
            <>
              <h1>관련된 추천 게시글이 없습니다</h1>
              <button onClick={backDetailBoard}>돌아가기</button>
            </>
          )}
        </ul>
      </div>
    </>
  );
};
export default RecommendBoard;
