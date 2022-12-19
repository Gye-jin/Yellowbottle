import axios from "axios";

// MyPage & PersonPage
// userId 세션값을 백에 보내주면 백에서 response로 해당 유저의 세션과 연결된 정보를 보내준다.
export const myPageFetchData = async (userSession, setSessionUserId) => {
  await axios
    .post(`http://localhost:8080/api/mypage`, {
      sessionId: userSession,
    })
    .then((response) => {
      console.log("백에서 userId 불러오기 성공!", response);
      setSessionUserId(response.data);
    })
    .catch((err) => {
      console.log("첫번쨰 axios에서 오류오류오류!", err);
    });
};

// 위에서 받은 세션과 관련된 정보를 백에 다시 보내줘서 mapping된 해당 유저의 정보를 얻는다.
export const myAllData = async (userId) => {
  const response = await axios.get(
    `http://localhost:8080/api/mypage/${userId}`
  );
  return response.data;
};
