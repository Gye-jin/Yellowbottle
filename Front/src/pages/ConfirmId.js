import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";

//     // post
//     await axios
//       // spring에 보낼 url : controller 와 Dto를 확인해서 수정하자!
//       .post("/member/findId", postData)
//       .then(function (response) {
//         console.log(response, "성공");
//         navigate.push("/findId/success");
//       })
//       .catch(function (err) {
//         console.log(err);
//         setRegisterError(
//           "해당 정보와 동일한 아이디가 존재하지 않습니다. 다시 한번 확인해 주세요."
//         ); //경고창추가*
//       });
//   };

//백에서 가져온 데이터
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const data = new FormData(e.currentTarget);
//     const joinData = {
//       email: data.get("email"),
//       birth: data.get("birth"),
//       id: data.get("id")
//     };
//     const { email, birth, id } = joinData;
//   }
// const FormHelperTexts = styled(FormHelperText)`
//   width: 100%;
//   padding-left: 16px;
//   font-weight: 700 !important;
//   color: #d32f2f !important;
// `;

function ConfirmId() {
  return (
    // <ThemeProvider theme={theme}>
    <>
      <Header />
      <div className="comfirmId">
        <p>
          <h3>해당하는 아이디는 {} 입니다</h3>
        </p>
      </div>

      <div className="butom">
        <p>
          <a href="/login">로그인 이동</a>
        </p>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <p>
          <a href="/findPw">비밀번호찾기</a>
        </p>
      </div>
      {/* </ThemeProvider> */}
      </>
  );
}

export default ConfirmId;