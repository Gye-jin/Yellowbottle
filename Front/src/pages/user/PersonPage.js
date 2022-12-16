import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import { myAllData, myPageFetchData } from "../../Api/UserData";
import { useNavigate, useParams } from "react-router-dom";

function PersonPage() {
  // useParams.userId가 의미하는 것은 /mypage/:userId 중 userId의 변화하는 값을 의미하는 것이다.
  const personId = useParams().userId;
  // 현재 접속해 있는 세션유저의 유저아이디를 저장할 공간
  const [sessionUserId, setSessionUserId] = useState("");
  // 해당 userId가 올린 댓글,게시글,에디터 관련 정보를 저장할 공간
  const [myPageData, setMyPageData] = useState([]);
  // 사용자의 세션값
  const userSession = sessionStorage.getItem("sessionId");
  // 이동시켜주는 함수
  const navigate = useNavigate();
  // personId가 바뀔때마다 해당 userId가 올린 게시물과 댓글 정보를 불러오는 함수
  useEffect(() => {
    const response = myAllData(personId);
    response.then((data) => setMyPageData(data));
    // sessionStorage.removeItem("userId");
    // console.log("myPageData ::", myPageData);
  }, [personId]);
  // 접속한 유저 세션으로 얻은 userId와 useParams로 얻은 userId를 비교해 같으면 편집 권한 부여! 다르면 편집 권한 미부여
  useEffect(() => {
    myPageFetchData(userSession, setSessionUserId);
  }, []);
  // console.log("myUserId ::", myUserId);
  // console.log("myPageData ::", myPageData);
  return (
    <>
      <Header />
      <div>
        <h1>{personId}</h1>
        <div>댓글수 :{myPageData.countComment}</div>
        <div>게시글 수 :{myPageData.countBoard}</div>
        {/* 만약 해당페이지가 본인 마이페이지라면 회원정보수정 버튼 존재 and 타인페이지라면 회원정보수정 버튼 미존재 */}
        {personId === sessionUserId ? <button>회원정보수정</button> : <br />}
        {/* 해당유저가 올린 게시물사진 모두 보여주는 함수 */}
        {myPageData.boards &&
          myPageData.boards.map((board) => (
            <img
              key={board.boardNo}
              className="myPage_Image"
              src={`${board.filePath + board.fileName}`}
              alt="myPageImage"
              // 이미지 클릭시 해당 게시물의 상세보기로 넘어감
              onClick={() => navigate(`/detailBoard/${board.boardNo}`)}
            />
          ))}
      </div>
    </>
  );
}

export default PersonPage;
