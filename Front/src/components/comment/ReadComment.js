import React from "react";
import { useNavigate } from "react-router-dom";
const ReadComment = ({ userId, commentContent }) => {
  const navigate = useNavigate();
  return (
    <span>
      <strong onClick={() => navigate(`/personPage/${userId}`)}>
        {userId}
      </strong>
      <span>{commentContent}</span>
    </span>
  );
};
export default ReadComment;
