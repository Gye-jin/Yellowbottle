import axios from "axios";

export default function ForPostBoardWrite(boardWriteData) {
  const postBoardWrite = async (boardWriteData) => {
    // post
    await axios
      // 입력된 데이터를 백에 보낸다.
      .post("http://localhost:8080/api/board", boardWriteData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        // 백에서 반응(response)이 정상적으로 온다면 성공
        console.log(response, "성공");
        alert("😍게시글 작성 성공😍");
        // 로그인 성공시 메인화면으로 이동한다.
        window.location.href = "/feed";
      })
      .catch(function (err) {
        // 백에서 오류(err)가 온다면 게시글 작성 실패
        console.log(err);
        alert("게시글 작성에 실패하셨습니다.😅");
      });
  };
  postBoardWrite(boardWriteData);
}
