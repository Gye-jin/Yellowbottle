import axios from "axios";

export default function ForPostFindIdData(
  findIdData,
  setUserId, //FindId.js에 const정의해둔 것을 가져오기 위해 인수로 지정
  setRegisterError //FindId.js에 const정의해둔 것을 가져오기 위해 인수로 지정
) {
  const forPostFindIdData = async (findIdData) => {
    // post
    await axios
      // spring에 보낼 url : controller 와 Dto를 확인해서 수정하자!
      .post("http://localhost:8080/api/findId", findIdData)
      .then((response) => {
        //id담긴 response
        setUserId(response.data);
        console.log(response.data, "아이디찾기 성공");
      })
      .catch(function (err) {
        console.log(err);
        setRegisterError(
          "해당 정보와 동일한 아이디가 존재하지 않습니다. 다시 한번 확인해 주세요."
        );
      });
  };
  forPostFindIdData(findIdData);
}
