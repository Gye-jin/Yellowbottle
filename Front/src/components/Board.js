// import React, { useState, useEffect } from "react";
// import { BoardFetchData } from "../Api/BoardData";
// import LikeCountData from "../Api/LikeCountData";

// // function Board() {
// // const { boardNumber } = useParams;

// //App.js에서 설정한 각 요소들의 이름을 가져와 사용할거임.
// const Boards = ({boards}) => {
//   // const [boards, setBoards] = useState([]);
//   const [like, setlike] = useState(0);
//   const [pageNo, setPageNo] = useState(1);

//   useEffect(() => {
//     const response = BoardFetchData(pageNo);
//     // setBoards(response);
//     response.then((data) => setBoards(data));
//   }, []);
//   console.log(boards);
//   console.log(pageNo); //추후 스크롤로 올려줄 예정
//     return (
//     <>
//     <div>
//       <ul>
//       {boards ? (boards.board.map((board)=>(<li key={boardNo}><a href={"http://localhost:3000/board/" + boardNo}></li></ul></div>
//       {/* 단일 Board 구성 */}
//       <div className="board">
//         <h3>작성자id{boards.userId}</h3>

//         {/* 이미지 출력(현재 임시이미지) */}
//         <img
//           className="boardImage"
//           src="img/czero2.jpg"
//           // src = {`http://localhost:8080/api/image/${imageName}`} />}
//           width="350" //350,300 고정값으로 가되, 추후 반응형 세부작업 가능성
//           height="300"
//           alt="boardimage"
//         />
//         <div>
//           <h3>
//             <span>
//               {boards.likeCount}
//               <button onClick={() => LikeCountData(like)}>❤️</button>
//               {/* <LookupCount /> */}
//             </span>
//             {/* {like_count} */}
//           </h3>
//         </div>
//       </div>
//       <div>{boards.boardContent}</div>
//     </>
//   );
// };

// export default Boards;
