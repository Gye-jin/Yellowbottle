import axios from "axios";

//  MyPageData
// userId 세션값을 백에 보내주면 백에서 response로 해당 유저의 정보를 보내준다.
export const myPageFetchData = async (userId) => {
  const response = await axios.get(
    `http://localhost:8080/api/myPage/${userId}`
  );
  return response.data;
};

// AnotherUserPage
