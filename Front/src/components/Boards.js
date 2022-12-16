import React, { useState, useEffect } from "react";
import { BoardFetchData } from "../Api/BoardData";
import { LikeCountData } from "../Api/BoardData";

const Boards = () => {
  //백에서 보낸 10개씩 게시물을 담는 공간
  const [boards, setBoards] = useState([]);
  //좋아요 갯수----
  const [like, setlike] = useState(0);
  //페이지 하나당 10개의 게시물(spring참고)
  const [pageNo, setPageNo] = useState(1);
  //fileDTOs의 Path, Name 가져오기 위해 div객체 생성
  // // const

  //백에서 get해온 response.data를 setBoards에 담는다
  useEffect(() => {
    const response = BoardFetchData(pageNo);
    response.then((data) => setBoards(data));
  }, []);
  console.log(boards);
  console.log(pageNo); //추후 스크롤로 올려줄 예정
  return (
    <>
      <div>
        <ul>
          {/* 삼항연산자로 boards가 있을때 게시물번호 순으로 출력함. */}
          {boards ? (
            boards.map((board) => (
              <div key={board.boardNo}>
                <div href={"http://localhost:3000/board/" + board.boardNo}>
                  <div className="board">
                    <h3>{board.userId}</h3>
                    {/* 이미지 출력 */}
                    {/* <img
                      className="boardImage"
                      src={}
                      // src={fileDTOs.map(element => fileDTO path ={element.filePath})}
                      // src = {`http://localhost:8080/api/image/${fileName}`} />}
                      width="350" //350,300 고정값으로 가되, 추후 반응형 세부작업 가능성
                      height="300"
                      alt={board.fileDTOs.fileName}
                    /> */}
                    <div>
                      <h3>
                        <span>
                          {board.likeCount}
                          <button onClick={() => LikeCountData(board.boardNo)}>
                            👍
                          </button>
                          {/* <LookupCount /> */}
                        </span>
                        {/* {like_count} */}
                      </h3>
                    </div>
                  </div>
                  <div>{board.boardContent}</div>
                </div>
              </div>
            ))
          ) : (
            <></>
          )}
        </ul>
      </div>
    </>
  );
};

export default Boards;
