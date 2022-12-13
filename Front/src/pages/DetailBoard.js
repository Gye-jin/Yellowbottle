import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { DetailBoardFetchData } from "../Api/DetailBoardData";
import LikeCountData from "../Api/BoardData";
import { Navigate } from "react-router-dom";

const DetailBoard = ({ match }) => {
  const [boardNo, setBoardNo] = useState(50);
  const [board, setBoard] = useState([]);
  //좋아요 갯수
  //   const [like, setLike] = useState(0);

  useEffect(() => {
    console.log("hello world");
    // const no = match.params;
    // console.log(no);
    const response = DetailBoardFetchData(boardNo);
    response.then((data) => setBoard(data));
  }, []);
  console.log(board);
  return (
    <>
      <Header />
      <div>
        <ul>
          {/* 삼항연산자로 board가 있을때 출력되도록 함. */}
          {board ? (
            <div key={board.boardNo}>
              <div className="board">
                <h3>{board.userId}</h3>
                {/* 이미지 출력 */}
                {/* React는 렌더링이 화면에 커밋된 후에 모든 효과를 실행한다. 
                    즉, 데이터가 들어오기 전에 board.fileDTO.map을 실행시키며 이 데이터는 undefined로 나온다. */}
                {/* 따라서 true && expression(false면 null)을 설정해서 앞에 값들이 들어오면 그때 expression을 실행시키게 하면된다! */}
                {board.fileDTOs &&
                  board.fileDTOs.map((fileDTO) => (
                    <img
                      // React 라이브러리는 컴포넌트와 DOM요소 간의 관계를 이용해 리렌더링 여부를 결정한다.
                      //따라서 불필요한 리렌더링을 방지하기 위해 각 자식 컴포넌트마다 독립적인 Key값을 넣어줘야한다.
                      key={fileDTO}
                      className="boardImage"
                      // 두개 이상의 자식을 붙여서 사용할때는 ${}를 따로 두개 쓰는 것이 아니라 ${} 하나에 + 를 사용해서 넣자!
                      src={`${fileDTO.filePath + fileDTO.fileName}`}
                      width="350" // 350,300 고정값으로 가되, 추후 반응형 세부작업 가능성
                      height="300"
                      alt="boardimage"
                    />
                  ))}

                <div>
                  <h3>
                    <span>
                      {board.likeCount}
                      <button onClick={() => LikeCountData(board.boardNo)}>
                        👍
                      </button>
                      {board.viewCount}
                    </span>
                  </h3>
                </div>
              </div>
              <div>{board.boardContent}</div>
              <ArrowForwardIosIcon onClick={() => Navigate("/")} />
            </div>
          ) : (
            <></>
          )}
        </ul>
      </div>
    </>
  );
};
export default DetailBoard;
