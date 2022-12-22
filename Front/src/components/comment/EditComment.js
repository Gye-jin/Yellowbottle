import React, { useState } from "react";
import { deleteComment, repostComment } from "../../Api/BoardData";
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
      alert("수정할 댓글을 입력해주세요.");
    } else if (newCommentContent.length != 0) {
      let newCommentData = new FormData();
      const sessionId = sessionStorage.getItem("sessionId");
      newCommentData.append("sessionId", sessionId);
      newCommentData.append("commentNo", commentNo);
      newCommentData.append("boardNo", boardNo);
      newCommentData.append("commentContent", newCommentContent);
      repostComment(newCommentData);
      window.location.reload();
    }
  };

  // 게시글 삭제
  const commentDeleteButton = () => {
    // 확인창 실행
    const deleteConfirmCheck = window.confirm("정말 댓글을 삭제하겠습니까?");
    // 삭제할 경우
    if (deleteConfirmCheck) {
      let deleteCommentData = new FormData();
      const sessionId = sessionStorage.getItem("sessionId");
      deleteCommentData.append("sessionId", sessionId);
      deleteCommentData.append("commentNo", commentNo);
      deleteComment(deleteCommentData);
      window.location.reload();
    }
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
      <button onClick={() => updateComment()}>수정하기</button>
      <button onClick={() => commentDeleteButton()}>삭제하기</button>
      <button onClick={() => setEditCommentModal(false)}>돌아가기</button>
    </span>
  );
};
export default EditComment;
