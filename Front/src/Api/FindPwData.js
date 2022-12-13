import axios from "axios";

// 인증번호 발송을 위해 입력한 값들을 백에서 확인해 해당 유저가 있다면 인증번호를 백에서 부여한다.
export const SendCertiNumAPI = async (email, userId, birth, setCertiNum) => {
  let returnCertiNum;
  // 이메일, 아이디, 생년월일 파라메터들을 백에 보내준다.
  await axios
    .post("http://localhost:8080/api/findPw", {
      email: email,
      userId: userId,
      birth: birth,
    })
    // 백에서 해당 유저가 있다는 확인을 한다면 인증번호를 백에서 설정한다.
    .then((response) => {
      returnCertiNum = response.data;
      setCertiNum(returnCertiNum);
    })
    // 에러가 있다면 리턴값을 0으로 설정한다.
    .catch(function (err) {
      console.log(err);
      //  리턴값을 0으로 주어 ForSendCertiNum에서 경고문구 출력하도록 설정
      returnCertiNum = 0;
    });
  // 반응이 있다면 인증번호를 설정하고 없다면 리턴값을 0으로 설정한다.
  return returnCertiNum;
};

//인증번호 발송 버튼을 눌렀을 때 실행되는 함수: 옳게 입력한 이메일로 인증번호를 보낸다.
export function ForSendCertiNum(userId, email, birth, setCertiNum) {
  const sendCertiNum = () => {
    console.log(userId); // 아이디 확인
    console.log(email); // 비밀번호 확인
    SendCertiNumAPI(email, userId, birth, setCertiNum).then((response) => {
      // response는 인증번호
      console.log(response, "인증번호 전송 전 확인 메세지");
      if (response !== 0) {
        sessionStorage.clear();
        //  만약 반응이 0이 아니라면 인증번호, 세션 발급
        alert("인증번호가 발송되었습니다.");
        sessionStorage.setItem("userId", userId);
        sessionStorage.setItem("birth", birth);
        sessionStorage.setItem("email", email);
      } else {
        //  반응(response)가 0이라면 경고문구 출력
        alert("없는 email입니다. 다시 입력해주세요");
      }
      // console.log("이메일로 인증번호 발송");
    });
  };
  sendCertiNum();
}

//인증번호 확인 버튼 클릭 시, 삼항연산자 실행(인증번호 입력값이 동일할 경우에 비밀번호 재설정페이지로 넘어가도록.)
export const passResetPw = (certiNum, inputNum) => {
  certiNum == inputNum
    ? //  인증번호와 입력한 인증번호 값이 같다면 비밀번호 변경페이지로 이동
      (window.location.href = "/resetPw")
    : alert("인증번호가 틀렸습니다. 다시 시도해주세요");
};
