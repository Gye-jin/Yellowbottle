import { Box } from "@mui/system";
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

  //댓글창 내용입력 시 이벤트발생
  const changeComment = (e) => {
    setCommentContent(e.target.value);
    console.log("commentContent" + commentContent);
  };
  //Enter로도 댓글달기 가능하게 하는 함수
  const handleEnter = (e) => {
    if (e.key == "Enter") {
      createCommentData();
      console.log(commentContent);
    }
  };

  // 댓글입력버튼 클릭or엔터 시 - 댓글내용폼데이터 형태로 백에 보냄
  const createCommentData = () => {
    let commentWriteData = new FormData();
    const sessionId = sessionStorage.getItem("sessionId");
    // console.log(sessionId);
    commentWriteData.append("sessionId", sessionId);
    commentWriteData.append("boardNo", boardNo);
    commentWriteData.append("commentContent", commentContent);
    postComment(commentWriteData);
    window.location.reload();
  };

  //이전에 클릭한 게시물 불러오는 함수
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
              {/* userId 클릭시 해당 유저의 마이페이지로 이동 */}
              <h3 onClick={() => navigate(`/personPage/${board.userId}`)}>
                {board.userId}
              </h3>
              {/* 게시글 작성자이면 자신의 게시글을 수정 및 삭제할 수 있음 */}
              {board.editor ? <button>수정하기</button> : ""}
              {board.editor ? <button>삭제하기</button> : ""}
              <br />
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

            {/* 댓글 입력창 */}
            <box onSubmit={changeComment}>
              <input
                // onChange={changeComment}
                className="Comment-write"
                placeholder="댓글을 입력해주세요!"
                id="commentinput"
                onKeyDown={handleEnter}
              ></input>
              <button onClick={createCommentData}>댓글작성</button>
            </box>

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
