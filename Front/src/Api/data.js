import axios from "axios";

export const SendCertiNumAPI = async (email, userId, birth, setCertiNum) => {
  let return_value;
  await axios
    .post("http://localhost:8080/api/findPw", {
      email: email,
      userId: userId,
      birth: birth,
    })
    .then((response) => {
      setCertiNum(response.data);
      return_value = response.data;
      console.log(response.data);
    })
    .catch(function (err) {
      console.log(err);
      return_value = true;
    });
  return return_value;
};

// duplicationCheckAPI.js
export const duplicationCheckAPI = async (userId) => {
  let return_value;
  await axios
    .post("http://localhost:8080/api/join", {
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
