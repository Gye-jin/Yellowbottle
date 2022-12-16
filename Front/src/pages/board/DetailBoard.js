import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DetailBoardFetchData, postComment } from "../../Api/BoardData";
import Comment from "../../components/comment/Comment";
import Header from "../../components/header/Header";

const DetailBoard = () => {
  const [board, setBoard] = useState([]);
  const boardNo = useParams().boardNo;
  const navigate = useNavigate();

  // 댓글내용 입력시 이벤트발생 ----수정고려중
  const changeComment = (e) => {
    setCommentContent(e.target.value);
  };

  // 댓글입력버튼 클릭 시 - 댓글내용폼데이터 형태로 백에 보냄
  const createCommentData = () => {
    let commentWriteData = new FormData();
    const sessionId = sessionStorage.getItem("sessionId");
    commentWriteData.append("sessionId", sessionId);
    commentWriteData.append("boardNo", boardNo);
    commentWriteData.append("commentContent", commentContent);
    postComment(commentWriteData);
    window.location.reload();
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
              board.comments.map((comment) => <Comment comment={comment} />)}
            {/* 댓글 입력창 */}
            <input
              onChange={changeComment}
              className="Comment-write"
              placeholder="댓글을 입력해주세요!"
              id="commentinput"
            />
            <button onClick={createCommentData}>댓글작성</button>
            {/* 게시글 작성장이면 자신의 게시글을 수정 및 삭제할 수 있음 */}
            {board.editor ? <button>수정하기</button> : ""}
            {board.editor ? <button>삭제하기</button> : ""}
            <br />
            {/* 버튼을 누르면 추천게시물이 나온다. */}
            <br />
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
