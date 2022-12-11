import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BoardFetchData } from "./BoardData";

//좋아요 수 카운트
function LikeCount() {
  const { boardNumber } = useParams;
  const [board, setBoard] = useState([]);
  // const [number, setNumber] = usestate(0);
  // let [likeCount, setlike] = useState(0);

  // useEffect(() => {
  //   const response = BoardFetchData(boardNumber);
  //   response.then((data) => setBoard(data));
  // }, []);

  // const onIncrease = () => {
  //   // setNumber((prevNumber) => prevNumber + 1);
  //   setlike((likeCount) => likeCount + 1);
  };

  return (
    <div>
      {/* <h5>{likeCount}</h5> */}
     
    </div>
  );
}

export default LikeCount;
