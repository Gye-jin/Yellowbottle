import React, { useState } from "react";
import { repostComment } from "../../Api/BoardData";
const InputComment = ({ setCommentState, commentNo, boardNo, userId }) => {
  // 댓글 내용
  const [newCommentContent, setNewCommentContent] = useState("");

  // 댓글내용 입력시 이벤트발생 ----수정고려중
  const newComment = (e) => {
    setNewCommentContent(e.target.value);
  };

  // 댓글 수정 취소
  const cancelUpdate = () => {
    setCommentState(true);
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
  return (
    <span>
      {/* 댓글 입력창 */}
      <strong>{userId}</strong>
      <input
        onChange={newComment}
        className="Comment-write"
        placeholder="댓글을 입력해주세요!"
        id="commentinput"
      />
      <button onClick={() => updateComment()}>수정하기</button>
      <button onClick={() => cancelUpdate()}>돌아가기</button>
    </span>
  );
};
export default InputComment;
