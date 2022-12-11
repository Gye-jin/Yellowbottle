import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BoardFetchData } from "../Api/BoardData";
import LikeCount from "../Api/LikeCountData";
import LookupCount from "./LookupCount";

function Board() {
  const { boardNumber } = useParams;
  const [board, setBoard] = useState([]);
  // let [like, setlike] = useState(0);

  useEffect(() => {
    const response = BoardFetchData(boardNumber);
    response.then((data) => setBoard(data));
  }, []);

  return (
    <>
      {/* 단일 Board 구성 */}
      <div className="board">
        <h3>작성자id{Board.userId}</h3>

        {/* 이미지 출력(현재 임시이미지) */}
        <img
          className="boardImage"
          src="img/czero2.jpg"
          // src = {`http://localhost:8080/api/image/${imageName}`}
          // width="50%"
          // alt="boardImage" />}
          width="350" //350,300 고정값으로 가되, 추후 반응형 세부작업 가능성
          height="300"
          alt="boardimage"
        />
        <div>
          <h3>
            <span>
              <button onClick={onIncrease}>❤️</button>
              {/* <LookupCount /> */}
            </span>
            {/* {like_count} */}
          </h3>
        </div>
      </div>
      <div>{Board.BoardContent}</div>
    </>
  );
}

export default Board;
