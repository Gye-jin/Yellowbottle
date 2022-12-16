import React, { useState } from "react";
import { deleteComment } from "../../Api/BoardData";
import UpdateComment from "./UpdateComment";
import ReadComment from "./ReadComment";

const Comment = ({ comment }) => {
  /* [comment 상태]
   *  true => Read
   *  false => Update
   */
  const [commentState, setCommentState] = useState(true);

  // [실행함수]
  // 게시글 삭제
  const commentDeleteButton = () => {
    // 확인창 실행
    const deleteConfirmCheck = window.confirm("정말 댓글을 삭제하겠습니까?");
    // 삭제할 경우
    if (deleteConfirmCheck) {
      let deleteCommentData = new FormData();
      const sessionId = sessionStorage.getItem("sessionId");
      deleteCommentData.append("sessionId", sessionId);
      deleteCommentData.append("commentNo", comment.commentNo);
      deleteComment(deleteCommentData);
      window.location.reload();
    }
  };

  return (
    <div>
      {commentState ? (
        <ReadComment
          userId={comment.userId}
          commentContent={comment.commentContent}
        />
      ) : (
        <UpdateComment
          setCommentState={setCommentState}
          commentNo={comment.commentNo}
          boardNo={comment.boardNo}
          userId={comment.userId}
        />
      )}

      {/* [수정 and 삭제 버튼]
        1. 내가 작성한 댓글일 경우 보임
        2. 내가 작성하지 않았거나 수정중일 경우 보이지 않음 */}
      {comment.editor && commentState ? (
        <span>
          <button onClick={() => setCommentState(false)}>수정</button>
          <button onClick={() => commentDeleteButton()}>삭제</button>
        </span>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Comment;
