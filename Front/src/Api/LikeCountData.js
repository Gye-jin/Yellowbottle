import axios from "axios";

export default function LikeCountData(boardNo) {
  const LikeBoardNum = async (boardNo) => {
    //post
    await axios
      //좋아요 click발생한 게시물번호 보내기
      .post("http://localhost:8080/api/likeupdate", boardNo)
      .then((response) => {
        boardNo(response.data);
      })
      .catch(function (err) {
        console.log(err);
        alert("오류발생하였습니다. 잠시후 다시 눌러주세요");
      });
  };
}
