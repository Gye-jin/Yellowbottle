import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  DetailBoardFetchData,
  postComment,
  postDeleteBoardData,
} from "../../Api/BoardData";
import Comment from "../../components/comment/Comment";
import Header from "../../components/header/Header";

//게시글 상세보기
const DetailBoard = () => {
  //게시글
  const [board, setBoard] = useState([]);
  //게시글 번호 가져오기
  const boardNo = useParams().boardNo;
  //이동함수(추천게시물 이동에 사용)
  const navigate = useNavigate();
  //댓글 내용
  const [commentContent, setCommentContent] = useState("");
  //세션아이디 가져오기
  const sessionId = sessionStorage.getItem("sessionId");

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
    commentWriteData.append("sessionId", sessionId);
    commentWriteData.append("boardNo", boardNo);
    commentWriteData.append("commentContent", commentContent);
    postComment(commentWriteData);
    window.location.reload();
  };

  // 게시글 삭제 버튼 클릭 시 = 게시글내용폼데이터 형태로 백에 보냄
  const createDeleteBoardData = () => {
    let deleteBoardData = new FormData();
    deleteBoardData.append("sessionId", sessionId);
    deleteBoardData.append("boardNo", boardNo);

    // FormData의 key 확인
    for (let key of deleteBoardData.keys()) {
      console.log("폼데이터 key값", key);
    }

    // FormData의 value 확인
    for (let value of deleteBoardData.values()) {
      console.log("폼데이터 value값", value);
    }
    // 폼데이터로 모은 deleteBoardData를 백에 보내주는 함수
    postDeleteBoardData(deleteBoardData);
  };

  //1.게시물 세부내용 가져오기 -api사용
  useEffect(() => {
    const response = DetailBoardFetchData(boardNo);
    response.then((data) => setBoard(data));
  }, []);
  console.log(board.editor);

  // 게시물수정으로 이동
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
                {/* <h3 onClick={() => navigate(`/personPage/${board.userId}`)}> */}
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

            <input
              onChange={changeComment}
              className="Comment-write"
              placeholder="댓글을 입력해주세요!"
              id="commentinput"
            />
            <button onClick={createCommentData}>댓글작성</button>
            {/* 게시글 작성장이면 자신의 게시글을 수정 및 삭제할 수 있음 */}
            {board.editor ? (
              <button onClick={() => navigate(`/boardUpdate/${boardNo}`)}>
                수정하기
              </button>
            ) : (
              ""
            )}
            {board.editor ? (
              <button onClick={() => createDeleteBoardData()}>삭제하기</button>
            ) : (
              ""
            )}
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
