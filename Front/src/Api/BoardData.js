import axios from "axios";
import { useState, useEffect } from "react";

//axios
export const BoardFetchData = async (boardNumber) => {
  // 전체 게시물보기 _피드게시물넘버에 맞게 가져오기.
  const response = await axios.get(
    "http://localhost:8080/api/Board/" + boardNumber
  );

  return response.data;
};
