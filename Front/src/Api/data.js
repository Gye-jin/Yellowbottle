import axios from "axios";

// duplicationCheckAPI.js
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
