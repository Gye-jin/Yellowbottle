import React from "react";
import { useNavigate } from "react-router-dom/dist";
import ModalForComment from "./ModalForComment";

const Comment = ({ comment }) => {
  const navigate = useNavigate();
  // [실행함수]

  return (
    <div>
      {/* 설명: 댓글 작성자의 Id와 댓글 내용을 출력
          이벤트 : userId 클릭 시 해당 유저의 개인 페이지로 이동 */}
      <span>
        <strong onClick={() => navigate(`/personPage/${comment.userId}`)}>
          {comment.userId}
        </strong>
        <span>{comment.commentContent}</span>
      </span>

      {/* [댓글 수정]
          설명: 댓글 작성자에게만 보이는 버튼
          이벤트: 댓글 수정 및 삭제가 가능한 팝업 생성 */}
      {comment.editor ? <ModalForComment comment={comment} /> : <></>}
    </div>
  );
};

export default Comment;
