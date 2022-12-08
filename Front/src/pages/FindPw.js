import Header from "../components/Header";
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  Button,
  CssBaseline,
  TextField,
  FormControl,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material/";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import styled from "styled-components";
import { SendCertiNumAPI } from "../Api/FindPwData";

//mui 템플릿 사용
const Boxs = styled(Box)`
  padding-bottom: 40px !important;
`;

const FindPw = () => {
  // mui 테마
  const theme = createTheme();
  // 아이디
  const [userId, setUserId] = useState("");
  // 생년월일
  const [birth, setBirth] = useState("");
  // 이메일
  const [email, setEmail] = useState("");
  // 인증 번호
  const [inputNum, setinputNum] = useState("");
  const [certiNum, setCertiNum] = useState("");
  // 페이지 이동 함수
  const navigate = useNavigate();

  const userIdhandler = (e) => {
    setUserId(e.target.value);
  };

  const birthhandler = (e) => {
    setBirth(e.target.value);
  };

  const emailhandler = (e) => {
    setEmail(e.target.value);
  };

  const inputNumHandler = (e) => {
    setinputNum(e.target.value);
  };

  //인증번호 확인 버튼 클릭 시, 삼항연산자 실행(인증번호 입력값이 동일할 경우에 비밀번호 재설정페이지로 넘어가도록.)
  const passResetPw = () => {
    <div>
      {setCertiNum === inputNum
        ? navigate("/resetPw")
        : alert("인증번호가 틀렸습니다. 다시 시도해주세요")}
    </div>;
  };

  //인증번호 발송확인alert창
  const SendCertiNum = () => {
    console.log(userId);
    console.log(email);
    SendCertiNumAPI(email, userId, birth).then((response) => {
      // console.log(response.data); // 인증번호
      console.log(response, "인증번호 전송"); // response가 인증번호
      console.log("----------------");
      if (response !== true) {
        alert("인증번호가 발송되었습니다.");
        setCertiNum(response);
        console.log(setCertiNum);
        sessionStorage.setItem("userid", document.getElementById("id"));
        sessionStorage.setItem("birth", document.getElementById("birth"));
        sessionStorage.setItem("email", document.getElementById("email"));
      } else {
        alert("없는 email입니다. 다시 입력해주세요");
      }
      // console.log("이메일로 인증번호 발송");
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            비밀번호 찾기
          </Typography>

          <Grid container spacing={1.5}>
            <Grid item xs={12}>
              <TextField
                required
                autoFocus
                fullWidth
                type="id"
                id="id"
                name="id"
                // value={userId}
                onChange={userIdhandler}
                label="아이디"
                // error={idError !== "" || false}
              />
            </Grid>

            {/* <FormHelperTexts>{idError}</FormHelperTexts> */}
            <Grid item xs={12}>
              <TextField
                required
                autoFocus
                fullWidth
                type="email"
                id="email"
                name="email"
                // value={email}
                onChange={emailhandler}
                label="이메일 주소"
                // error={emailError !== "" || false}
              />
            </Grid>
            {/* <FormHelperTexts>{emailError}</FormHelperTexts> */}
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                type="birth"
                id="birth"
                name="birth"
                // value={birth}
                onChange={birthhandler}
                label="생년월일 입력(ex.1998-02-15)"
                // error={birthError !== "" || false}
              />
            </Grid>
            {/* <FormHelperTexts>{birthError}</FormHelperTexts> */}
          </Grid>

          <button type="submit" className="numgo" onClick={SendCertiNum}>
            인증번호 발송
          </button>

          <Boxs
            component="form"
            noValidate
            onSubmit={passResetPw}
            sx={{ mt: 3 }}
          >
            <FormControl component="fieldset" variant="standard">
              <Grid item xs={12}>
                <TextField
                  required
                  autoFocus
                  fullWidth
                  type="varchar"
                  id="inputNum"
                  onChange={inputNumHandler}
                  name="inputNum"
                  label="인증번호 6자리"
                />
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                size="large"
              >
                인증번호 확인
              </Button>
            </FormControl>
          </Boxs>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default FindPw;
