import axios from "axios";

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

export default function PostJoinData(joinData, setRegisterError) {
  // 입력된 joinData값들을 백에 보내는 함수
  const joinDataPost = async (joinData) => {
    // post
    await axios
      // 백에 입력된 joinData를 보낸다.
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
        setRegisterError(
          "회원가입에 실패   하였습니다. 다시한번 확인해 주세요."
        );
      });
  };
  // 위에서 만든 함수를 PostJoinData가 회원가입 페이지에서 실행되면 실행
  joinDataPost(joinData);
}
