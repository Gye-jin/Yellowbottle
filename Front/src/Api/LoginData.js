import axios from "axios";

export default function ForPostLoginData(loginData, setRegisterError) {
  // 입력된 loginData값들을 백에 보내는 함수
  console.log(loginData);
  const postLoginData = async (loginData) => {
    // post
    await axios
      // 입력된 joinData를 백에 보낸다.
      .post("http://localhost:8080/api/login", loginData)
      .then((response) => {
        // response 는 백에서 프론트로 ... request는 프론트에서 백으로
        // 백에서 반응(response)이 정상적으로 온다면 성공
        console.log(response, "성공");
        // 로그인 성공시 userid를 value값으로 세션에 저장한다.
        sessionStorage.setItem("userId", document.getElementById("id").value);
        // 로그인 성공시 메인화면으로 이동한다.
        window.location.href = "/";
      })
      .catch(function (err) {
        // 백에서 오류(err)가 온다면 회원가입 실패
        console.log(err);
        setRegisterError("로그인에 실패하였습니다. 다시한번 확인해 주세요.");
      });
  };
  // 위에서 만든 postLoginData가 로그인 페이지에서 실행되면 실행.
  postLoginData(loginData);
}
