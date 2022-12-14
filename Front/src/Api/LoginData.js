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
        // 백에서 반응(response)가 정상적으로 온다면 userId라는 키값과 백에서 보내주는 세션값을 value라고 세션에 저장한다.
        response.data
          ? sessionStorage.setItem(
              "userId",
              response.data
            )((window.location.href = "/"))
          : alert("🤘🏿😝😜🤘🏿" + " " + "로그인실패");
      })
      // 로그인 틀렸을때 경고창 나오도록 설정
      .catch((err) => {
        // 백에서 오류(err)가 온다면 회원가입 실패
        console.log(err);
        setRegisterError("로그인에 실패하였습니다. 다시한번 확인해 주세요.");
      });
  };
  // 위에서 만든 postLoginData가 로그인 페이지에서 실행되면 실행.
  postLoginData(loginData, setRegisterError);
}
