import axios from "axios";
import Swal from "sweetalert2";

// FeedBoardData
// 게시물 10개씩 피드에 가져오는 함수
export const boardFetchData = async (pageNo) => {
  // 전체 게시물(ID)보기 _피드게시물넘버에 맞게 가져오기.
  const response = await axios.get(
    `http://43.200.181.65:8080/Allboard?pageNo=${pageNo}`
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
    .get(`http://43.200.181.65:8080/Allboard?pageNo=${pageNo + 1}`)
    .then((response) => {
      setBoards(boards.concat(response.data));
    })
    .catch((err) => {});
  setFetching(false);
};

// 추천게시물 3개 가져오는 함수
export const recommendBoardFetchData = async (boardNo) => {
  // boardNo에 해당하는 recommendBoard 3개 가져오기
  const response = await axios.get(
    `http://43.200.181.65:8080/recomendBoard/${boardNo}`
  );
  return response.data;
};

// BoardWriteData
// 게시글작성페이지에서 작성한 이미지파일, 게시글내용, 유저세션을 백에 보내는 함수
export function ForPostBoardWrite(boardWriteData) {
  const postBoardWrite = async (boardWriteData) => {
    // post
    await axios
      // 입력된 데이터를 백에 보낸다.
      .post("http://43.200.181.65:8080/board", boardWriteData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        // 백에서 반응(response)이 정상적으로 온다면 성공
        addClusterNo(response.data);
        Swal.fire({
          icon: "success",
          title: "게시글 작성 성공🎉",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      })
      .catch(function (err) {
        // 백에서 오류(err)가 온다면 게시글 작성 실패
        Swal.fire({
          icon: "error",
          text: "🌚게시글 작성실패🌝",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      });
  };
  postBoardWrite(boardWriteData);
}
// 장고에서 군집번호 부여
export const addClusterNo = async (clusterData) => {
  await axios
    .post("http://43.200.181.65:8000/predict/", {
      boardNo: clusterData.boardNo,
      boardContent: clusterData.boardContent,
    })
    .then((res) => {
      // 장고에 보냄으로써 게시글 작성이 완료되면 해당 게시글로 이동
      window.location.href = `/detailBoard/${clusterData.boardNo}`;
    })
    .catch((err) => {
      window.location.href = "/feed";
    });
};

// DetailBoardData
// 특정 게시글 데이터 불러오는 함수
export const DetailBoardFetchData = async (boardNo) => {
  // 전체 게시물(ID)보기 _피드게시물넘버에 맞게 가져오기.
  const sessionId = sessionStorage.getItem("sessionId");
  const response = await axios.get(
    `http://43.200.181.65:8080/board/${boardNo}?sessionId=${sessionId}`
  );
  return response.data;
};

// 작성한 댓글 데이터 보내는 함수
export const postComment = async (commentWriteData) => {
  await axios
    .post("http://43.200.181.65:8080/insertComment", commentWriteData)
    .then((response) => {
      Swal.fire({
        icon: "success",
        title: "댓글 작성 성공🎉",
        showConfirmButton: false,
        timer: 1200,
      });
      setTimeout(() => {
        window.location.reload();
      }, 1200);
    })
    .catch(function (err) {
      Swal.fire({
        icon: "error",
        text: "🌚댓글 작성실패🌝",
        showConfirmButton: false,
        timer: 1500,
      });
    });
};

// 댓글 수정하기 요청
export const repostComment = async (newCommentData) => {
  await axios
    .post("http://43.200.181.65:8080/updateComment", newCommentData)
    .then((response) => {
      Swal.fire({
        icon: "success",
        title: "댓글 수정 성공🎉",
        showConfirmButton: false,
        timer: 1200,
      });
      setTimeout(() => {
        window.location.reload();
      }, 1200);
    })
    .catch(function (err) {
      Swal.fire({
        icon: "error",
        text: "🌚댓글 수정실패🌝",
        showConfirmButton: false,
        timer: 1200,
      });
      setTimeout(() => {
        window.location.reload();
      }, 1200);
    });
};

// 댓글 삭제 요청
export const deleteComment = async (deleteCommentData) => {
  await axios
    .post("http://43.200.181.65:8080/deleteComment", deleteCommentData)
    .then((response) => {
      Swal.fire({
        icon: "success",
        title: "댓글 삭제 성공🌍",
        showConfirmButton: false,
        timer: 1200,
      });
      {
        setTimeout(() => {
          window.location.reload();
        }, 1200);
      }
    })
    .catch(function (err) {
      Swal.fire({
        icon: "error",
        text: "🌚댓글 삭제실패🌝",
        showConfirmButton: false,
        timer: 1200,
      });
      setTimeout(() => {
        window.location.reload();
      }, 1200);
    });
};

// 게시글 삭제 함수
export const postDeleteBoardData = async (deleteBoardData) => {
  await axios
    .post("http://43.200.181.65:8080/boarddelete", deleteBoardData)
    .then((response) => {
      response.data
        ? Swal.fire({
            icon: "success",
            title: "게시글 삭제 성공🌍",
            showConfirmButton: false,
            timer: 1200,
          })(
            setTimeout(() => {
              window.location.href = "/feed";
            }, 1200)
          )
        : Swal.fire({
            icon: "error",
            text: "🌚게시글 삭제실패🌝",
            showConfirmButton: false,
            timer: 1200,
          });
    });
};

// BoardUpdate
// 게시글수정페이지에서 수정한 이미지파일, 게시글내용, 유저세션을 백에 보내는 함수
export function ForPostUpdateBoard(updateBoardData) {
  const postBoardUpdate = async (updateBoardData) => {
    // post
    await axios
      // 입력된 데이터를 백에 보낸다.
      .post("http://43.200.181.65:8080/boardupdate", updateBoardData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        // 백에서 반응(response)이 정상적으로 온다면 성공
        addClusterNo(response.data);
        Swal.fire({
          icon: "success",
          title: "게시글 수정 성공🌍",
          showConfirmButton: false,
          timer: 1200,
        });
        {
          setTimeout(() => {
            window.location.reload();
          }, 1200);
        }
      })
      .catch(function (err) {
        // 백에서 오류(err)가 온다면 게시글 작성 실패
        Swal.fire({
          icon: "error",
          text: "🌚게시글 수정실패🌝",
          showConfirmButton: false,
          timer: 1200,
        });
      });
  };
  postBoardUpdate(updateBoardData);
}
