import axios from "axios";

// 인증번호 발송 때 필요한 js

// export const ForPostFindPwData = () => {
//   const userId = document.getElementById("id").value;
//   const birth = document.getElementById("birth").value;
//   const email = document.getElementById("email").value;
//   console.log(userId);
//   console.log();
//   numGoAPI(email, userId, birth).then((response) => {
//     console.log(response);
//     if (response !== 0) {
//       alert("인증번호가 발송되었습니다.");
//       sessionStorage.setItem("userid", document.getElementById("id"));
//       sessionStorage.setItem("birth", document.getElementById("birth"));
//       sessionStorage.setItem("email", document.getElementById("email"));
//     } else {
//       alert("없는 email입니다. 다시 입력해주세요");
//     }
//     console.log("이메일로 인증번호 발송");
//   });
// };

export const numGoAPI = async (email, userId, birth, confNum, setconfNum) => {
  let return_value;
  await axios
    .post("http://localhost:8080/api/findPw", {
      email: email,
      userId: userId,
      birth: birth,
    })
    .then((response) => {
      setconfNum(response.data);
      return_value = response.data;
      console.log(confNum);
    })
    .catch(function (err) {
      console.log(err);
      return_value = true;
    });
  return return_value;
};
// export default FindId;
