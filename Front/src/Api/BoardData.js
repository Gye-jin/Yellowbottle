import axios from "axios";

// FeedBoardData
// 게시물 10개씩 피드에 가져오는 함수
export const boardFetchData = async (pageNo) => {
  // 전체 게시물(ID)보기 _피드게시물넘버에 맞게 가져오기.
  const response = await axios.get(
    `http://localhost:8080/api/Allboard?pageNo=${pageNo}`
  );
  return response.data;
};

// 추천게시물 3개 가져오는 함수
export const recommendBoardFetchData = async (boardNo) => {
  // boardNo에 해당하는 recommendBoard 3개 가져오기
  const response = await axios.get(
    `http://localhost:8080/api/recomendBoard/${boardNo}`
  );
  return response.data;
};
// 페이지 넘버 변경해주는 함수
export const fetchMoreFeedBoard = async (
  setFetching,
  pageNo,
  setBoards,
  boards
) => {
  // fetching을 true값으로 바꿔 fetching 값이 바뀌기 전까지 리렌더링 되는걸 방지
  setFetching(true);
  await axios
    // 백으로부터 기존pageNo + 1에 해당하는 페이지의 게시물(10개 묶음)을 가져온다.
    .get(`http://localhost:8080/api/Allboard?pageNo=${pageNo + 1}`)
    .then((response) => {
      console.log(response.data);
      setBoards(boards.concat(response.data));
    })
    .catch((err) => {
      console.log(err);
      alert("비상 오류 발생!");
    });
  setFetching(false);
};

// BoardWriteData
// 게시글작성페이지에서 작성한 이미지파일, 게시글내용, 유저세션을 백에 보내는 함수
export function ForPostBoardWrite(boardWriteData) {
  const postBoardWrite = async (boardWriteData) => {
    // post
    await axios
      // 입력된 데이터를 백에 보낸다.
      .post("http://localhost:8080/api/board", boardWriteData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        // 백에서 반응(response)이 정상적으로 온다면 성공
        console.log(response, "성공");
        alert("😍게시글 작성 성공😍");
        // 로그인 성공시 메인화면으로 이동한다.
        window.location.href = "/feed";
      })
      .catch(function (err) {
        // 백에서 오류(err)가 온다면 게시글 작성 실패
        console.log(err);
        alert("게시글 작성에 실패하셨습니다.😅");
      });
  };
  postBoardWrite(boardWriteData);
}

// DetailBoardData
// 특정 게시글 데이터 불러오는 함수
export const DetailBoardFetchData = async (boardNo) => {
  // 전체 게시물(ID)보기 _피드게시물넘버에 맞게 가져오기.
  const sessionId = sessionStorage.getItem("sessionId");
  const response = await axios.get(
    `http://localhost:8080/api/board/${boardNo}?SessionId=${sessionId}`
  );

  return response.data;
};
