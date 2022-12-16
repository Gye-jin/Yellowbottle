import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DetailBoardFetchData, postComment } from "../../Api/BoardData";
import Header from "../../components/header/Header";

//게시글 상세보기
const DetailBoard = () => {
  //게시글
  const [board, setBoard] = useState([]);
  //게시글 번호 가져오기
  const boardNo = useParams().boardNo;
  //댓글 내용
  const [commentContent, setCommentContent] = useState("");
  //이동함수(추천게시물 이동에 사용)
  const navigate = useNavigate();

  // 댓글내용 입력시 이벤트발생 ----수정고려중
  const changeComment = (e) => {
    setCommentContent(e.target.value);
  };

  // 댓글입력버튼 클릭 시 - 댓글내용폼데이터 형태로 백에 보냄
  const createCommentData = () => {
    let commentWriteData = new FormData();
    const sessionId = sessionStorage.getItem("sessionId");
    // console.log(sessionId);
    commentWriteData.append("sessionId", sessionId);
    commentWriteData.append("boardNo", boardNo);
    commentWriteData.append("commentContent", commentContent);
    postComment(commentWriteData, boardNo);
  };

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
              <h3>{board.userId}</h3>
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
            {/* 댓글 불러오기 */}
            {board.comments &&
              board.comments.map((comment) => (
                <div>
                  <span>{comment.userId} - </span>
                  <span>{comment.commentContent}</span>
                </div>
              ))}
            {/* 댓글 입력창 */}
            <input
              onChange={changeComment}
              className="Comment-write"
              placeholder="댓글을 입력해주세요!"
              id="commentinput"
            />
            <button onClick={createCommentData}>댓글작성</button>
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
