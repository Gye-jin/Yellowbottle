import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  DetailBoardFetchData,
  postComment,
  postDeleteBoardData,
} from "../../Api/BoardData";
import Comment from "../../components/comment/Comment";
import Header from "../../components/header/Header";
import ModalForRecommend from "./modal/ModalForRecommend";
import ModalForUpdate from "./modal/ModalForUpdate";

const DetailBoard = () => {
  // [변수 지정]
  const navigate = useNavigate();
  const sessionId = sessionStorage.getItem("sessionId");
  const { boardNo } = useParams();
  const [board, setBoard] = useState([]);
  const [commentContent, setCommentContent] = useState("");

  // [함수 지정]
  // 댓글내용 입력시 이벤트발생
  const changeComment = (e) => {
    setCommentContent(e.target.value);
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
  const deleteBoardData = () => {
    // 삭제 확인창 실행
    const deleteConfirmCheck = window.confirm("정말 댓글을 삭제하겠습니까?");
    if (deleteConfirmCheck) {
      let deleteBoardData = new FormData();
      deleteBoardData.append("sessionId", sessionId);
      deleteBoardData.append("boardNo", boardNo);
      // 폼데이터로 모은 deleteBoardData를 백에 보내주는 함수
      postDeleteBoardData(deleteBoardData);
    }
  };

  // [useEffect]
  //1.게시물 세부내용 가져오기 -api사용
  useEffect(() => {
    const response = DetailBoardFetchData(boardNo);
    response.then((data) => setBoard(data));
  }, []);

  return (
    <>
      <Header />
      <div className="outer-detail">
        <div className="inner-detail">
          {board ? (
            <div key={board.boardNo}>
              <div className="detail-board">
                {/* userId 클릭시 해당 유저의 마이페이지로 이동 */}
                <p onClick={() => navigate(`/personPage/${board.userId}`)}>
                  {board.userId}
                </p>
                {/* 게시글 작성자이면 자신의 게시글을 수정 및 삭제할 수 있음 */}
                <span className="detailboardtn-ud">
                  {board.editor ? <ModalForUpdate boardNo={boardNo} /> : ""}
                  {board.editor ? (
                    <button onClick={() => deleteBoardData()}>삭제하기</button>
                  ) : (
                    ""
                  )}
                  <br />
                </span>
                {board.files &&
                  board.files.map((file) => (
                    <img
                      key={file}
                      className="boardImage"
                      src={`${file.filePath + file.fileName}`}
                      height="300"
                      alt="boardimage"
                    />
                  ))}
                <div>
                  <h4>
                    <span>조회수 : {board.viewCount}</span>
                    <br />
                    <span>댓글수 : {board.countComment}</span>
                  </h4>
                </div>
              </div>
              <div className="detail-comment">
                <div className="semi-detail-comment">
                  <div className="DetailBoard-comments">
                    <div className="boardContent">{board.boardContent}</div>
                    <br />
                    {board.comments &&
                      board.comments.map((comment) => (
                        <Comment id="cComment" comment={comment} />
                      ))}
                  </div>
                </div>
                <div className="write-comment">
                  <input
                    type="text"
                    onChange={changeComment}
                    className="Comment-write"
                    placeholder="댓글을 입력해주세요!"
                    id="commentinput"
                    onKeyDown={handleEnter}
                  />
                  <button
                    className="detailboard-wcomment-btn"
                    onClick={createCommentData}
                  >
                    댓글작성
                  </button>
                </div>
              </div>
              <span className="recommend-board">
                <ModalForRecommend boardNo={board.boardNo} />
              </span>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};
export default DetailBoard;
