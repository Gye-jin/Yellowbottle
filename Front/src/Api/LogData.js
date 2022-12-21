import axios from "axios";
import Swal from "sweetalert2";

// LoginData
// 입력된 loginData값들을 백에 보내는 함수
export function ForPostLoginData(loginData, setRegisterError) {
  const postLoginData = async (loginData) => {
    // post
    await axios
      // 입력된 joinData를 백에 보낸다.
      .post("http://localhost:8080/api/login", loginData)
      .then((response) => {
        // response 는 백에서 프론트로 ... request는 프론트에서 백으로
        // 백에서 반응(response)가 정상적으로 온다면 userId라는 키값과 백에서 보내주는 세션값을 value라고 세션에 저장한다.
        if (response.data !== "") {
          sessionStorage.setItem("sessionId", response.data);
          Swal.fire({
            icon: "success",
            title: `환영합니다 ${loginData.userId}님`,
            showConfirmButton: false,
            timer: 1500,
          });
          setTimeout(() => {
            window.location.href = "/";
          }, 1000);
        } else {
          Swal.fire({
            icon: "error",
            title: "존재하지않는 회원정보입니다",
            showConfirmButton: false,
            timer: 1500,
          });
        }
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
      returnId = true;
    });
  return returnId;
};

// 중복된 아이디를 확인한 반응을 보고 사용가능여부를 알려주는 함수
export const duplicationCheck = (setUsableId, userId, setIdError) => {
  // userId는 id라는 id를 가진 문서안요소의 value이다.
  // duplicationCheckAPI(userId)를 통해 아이디 중복여부 반응을 받는다.
  duplicationCheckAPI(userId).then((response) => {
    if (response === false) {
      // 백에서 받은 반응(response)의 상태값이 변하지 않았다면 사용가능한 아이디
      Swal.fire({
        icon: "success",
        title: "사용가능한 아이디입니다",
        showConfirmButton: false,
        timer: 1500,
      });
      setUsableId(true);
      setIdError("");
    } else {
      // 백에서 받은 반응(response)의 상태값이 false에서 다른 값으로 변했다면 중복된 아이디
      Swal.fire({
        icon: "error",
        text: "🌝중복된 아이디입니다.🌝",
        showConfirmButton: false,
        timer: 1500,
      });
    }
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
        Swal.fire({
          title: "회원가입에 성공하셨습니다🎉",
          text: "Yellowbottle에서 소중한 시간을 보내세요",
          showConfirmButton: false,
          timer: 2000,
        });
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      })
      .catch(function (err) {
        // 백에서 오류(err)가 온다면 회원가입 실패
        Swal.fire({
          icon: "error",
          text: "🌚회원가입에 실패하셨습니다🌝",
          showConfirmButton: false,
          timer: 1500,
        });
        setRegisterError("🌚다시 확인해주세요🌝");
      });
  };
  // 위에서 만든 함수를 postJoinData 가 회원가입 페이지에서 실행되면 실행
  postJoinData(joinData);
}

// FindPwData
// 인증번호 발송을 위해 입력한 값들을 백에서 확인해 해당 유저가 있다면 인증번호를 백에서 부여한다.
export const SendCertiNumAPI = async (findPwData, setCertiNum) => {
  let returnCertiNum;
  // 이메일, 아이디, 생년월일 파라메터들을 백에 보내준다.
  await axios
    .post("http://localhost:8080/api/findPw", findPwData)
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
export function ForSendCertiNum(findPwData, setCertiNum) {
  const sendCertiNum = () => {
    SendCertiNumAPI(findPwData, setCertiNum).then((response) => {
      // response는 인증번호
      if (response !== 0) {
        // 세션 발급 전 기존에 존재하는 세션 삭제
        sessionStorage.clear();
        //  만약 반응이 0이 아니라면 인증번호, 세션 발급
        Swal.fire({
          // position: 'top-end',
          icon: "success",
          title: "인증번호가 발송되었습니다.",
          showConfirmButton: false,
          timer: 1500,
        });
        sessionStorage.setItem("userId", findPwData.userId);
        sessionStorage.setItem("birth", findPwData.birth);
        sessionStorage.setItem("email", findPwData.email);
      } else {
        //  반응(response)가 0이라면 경고문구 출력
        Swal.fire({
          icon: "error",
          text: "🌚존재하지 않은 회원정보입니다.🌝",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
  sendCertiNum();
}

// 인증번호 확인 버튼을 눌렀을 때 사용자가 입력한 인증번호와 인증번호 발송버튼을 눌렀을 때 발급된 userId session을 백으로 보내 response 또는 err 받는 함수
export const passResetPw = async () => {
  // post
  const inputNum = document.getElementById("inputNum").value;
  await axios
    // 백에 입력한 인증번호와 userSession을 request한다.
    .get("http://localhost:8080/api/checkCertifiedNo", {
      params: {
        userId: sessionStorage.getItem("userId"),
        certifiedNo: inputNum,
      },
    })
    // 백에서 response가 정상적으로 오면
    .then((response) => {
      console.log(response, "인증번호 인증 성공!");
      Swal.fire({
        icon: "success",
        title: "인증번호인증 성공!",
        text: "비밀번호변경페이지로 이동합니다",
        showConfirmButton: false,
        timer: 1000,
      });
      setTimeout(() => {
        window.location.href = "/resetPw";
      }, 1000);
    })
    .catch(function (err) {
      console.log(err, "에러 ㅠㅠ");
      Swal.fire({
        icon: "error",
        text: "🌚인증번호가 일치하지않습니다.🌝",
        showConfirmButton: false,
        timer: 1500,
      });
    });
};

// FindIdData
// createFindData함수에서 유효성 검사를 거친 바디를 백에 보내주는 함수
export function ForPostFindIdData(
  findIdData,
  setRegisterError //FindId.js에 const정의해둔 것을 가져오기 위해 인수로 지정
) {
  const forPostFindIdData = async (findIdData) => {
    // post
    await axios
      // 입력된 findIdData를 백에 보낸다.
      .post("http://localhost:8080/api/findId", findIdData)
      .then((response) => {
        // 백에서 반응(response)이 정상적으로 온다면 성공
        console.log(response);
        response.data.length === 0
          ? Swal.fire({
              icon: "error",
              text: "🌝존재하는 아이디가 없습니다🌝",
              showConfirmButton: false,
              timer: 1500,
            })
          : Swal.fire({
              title: "귀하의 아이디입니다.",
              text: response.data,
            });
      })
      .catch((err) => {
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
        userId: sessionStorage.getItem("userId"),
        userPw: password,
      })
      // 백에서 반응(response)가 정상적으로 오면 성공메세지와 함께 로그인 페이지로 이동
      .then(function (response) {
        // 비밀번호가 정상적으로 변경되면 세션이 clear된다.
        // sessionStorage.clear();
        sessionStorage.clear();
        Swal.fire({
          icon: "success",
          title: "비밀번호 변경성공!",
          text: "로그인화면으로 이동합니다",
          showConfirmButton: false,
          timer: 2000,
        });
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      })
      // 백에서 오류(err)가 온다면 밑에 오류메세지를 보여준다.
      .catch(function (err) {
        Swal.fire({
          icon: "error",
          title: "🌝잘못된 정보입니다. 다시 입력해주세요🌝",
          showConfirmButton: false,
          timer: 1000,
        });
        setRegisterError(
          "비밀번호 변경에 실패하였습니다. 다시한번 확인해 주세요."
        );
      });
  };
  // 이 코드를 통해 비밀번호 변경 버튼을 눌렀을 때 resetPwPost 함수가 실행된다.
  resetPwPost(password);
}

// UpdateUser
// 회원정보수정 페이지에서 쓰일 기존 회원정보 불러오는 함수
export const passUpdateUser = async (userSession) => {
  const response = await axios.post("http://localhost:8080/api/readUserData", {
    sessionId: userSession,
  });
  return response.data;
};

// 입력된 updateData값들을 백에 보내는 함수
export function ForPostUpdateData(updateData, setRegisterError) {
  // console.log(updateData, "백으로 보내기 전 콘솔!");
  const postUpdateData = async (updateData) => {
    // post
    await axios
      // 입력된 joinData를 백에 보낸다.
      .post("http://localhost:8080/api/updateUser", updateData)
      .then((response) => {
        console.log(response);
        if (response.data === true) {
          Swal.fire({
            icon: "success",
            title: "회원정보 변경성공!",
            text: "로그인화면으로 이동합니다",
            showConfirmButton: false,
            timer: 2000,
          });
          setTimeout(() => {
            window.location.href = "/";
          }, 2000);
        } else {
          Swal.fire({
            icon: "error",
            title: "🌚잘못된 정보입니다. 다시 입력해주세요🌝",
            showConfirmButton: false,
            timer: 1200,
          });
        }
      })
      // 로그인 틀렸을때 경고창 나오도록 설정
      .catch((err) => {
        // 백에서 오류(err)가 온다면 회원가입 실패
        setRegisterError("🌚잘못된 정보입니다. 다시 입력해주세요🌝");
      });
  };
  // 위에서 만든 postLoginData가 로그인 페이지에서 실행되면 실행.
  postUpdateData(updateData);
}

// DeleteUser
// 회원탈퇴함수
export function ForPostDeleteData(deleteData) {
  const postDeleteData = async (deleteData) => {
    await axios
      .post("http://localhost:8080/api/deleteUser", deleteData)
      .then((response) => {
        sessionStorage.removeItem("sessionId");
        Swal.fire({
          icon: "error",
          text: "🤬회원탈퇴한 당신은 환경파괴자🤬",
          showConfirmButton: false,
          timer: 2000,
        });
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "🌍환경지킴이 포기하실건가요?🌍",
          showConfirmButton: false,
          timer: 1000,
        });
      });
  };
  postDeleteData(deleteData);
}
