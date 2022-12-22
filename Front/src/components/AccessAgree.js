import Swal from "sweetalert2";
// 게시글 작성 버튼을 눌렀을때 작동하는 함수: 회원은 게시글 작성페이지로, 비회원은 로그인 페이지로 이동
export const AccessAgreeBoardWrite = (setWirteBoardModal) => {
  sessionStorage.getItem("sessionId") !== null
    ? // 세션에 userId의 값이 null이 아니라면 게시물 작성 팝업 실행
      setWirteBoardModal(true)
    : //  세션에 userId의 값이 null이라면 즉 비회원이라면 경고창과 함께 로그인 화면으로 이동
      Swal.fire({
        icon: "error",
        text: "해당컨텐츠는 로그인 후 이용가능합니다",
        showConfirmButton: false,
        timer: 1500,
      })(
        setTimeout(() => {
          window.location.href = "/login";
        }, 1500)
      );
};

// 사용자가 회원아이디를 클릭할 경우 개인페이지 접속 허용 여부
export const AccessAgreeUserPage = (userId) => {
  sessionStorage.getItem("sessionId") !== null
    ? // 세션에 userId의 값이 null이 아니라면 그 사람은 상대방 개인페이지 접속 허용
      (window.location.href = `/personPage/${userId}`)
    : //  세션에 userId의 값이 null이라면 즉 비회원이라면 경고창과 함께 로그인 화면으로 이동
      Swal.fire({
        icon: "error",
        text: "해당컨텐츠는 로그인 후 이용가능합니다",
        showConfirmButton: false,
        timer: 1500,
      })(
        setTimeout(() => {
          window.location.href = "/login";
        }, 1500)
      );
};

// 사용자가 상세보기 접속 허용 여부
export const AccessAgreeBoardDetail = (boardNo) => {
  sessionStorage.getItem("sessionId") !== null
    ? // 세션에 userId의 값이 null이 아니라면 게시물 상세페이지로 이동
      (window.location.href = `/detailBoard/${boardNo}`)
    : //  세션에 userId의 값이 null이라면 즉 비회원이라면 경고창과 함께 로그인 화면으로 이동
      Swal.fire({
        icon: "error",
        text: "해당컨텐츠는 로그인 후 이용가능합니다",
        showConfirmButton: false,
        timer: 1500,
      })(
        setTimeout(() => {
          window.location.href = "/login";
        }, 1500)
      );
};
