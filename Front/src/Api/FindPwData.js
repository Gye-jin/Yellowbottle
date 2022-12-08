import axios from "axios";

export const SendCertiNumAPI = async (email, userId, birth) => {
  let returnCertiNum;
  await axios
    .post("http://localhost:8080/api/findPw", {
      email: email,
      userId: userId,
      birth: birth,
    })
    .then((response) => {
      returnCertiNum = response.data;
      console.log(returnCertiNum);
    })
    .catch(function (err) {
      console.log(err);
      returnCertiNum = true;
    });
  return returnCertiNum;
};
