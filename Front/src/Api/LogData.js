import axios from "axios";

// LoginData
// 입력된 loginData값들을 백에 보내는 함수
export function ForPostLoginData(loginData, setRegisterError) {
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
        setRegisterError("🦄");
      });
  };
  // 위에서 만든 postLoginData가 로그인 페이지에서 실행되면 실행.
  postLoginData(loginData, setRegisterError);
}

// JoinData
// 회원가입 창에서 입력한 아이디(userId)가 중복된 아이디인지 확인하고 반응값을 남기는 함수
export const duplicationCheckAPI = async (userId) => {
  let returnId;
  await axios
    // 입력된 아이디를 백에 보낸다.
    .post("http://localhost:8080/api/userSearch", {
      userId: userId,
    })
    // 백에서 정상적으로 response가 오면 입력한 아이디값을  returnId로 선언한다.
    .then((response) => {
      returnId = response.data;
    })
    // 백에서 에러가 오면 입력한 아이디상태를 false에서 true로 변경한다.
    .catch(function (err) {
      console.log(err);
      returnId = true;
    });
  return returnId;
};

// 중복된 아이디를 확인한 반응을 보고 사용가능여부를 알려주는 함수
export const duplicationCheck = (setUsableId) => {
  // userId는 id라는 id를 가진 문서안요소의 value이다.
  const userId = document.getElementById("id").value;
  // duplicationCheckAPI(userId)를 통해 아이디 중복여부 반응을 받는다.
  duplicationCheckAPI(userId).then((response) => {
    console.log(response);
    if (response === false) {
      // 백에서 받은 반응(response)의 상태값이 변하지 않았다면 사용가능한 아이디
      alert("사용 가능한 아이디입니다");
      setUsableId(response);
    } else {
      // 백에서 받은 반응(response)의 상태값이 false에서 다른 값으로 변했다면 중복된 아이디
      alert("중복된 아이디입니다.");
      setUsableId(response);
    }
    // 중복확인이 잘 작동되는지 확인하는 console.log
    console.log("중복체크");
  });
};

export function ForPostJoinData(joinData, setRegisterError) {
  // 입력된 joinData값들을 백에 보내는 함수
  const postJoinData = async (joinData) => {
    // post
    await axios
      // 입력된 joinData를 백에 보낸다.
      .post("http://localhost:8080/api/join", joinData)
      .then((response) => {
        // 백에서 반응(response)이 정상적으로 온다면 성공
        console.log(response, "성공");
        // 성공하면 로그인 화면으로 이동
        alert("회원가입에 성공하셨습니다.");
        window.location.href = "/login";
      })
      .catch(function (err) {
        // 백에서 오류(err)가 온다면 회원가입 실패
        console.log(err);
        setRegisterError("회원가입에 실패하였습니다. 다시한번 확인해 주세요.");
      });
  };
  // 위에서 만든 함수를 postJoinData 가 회원가입 페이지에서 실행되면 실행
  postJoinData(joinData);
}

// FindPwData
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
        // 세션 발급 전 기존에 존재하는 세션 삭제
        sessionStorage.clear();
        //  만약 반응이 0이 아니라면 인증번호, 세션 발급
        alert("인증번호가 발송되었습니다.");
        sessionStorage.setItem("Id", userId);
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

// 인증번호 확인 버튼을 눌렀을 때 사용자가 입력한 인증번호와 인증번호 발송버튼을 눌렀을 때 발급된 userId session을 백으로 보내 response 또는 err 받는 함수
export const passResetPw = async (inputNum) => {
  // post
  await axios
    // 백에 입력한 인증번호와 userSession을 request한다.
    .get("http://localhost:8080/api/checkCertifiedNo", {
      params: {
        userId: sessionStorage.getItem("Id"),
        certifiedNo: inputNum,
      },
    })
    // 백에서 response가 정상적으로 오면
    .then((response) => {
      console.log(response, "인증번호 인증 성공!");
      alert("비밀번호변경 페이지로 이동합니다.😚");
      window.location.href = "/resetPw";
    })
    .catch(function (err) {
      console.log(err, "에러 ㅠㅠ");
      alert("잘못된 정보입니다. 다시 시도해주세요.");
    });
};

// FindIdData
// createFindData함수에서 유효성 검사를 거친 바디를 백에 보내주는 함수
export function ForPostFindIdData(
  findIdData,
  setUserId, //FindId.js에 const정의해둔 것을 가져오기 위해 인수로 지정
  setRegisterError //FindId.js에 const정의해둔 것을 가져오기 위해 인수로 지정
) {
  const forPostFindIdData = async (findIdData) => {
    // post
    await axios
      // 입력된 findIdData를 백에 보낸다.
      .post("http://localhost:8080/api/findId", findIdData)
      .then((response) => {
        // 백에서 반응(response)이 정상적으로 온다면 성공
        setUserId(response.data);
        console.log(response.data + "아이디찾기 성공");
      })
      .catch(function (err) {
        // 백에서 오류(err)가 뜬다면 아이디 찾기 실패
        console.log(err);
        setRegisterError(
          "해당 정보와 동일한 아이디가 존재하지 않습니다. 다시 한번 확인해 주세요."
        );
      });
  };
  // 위에서 만든 ForPostFindIdData가 실행되면 forPostFindIdData가 실행된다.
  forPostFindIdData(findIdData);
}

// ResetPwData
// 사용자가 변경하고자하는 비밀번호를 백에 보내주는 함수
export function ForResetPwPost(password, setRegisterError) {
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
        console.log(response, "비밀번호 변경 성공");
        alert("비밀번호 변경에 성공하셨습니다!😁");
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
