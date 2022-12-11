import axios from "axios";

// createFindData함수에서 유효성 검사를 거친 바디를 백에 보내주는 함수
export default function ForPostFindIdData(
  findIdData,
  setUserId, //FindId.js에 const정의해둔 것을 가져오기 위해 인수로 지정
  setRegisterError //FindId.js에 const정의해둔 것을 가져오기 위해 인수로 지정
) {
  const forPostFindIdData = async (findIdData) => {
    // post
    await axios
      // 입력된 findIdData를 백에 보낸다.
      .post("http://localhost:8080/api/findId", findIdData)
      .then((response) => {
        // 백에서 반응(response)이 정상적으로 온다면 성공
        setUserId(response.data);
        console.log(response.data, "아이디찾기 성공");
      })
      .catch(function (err) {
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
