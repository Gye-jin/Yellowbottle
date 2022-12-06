import axios from "axios";

// findEqeulAPI.js
export const findEqeulAPI = async (userId, email, birth) => {
  let return_value;
  await axios
    .post("http://localhost:8080/api/findId", {
      userId: userId,
      email: email,
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
