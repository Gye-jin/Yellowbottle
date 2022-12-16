import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DetailBoardFetchData } from "../../Api/BoardData";
import Header from "../../components/header/Header";

const DetailBoard = () => {
  const [board, setBoard] = useState([]);
  const boardNo = useParams().boardNo;
  const navigate = useNavigate();

  useEffect(() => {
    const response = DetailBoardFetchData(boardNo);
    response.then((data) => setBoard(data));
  }, []);
  console.log(board);
  return (
    <>
      <Header />
      <div>
        {board ? (
          <div key={board.boardNo}>
            <div className="board">
              {/* userId 클릭시 해당 유저의 마이페이지로 이동 */}
              <h3 onClick={() => navigate(`/personPage/${board.userId}`)}>
                {board.userId}
              </h3>
              {board.files &&
                board.files.map((file) => (
                  <img
                    key={file}
                    className="boardImage"
                    src={`${file.filePath + file.fileName}`}
                    width="350"
                    height="300"
                    alt="boardimage"
                  />
                ))}
              <div>
                <h3>
                  <span>조회수 : {board.viewCount}</span>
                </h3>
                <div>{board.boardContent}</div>
              </div>
            </div>
            {board.comments &&
              board.comments.map((comment) => (
                <div>
                  <span
                    onClick={() => navigate(`/personPage/${comment.userId}`)}
                  >
                    {comment.userId} -{" "}
                  </span>
                  <span>{comment.commentContent}</span>
                  {/* 게시글 작성자이면 댓글마다 삭제하기 버튼이 보임 */}
                  {board.editor ? <button>삭제</button> : ""}
                </div>
              ))}
            {/* 게시글 작성장이면 자신의 게시글을 수정 및 삭제할 수 있음 */}
            {board.editor ? <button>수정하기</button> : ""}
            {board.editor ? <button>삭제하기</button> : ""}
            <br />
            {/* 버튼을 누르면 추천게시물이 나온다. */}
            <button onClick={() => navigate(`/recommendBoard/${boardNo}`)}>
              →
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
export default DetailBoard;
