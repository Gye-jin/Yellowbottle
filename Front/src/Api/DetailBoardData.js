import axios from "axios";

// 특정 게시글 데이터 불러오기
export const DetailBoardFetchData = async (boardNo) => {
  // 전체 게시물(ID)보기 _피드게시물넘버에 맞게 가져오기.
  const response = await axios.get(
    `http://localhost:8080/api/board/${boardNo}`
  );

  return response.data;
};
