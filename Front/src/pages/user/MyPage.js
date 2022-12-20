import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import { myAllData, myPageFetchData } from "../../Api/UserData";
import { useNavigate } from "react-router-dom";

function MyPage() {
  // 현재 접속해 있는 세션유저의 유저아이디를 저장할 공간
  const [sessionUserId, setSessionUserId] = useState("");
  // 해당 userId가 올린 댓글,게시글,에디터 관련 정보를 저장할 공간
  const [myPageData, setMyPageData] = useState([]);
  // 등급별 이미지 주소값
  const [gradeImage, setGradeImage] = useState("/img/lowPlant.png");
  // 사용자의 세션값
  const userSession = sessionStorage.getItem("sessionId");
  // 이동시켜주는 함수
  const navigate = useNavigate();
  // 마이페이지 들어올경우 sessionId값을 통해 userId 불러옴
  useEffect(() => {
    myPageFetchData(userSession, setSessionUserId);
  }, []);
  // 사용자가 마이페이지에 접속할 경우 해당 sessionId가 올린 게시물과 댓글 정보를 불러오는 함수
  useEffect(() => {
    const response = myAllData(sessionUserId);
    response.then((data) => setMyPageData(data));
  }, [sessionUserId]);
  //  회원 댓글수와 게시글 수에 따른 이미지 변화
  useEffect(() => {
    const personCountComment = `${myPageData.countComment}`;
    const personCountBoard = `${myPageData.countBoard}`;
    if (personCountComment >= 30 && personCountBoard >= 30) {
      setGradeImage("/img/highPlant.png");
    } else if (personCountComment >= 20 && personCountBoard >= 20) {
      setGradeImage("/img/middlePlant.png");
    }
  }, [myPageData]);

  return (
    <>
      <Header />
      <div className="PersonPage-Outer">
        <div className="PersonPage-Inner">
          <div className="PersonPage-Information">
            <div className="PersonPage-Information-Log">
              {/* 사용자 아이디 */}
              <h1>{sessionUserId}</h1>
              {/* 회원정보수정 버튼 */}
              <button onClick={() => navigate("/updateUser")}>
                회원정보수정
              </button>
              {/* 회원탈퇴 버튼 */}
              <button onClick={() => navigate("/deleteUser")}>회원탈퇴</button>
            </div>
            <div className="PersonPage-Information-Grade">
              <img src={gradeImage} alt="imageAboutGrade" />
            </div>
            {/* 작성한 댓글과 게시글 수 */}
            <div className="PersonPage-Information-Board">
              <div>작성한 댓글 수 :{myPageData.countComment}</div>
              <div>게시글 수 :{myPageData.countBoard}</div>
            </div>
          </div>
          <br />
          <div className="PersonPage-image-grid">
            {/* 해당유저가 올린 게시물사진 모두 보여주는 함수 */}
            {myPageData.boards &&
              myPageData.boards.map((board) => (
                <div>
                  <img
                    key={board.boardNo}
                    src={`${board.filePath + board.fileName}`}
                    alt="myPageImage"
                    // 이미지 클릭시 해당 게시물의 상세보기로 넘어감
                    onClick={() => navigate(`/detailBoard/${board.boardNo}`)}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default MyPage;
