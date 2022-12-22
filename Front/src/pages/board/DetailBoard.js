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
import Swal from "sweetalert2";

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
  const handleEnter = (event) => {
    if (event.key == "Enter" && !event.shiftKey) {
      createCommentData();
    }
  };

  // 댓글입력버튼 클릭or엔터 시 - 댓글내용폼데이터 형태로 백에 보냄
  const createCommentData = () => {
    if (!commentContent) {
      Swal.fire({
        icon: "error",
        text: "🌚댓글을 입력해주세요🌝",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      let commentWriteData = new FormData();
      commentWriteData.append("sessionId", sessionId);
      commentWriteData.append("boardNo", boardNo);
      commentWriteData.append("commentContent", commentContent);
      postComment(commentWriteData);
    }
  };

  // 게시글 삭제 버튼 클릭 시 = 게시글내용폼데이터 형태로 백에 보냄
  const deleteBoardData = () => {
    // 삭제 확인창 실행
    Swal.fire({
      title: "정말 게시글을 삭제하시겠습니까?",
      icon: "warning",
      showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
      confirmButtonColor: "#3085d6", // confrim 버튼 색깔 지정
      cancelButtonColor: "#d33", // cancel 버튼 색깔 지정
      confirmButtonText: "승인", // confirm 버튼 텍스트 지정
      cancelButtonText: "취소", // cancel 버튼 텍스트 지정
    }).then((result) => {
      if (result.isConfirmed) {
        let deleteBoardData = new FormData();
        deleteBoardData.append("sessionId", sessionId);
        deleteBoardData.append("boardNo", boardNo);
        // 폼데이터로 모은 deleteBoardData를 백에 보내주는 함수
        postDeleteBoardData(deleteBoardData);
      } else {
        Swal.fire({
          text: "🌚게시글 삭제취소🌝",
          showConfirmButton: false,
          timer: 1200,
        });
      }
    });
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
              <div className="detailboard-image">
                {board.files &&
                  board.files.map((file) => (
                    <img
                      key={file}
                      className="boardImage"
                      src={`${file.filePath + file.fileName}`}
                      alt="boardimage"
                    />
                  ))}
                {/* 추천게시글 보기 */}
                <span className="recommend-board">
                  <ModalForRecommend boardNo={board.boardNo} />
                </span>
              </div>
              <div className="Detailcomment">
                <div className="semi-detail-comment">
                  <div className="DetailBoard-comments">
                    {/* userId 클릭시 해당 유저의 마이페이지로 이동 */}
                    <div className="DetailBoard-writer-content">
                      <p
                        onClick={() => navigate(`/personPage/${board.userId}`)}
                      >
                        {board.userId}
                      </p>

                      <div className="boardContent">{board.boardContent}</div>
                      <n />
                      <div>
                        <h5>
                          <span>조회수 : {board.viewCount}</span>
                          &nbsp;&nbsp;&nbsp;&nbsp;
                          <span>댓글수 : {board.countComment}</span>
                        </h5>
                        {/* 게시글 작성자이면 자신의 게시글을 수정 및 삭제할 수 있음 */}
                        <span className="detailboardtn-ud">
                          {board.editor ? (
                            <ModalForUpdate boardNo={boardNo} />
                          ) : (
                            ""
                          )}
                          {board.editor ? (
                            <button
                              className="detailboard-d"
                              onClick={() => deleteBoardData()}
                            >
                              글삭제
                            </button>
                          ) : (
                            ""
                          )}
                          <br />
                        </span>
                      </div>
                    </div>
                    <br />
                    {board.comments &&
                      board.comments.map((comment) => (
                        <Comment id="one-comment" comment={comment} />
                      ))}
                  </div>
                </div>
                <div className="detailboard-write-comment">
                  <textarea
                    resize="none;"
                    type="text"
                    onChange={changeComment}
                    className="detailboard-Comment-write"
                    placeholder="  댓글 입력.."
                    id="commentinput"
                    onKeyDown={handleEnter}
                  />
                  <button
                    className="detailboard-wcomment-btn"
                    onClick={createCommentData}
                  >
                    등록
                  </button>
                </div>
              </div>
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
