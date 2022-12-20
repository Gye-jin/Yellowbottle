// 게시글 작성 버튼을 눌렀을때 작동하는 함수: 회원은 게시글 작성페이지로, 비회원은 로그인 페이지로 이동
export const AccessAgreeBoardWrite = () => {
  sessionStorage.getItem("sessionId") !== null
    ? // 세션에 userId의 값이 null이 아니라면 그 사람은 게시물 작성 페이지 이동
      (window.location.href = "/boardWrite")
    : //  세션에 userId의 값이 null이라면 즉 비회원이라면 경고창과 함께 로그인 화면으로 이동
      alert("게시글 작성은 회원만 가능합니다.")(
        (window.location.href = "/login")
      );
};

// 사용자가 회원아이디를 클릭할 경우 개인페이지 접속 허용 여부
export const AccessAgreeUserPage = (userId) => {
  sessionStorage.getItem("sessionId") !== null
    ? // 세션에 userId의 값이 null이 아니라면 그 사람은 상대방 개인페이지 접속 허용
      (window.location.href = `/personPage/${userId}`)
    : //  세션에 userId의 값이 null이라면 즉 비회원이라면 경고창과 함께 로그인 화면으로 이동
      alert("개인페이지 확인은 회원만 가능합니다.")(
        (window.location.href = "/login")
      );
};

// 사용자가 상세보기 접속 허용 여부
export const AccessAgreeBoardDetail = (boardNo) => {
  sessionStorage.getItem("sessionId") !== null
    ? // 세션에 userId의 값이 null이 아니라면 게시물 상세페이지로 이동
      (window.location.href = `/detailBoard/${boardNo}`)
    : //  세션에 userId의 값이 null이라면 즉 비회원이라면 경고창과 함께 로그인 화면으로 이동
      alert("게시글 상세보기는 회원만 가능합니다.")(
        (window.location.href = "/login")
      );
};
