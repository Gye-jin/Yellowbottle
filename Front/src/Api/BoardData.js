import axios from "axios";
//axios get(백에서 게시물정보 가져오기)
export const BoardFetchData = async (pageNo) => {
  // 전체 게시물(ID)보기 _피드게시물넘버에 맞게 가져오기.
  const response = await axios.get(
    `http://localhost:8080/api/Allboard?pageNo=${pageNo}`
  );
  return response.data;
};

//백으로 좋아요 누른 게시물번호 보내기.
export function LikeCountData() {
  const likeBoardNum = async (boardNo) => {
    //post
    await axios
      //좋아요 click발생한 게시물번호 보내기
      .post("http://localhost:8080/api/likeupdate", boardNo)
      .then((response) => {
        boardNo(response.data);
        console.log(response);
        console.log(boardNo);
      })
      .catch(function (err) {
        console.log(err);
        alert("오류발생하였습니다. 잠시후 다시 눌러주세요");
      });
  };
}
