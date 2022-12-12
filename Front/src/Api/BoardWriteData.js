import axios from "axios";

export default function ForPostBoardWrite(boardWriteData) {
  const postBoardWrite = async (boardWriteData) => {
    console.log("fileImage::", boardWriteData.fileImage);
    console.log("boardContent::", boardWriteData.boardContent);
    console.log("userId::", boardWriteData.userId);
    // post
    await axios
      // 입력된 데이터를 백에 보낸다.
      .post("http://localhost:8080/api/board", boardWriteData, {
        Headers: { "content-type": "multipart/form-data" },
      })
      .then((response) => {
        // response 는 백에서 프론트로 ... request는 프론트에서 백으로
        // 백에서 반응(response)이 정상적으로 온다면 성공
        console.log(response, "성공");
        alert("😍게시글 작성 성공😍");
        // 로그인 성공시 메인화면으로 이동한다.
        window.location.href = "/feed";
      })
      .catch(function (err) {
        // 백에서 오류(err)가 온다면 회원가입 실패
        console.log(err);
        alert("게시글 작성에 실패하셨습니다.");
      });
  };
  postBoardWrite(boardWriteData);
}
