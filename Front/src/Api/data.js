import axios from "axios";

// duplicationCheckAPI.js .. 아이디 중복체크 때 필요한 js
export const duplicationCheckAPI = async (userId) => {
  let return_value;
  await axios
    .post("http://localhost:8080/api/userSearch", {
      userId: userId,
    })
    .then((response) => {
      return_value = response.data;
    })
    .catch(function (err) {
      console.log(err);
      return_value = true;
    });
  return return_value;
};

// 인증번호 발송 때 필요한 js
export const numGoAPI = async (email, userId, birth) => {
  let return_value;
  await axios
    .post("http://localhost:8080/api/findPw", {
      email: email,
      userId: userId,
      birth: birth,
    })
    .then((response) => {
      return_value = response.data;
    })
    .catch(function (err) {
      console.log(err);
      return_value = true;
    });
  return return_value;
};
