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
  console.log(board.editor);

  const updateBoard = () => {
    navigate(`/updateBoard/${boardNo}`);
  };

  return (
    <>
      <Header />
      <div>
        {board ? (
          <div key={board.boardNo}>
            <div className="board">
              <div>
                <span>{board.userId}</span>
                {board.editor ? (
                  <button onClick={updateBoard}>수정하기</button>
                ) : (
                  <></>
                )}
              </div>
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
                  <span>{comment.userId} - </span>
                  <span>{comment.commentContent}</span>
                </div>
              ))}
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
