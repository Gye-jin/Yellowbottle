import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import { myAllData, myPageFetchData } from "../../Api/UserData";
import { useNavigate } from "react-router-dom";

function MyPage() {
  // 백에서 보내준 유저의 useId를 저장할 공간
  const [myUserId, setMyUserId] = useState("");
  // 해당 userId가 올린 댓글,게시글,에디터 관련 정보를 저장할 공간
  const [myPageData, setMyPageData] = useState([]);
  // 사용자의 세션값
  const userSession = sessionStorage.getItem("sessionId");
  // 이동시켜주는 함수
  const navigate = useNavigate();

  // 첫 렌더링시 userId의 세션값에 따른 user의 userId를 받아오는 함수
  useEffect(() => {
    myPageFetchData(userSession, setMyUserId);
  }, []);
  // myUserId가 바뀔때마다 해당 userId가 올린 게시물과 댓글 정보를 불러오는 함수
  useEffect(() => {
    const response = myAllData(myUserId);
    response.then((data) => setMyPageData(data));
  }, [myUserId]);

  console.log("myUserId ::", myUserId);
  console.log("myPageData ::", myPageData);
  return (
    <>
      <Header />
      <div>
        <h1>{myUserId}</h1>
        <div>댓글수 :{myPageData.countComment}</div>
        <div>게시글 수 :{myPageData.countBoard}</div>
        <button>회원정보수정</button>
        {/* 해당유저가 올린 게시물사진 모두 보여주는 함수 */}
        {myPageData.boards &&
          myPageData.boards.map((board) => (
            <img
              key={board.boardNo}
              className="myPage_Image"
              src={`${board.filePath + board.fileName}`}
              alt="myPageImage"
              // 이미지 클릭시 해당 게시물의 상세보기로 넘어감
              onClick={() => navigate(`/DetailBoard/${board.boardNo}`)}
            />
          ))}
      </div>
    </>
  );
}

export default MyPage;
