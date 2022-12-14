import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/header/Header";
import { myPageFetchData } from "../../Api/UserData";

function MyPage() {
  // 백에서 보내준 데이터를 담아둘 공간 : 해당 유저가 올린 게시물, 댓글수 ...
  const [board, setBoard] = useState([]);
  // 사용자의 세션값
  const userSession = sessionStorage.getItem("sessionId");
  // 사용자 세션값에 따라 마이페이지 변경
  // const userId = useParams().userSession;
  const navigate = useNavigate();

  // userId의 세션값에 따른 user의 마이페이지 데이터를 백에서 받아오는 함수
  useEffect(() => {
    const response = myPageFetchData(userSession);
    response.then((data) => setBoard(data));
  }, []);
  console.log(board);
  return (
    <>
      <Header />
      <div>
        <ul></ul>
      </div>
    </>
  );
}

export default MyPage;
