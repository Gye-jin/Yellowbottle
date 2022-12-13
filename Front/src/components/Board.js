import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BoardFetchData } from "../Api/BoardData";
import axios from "axios";

const Boards = () => {
  //백에서 보낸 10개씩 게시물을 담는 공간
  const [boards, setBoards] = useState([]);
  //페이지 하나당 10개의 게시물(spring참고)
  const [pageNo, setPageNo] = useState(1);
  // 추가 boards를 로드할지 안할지를 담기위한 state
  const [fetching, setFetching] = useState(false);

  // // 페이지 넘버 변경해주는 함수
  const fetchMoreBoards = async () => {
    // fetching을 true값으로 바꿔 fetching 값이 바뀌기 전까지 리렌더링 되는걸 방지
    setFetching(true);
    await axios
      // 백으로부터 기존pageNo + 1에 해당하는 페이지의 게시물(10개 묶음)을 가져온다.
      .get(`http://localhost:8080/api/Allboard?pageNo=${pageNo + 1}`)
      .then((response) => {
        console.log(response.data);
        setBoards(boards.concat(response.data));
        // setPageNo(pageNo + 1);
      })
      .catch((err) => {
        console.log(err);
        alert("비상 오류 발생!");
      });
    setFetching(false);
    console.log("왕왕   ::", fetching);
  };

  // 스크롤 이벤트 핸들러
  const handleScroll = () => {
    // 한페이지 전체 스크롤양
    const scrollHeight = document.documentElement.scrollHeight;
    // 사용자가 스크롤을 얼마나 내렸는지
    const scrollTop = document.documentElement.scrollTop;
    // 사용자가 보는 스크롤양
    const clientHeight = document.documentElement.clientHeight;
    // console.log(scrollTop + clientHeight + ":: 합");
    // console.log(scrollHeight + ":: 비교비교");
    // 페이지 끝에 도달하면 추가 데이터를 받아온다.
    if (scrollTop + clientHeight >= scrollHeight - 0.5) {
      console.log("스크롤 최하단 도착!");
      if (fetching === false) {
        console.log("되는데?");
        setPageNo(pageNo + 1);
        fetchMoreBoards();
      }
    }
  };
  // 스크롤 이벤트를 설정해준 useEffect
  useEffect(() => {
    // scroll이벤트 실행하면 handleScroll 함수 실행!
    window.addEventListener("scroll", handleScroll);
    return () => {
      // 실행한뒤 scroll event 제거!
      window.removeEventListener("scroll", handleScroll);
    };
  });
  // 초기 렌더링시 실천내용 화면에 게시물 10개 출력!
  useEffect(() => {
    // response는 해당페이지(게시물 10개 들어있음)
    const response = BoardFetchData(pageNo);
    response.then((data) => setBoards(data));
  }, []);
  // console.log(boards);
  console.log(fetching);
  console.log("현재 pageNo ::", pageNo); //추후 스크롤로 올려줄 예정
  return (
    <>
      <div>
        <ul>
          {/* 삼항연산자로 boards가 있을때 게시물번호 순으로 출력함. */}
          {boards ? (
            boards.map((board) => (
              <div key={board.boardNo}>
                <div href={"http://localhost:3000/board/" + board.boardNo}>
                  <div className="board">
                    <h3>{board.userId}</h3>
                    {/* 이미지 출력 */}
                    {/* React는 렌더링이 화면에 커밋된 후에 모든 효과를 실행한다. 즉, 데이터가 들어오기 전에 board.fileDTO.map을 실행시키며 이 데이터는 undefined로 나온다. */}
                    {/* 따라서 true && expression을 설정해서 앞에 값들이 들어오면 그때 expression을 실행시키게 하면된다! */}
                    {board.fileDTOs &&
                      board.fileDTOs.map((fileDTO) => (
                        <Link to={`/DetailBoard/${board.boardNo}`}>
                          <img
                            // React 라이브러리는 컴포넌트와 DOM요소 간의 관계를 이용해 리렌더링 여부를 결정한다. 따라서 불필요한 리렌더링을 방지하기 위해 각 자식 컴포넌트마다 독립적인 Key값을 넣어줘야한다.
                            key={fileDTO}
                            className="boardImage"
                            // 두개 이상의 자식을 붙여서 사용할때는 ${}를 따로 두개 쓰는 것이 아니라 ${} 하나에 + 를 사용해서 넣자!
                            src={`${fileDTO.filePath + fileDTO.fileName}`}
                            width="350" // 350,300 고정값으로 가되, 추후 반응형 세부작업 가능성
                            height="300"
                            alt="boardimage"
                          />
                        </Link>
                      ))}
                    <div>
                      <h3>
                        {/* <span>
                          {board.likeCount}
                          <button>❤️</button>
                        </span> */}
                      </h3>
                    </div>
                  </div>
                  <div>{board.boardContent}</div>
                </div>
              </div>
            ))
          ) : (
            <></>
          )}
        </ul>
      </div>
    </>
  );
};

export default Boards;
