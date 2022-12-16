import React, { useState, useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { BoardFetchData } from "../Api/BoardData";

//조회수 카운트
function LookupCount() {
  const onClickHandler = (e) => {
    setLookup(e.target.value);
  };
  // const onClickHandler = () => {
  //   onIncrease();
  // };
  const { boardNumber } = useParams;
  const [board, setBoard] = useState([]);
  let [LookupCount, setLookup] = useState(0);

  useEffect(() => {
    const response = BoardFetchData(boardNumber);
    response.then((data) => setBoard(data));
  }, []);

  const onIncrease = () => {
    setLookup((LookupCount) => LookupCount + 1, Navigate("/"));
  };

  return (
    <div>
      <h5>{LookupCount}</h5>
      <button onClick={onClickHandler}>상세보기</button>
    </div>
  );
}

export default LookupCount;
