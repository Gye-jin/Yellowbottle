import axios from "axios";

// 게시물 10개씩 피드에 가져오는 함수
export const BoardFetchData = async (pageNo) => {
  // 전체 게시물(ID)보기 _피드게시물넘버에 맞게 가져오기.
  const response = await axios.get(
    `http://localhost:8080/api/Allboard?pageNo=${pageNo}`
  );
  return response.data;
};

// 게시물 10개씩 피드에 가져오는 함수
export const recommendBoardFetchData = async (boardNo) => {
  // boardNo에 해당하는 recommendBoard 3개 가져오기
  const response = await axios.get(
    `http://localhost:8080/api/recomendBoard/${boardNo}`
  );
  return response.data;
};
