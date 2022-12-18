import axios from "axios";

// createFindData함수에서 유효성 검사를 거친 바디를 백에 보내주는 함수
export function ForContentData(
  category,
  setContent
  // setContent, //FindId.js에 const정의해둔 것을 가져오기 위해 인수로 지정
) {
  const forContentData = async (category) => {
    // post
    await axios
      // 입력된 findIdData를 백에 보낸다.
      .post("http://localhost:8080/api/readCategory", {
        contentCategory: category,
      })
      .then((response) => {
        // console.log(response.data)
        setContent(response.data);
        // return response.data
      })
      .catch(function (err) {
        console.log(err);
      });
  };
  forContentData(category);
}

// createFindData함수에서 유효성 검사를 거친 바디를 백에 보내주는 함수
export function ForSendMail(
  category,
  setContent
  // setContent, //FindId.js에 const정의해둔 것을 가져오기 위해 인수로 지정
) {
  const forSendMail = async (category) => {
    // post
    await axios
      // 입력된 findIdData를 백에 보낸다.
      .post("http://localhost:8080/api/readsendmail", {
        contentCategory: category,
      })
      .then((response) => {
        // console.log(response.data)
        setContent(response.data);
        // return response.data
      })
      .catch(function (err) {
        console.log(err);
      });
  };
  forSendMail(category);
}
