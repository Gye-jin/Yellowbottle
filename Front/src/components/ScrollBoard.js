// import axios from "axios";
// import React, { useState } from "react";

// export default function ScrollBoard() {
//     // 로딩중인지 아닌지를 담기위한 state
//     const [loading, setLoading] = useState(true);
//     // 백으로부터 받아온 실천내용 게시물 데이터를 배열에 저장
//     const [boardData, setBoardData] = useState([]);
//     // ?? 백으로부터 받아온 다음 페이지 데이터를 저장
//     const [boardPaging, setboardPaging] = useState<BoardPagingData>({ next: undefined });

//     const fetchBoardData = async () => {
//         // 로딩중인 상태로 전환
//         setLoading(true);

//         await axios
//         .get("http://localhost:8080/board/{boardNo}", )
//         .then((response) => {
//             // Get요청으로 받아온 데이터를 state에 넣어준다.
//             setBoardData
//         })
//     }

// }
