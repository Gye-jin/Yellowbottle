import React, { useState } from "react";
import { deleteComment, repostComment } from "../../Api/BoardData";
import Swal from "sweetalert2";
const EditComment = ({
  setEditCommentModal,
  commentNo,
  boardNo,
  commentContent,
}) => {
  // 댓글 내용
  const [newCommentContent, setNewCommentContent] = useState("");

  // [실행함수]
  // 댓글내용 입력시 이벤트발생 ----수정고려중
  const newComment = (e) => {
    setNewCommentContent(e.target.value);
  };

  // 댓글 수정
  const updateComment = () => {
    if (newCommentContent.length == 0) {
      Swal.fire({
        icon: "warning",
        title: "수정할 댓글을 입력해주세요",
        showConfirmButton: false,
        timer: 1200,
      });
    } else if (newCommentContent.length != 0) {
      let newCommentData = new FormData();
      const sessionId = sessionStorage.getItem("sessionId");
      newCommentData.append("sessionId", sessionId);
      newCommentData.append("commentNo", commentNo);
      newCommentData.append("boardNo", boardNo);
      newCommentData.append("commentContent", newCommentContent);
      repostComment(newCommentData);
    }
  };

  // 댓글 삭제
  const commentDeleteButton = () => {
    // 확인창 실행
    Swal.fire({
      title: "정말 댓글을 삭제하시겠습니까?",
      icon: "warning",
      showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
      confirmButtonColor: "#3085d6", // confrim 버튼 색깔 지정
      cancelButtonColor: "#d33", // cancel 버튼 색깔 지정
      confirmButtonText: "승인", // confirm 버튼 텍스트 지정
      cancelButtonText: "취소", // cancel 버튼 텍스트 지정
    }).then((result) => {
      if (result.isConfirmed) {
        let deleteCommentData = new FormData();
        const sessionId = sessionStorage.getItem("sessionId");
        deleteCommentData.append("sessionId", sessionId);
        deleteCommentData.append("commentNo", commentNo);
        deleteComment(deleteCommentData);
      } else {
        Swal.fire({
          text: "🌚댓글 삭제취소🌝",
          showConfirmButton: false,
          timer: 1200,
        });
      }
    });
  };

  return (
    <span>
      {/* 댓글 입력창 */}
      <div>
        <input
          onChange={newComment}
          className="Comment-write"
          placeholder="댓글을 입력해주세요!"
          defaultValue={commentContent}
          id="commentinput"
        />
      </div>
      <br />
      <button onClick={() => updateComment()}>수정하기</button>
      <button onClick={() => commentDeleteButton()}>삭제하기</button>
      <button onClick={() => setEditCommentModal(false)}>돌아가기</button>
    </span>
  );
};
export default EditComment;
