import axios from "axios";

// 게시물 10개씩 피드에 가져오는 함수
export const BoardFetchData = async (pageNo) => {
  // 전체 게시물(ID)보기 _피드게시물넘버에 맞게 가져오기.
  const response = await axios.get(
    `http://localhost:8080/api/Allboard?pageNo=${pageNo}`
  );

  return response.data;
};

// 좋아요 누르면 좋아요 +1 해주는 함수
export default function LikeCountData(boardNo) {
  const likeBoardNum = async (boardNo) => {
    //post
    await axios
      //좋아요 click발생한 게시물번호 보내기
      .post("http://localhost:8080/api/likeupdate", boardNo)
      .then((response) => {
        console.log(boardNo);
        return response.data;
      })
      .catch(function (err) {
        console.log(boardNo);
        console.log(err);
      });
    likeBoardNum(boardNo);
  };
  likeBoardNum(boardNo);
}
