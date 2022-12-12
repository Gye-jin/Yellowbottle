import axios from "axios";

// 사용자가 변경하고자하는 비밀번호를 백에 보내주는 함수
export default function ForResetPwPost(password, setRegisterError) {
  const resetPwPost = async (password) => {
    // post
    await axios
      // 백에 userId와 userPw를 전송한다.
      .post("http://localhost:8080/api/updatePw", {
        userId: sessionStorage.getItem("Id"),
        userPw: password,
      })
      // 백에서 반응(response)가 정상적으로 오면 성공메세지와 함께 로그인 페이지로 이동
      .then(function (response) {
        // 비밀번호가 정상적으로 변경되면 세션이 clear된다.
        // sessionStorage.clear();
        console.log(response, "성공");
        alert("비밀번호 변경에 성공하셨습니다!");
        window.location.href = "/login";
      })
      // 백에서 오류(err)가 온다면 밑에 오류메세지를 보여준다.
      .catch(function (err) {
        console.log(err);
        setRegisterError(
          "비밀번호 변경에 실패하였습니다. 다시한번 확인해 주세요."
        );
      });
  };
  // 이 코드를 통해 비밀번호 변경 버튼을 눌렀을 때 resetPwPost 함수가 실행된다.
  resetPwPost(password);
}
