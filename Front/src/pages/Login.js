import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  CssBaseline,
  TextField,
  FormControl,
  FormHelperText,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material/";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import styled from "styled-components";
import "../App.css";
import Header from "../components/Header";
import ForPostLoginData from "../Api/LoginData";

// mui의 기본 내장 css
const FormHelperTexts = styled(FormHelperText)`
  width: 100%;
  padding-left: 16px;
  font-weight: 700 !important;
  color: #d32f2f !important;
`;
const Boxs = styled(Box)`
  padding-bottom: 40px !important;
`;

// 로그인 페이지
const Login = () => {
  // mui 테마
  const theme = createTheme();
  // 비밀번호 입력오류
  const [passwordError, setPasswordError] = useState("");
  // 아이디 입력오류
  const [idError, setIdError] = useState("");
  // 로그인버튼 눌렀을 때 오류
  const [registerError, setRegisterError] = useState("");
  // 이동시키는 함수
  const navigate = useNavigate();

  // 로그인 버튼 누를때 실행되는 함수: loginData(입력된 값)을 유효성 검사를 통해 LoginData.js에 있는 ForPostLoginData에 보내준다.
  const createLoginData = (e) => {
    // 실행시 화면새로고침 방지
    e.preventDefault();
    // FormData를 통해 각각의 입력값들이 변화되면 바뀐 value값 확인 가능!
    const data = new FormData(e.currentTarget);
    const loginData = {
      userId: data.get("id"), // id의  e.currentTarget.value
      userPw: data.get("password"),
    };
    // 입력된 값들을 loginData에 넣는다.
    const { userId, userPw } = loginData;
    console.log(loginData);

    // loginData에 넣은 각각의 값들은 유효성 검사를 거친다.
    // 아이디 유효성 체크
    const idRegex = /^[a-z]+[a-z0-9]{4,19}$/g;
    if (!idRegex.test(userId))
      setIdError("아이디는 영문자 또는 숫자 5~20자리로 입력해주세요");

    // 비밀번호 유효성 체크
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (!passwordRegex.test(userPw))
      // test()는 문자열 일치를 확인해준다. 또한 여기 있는 password는 위에 data.get("password")이다.
      setPasswordError(
        "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!"
      );
    else setPasswordError("");

    // 만약 위 유효성 검사를 모두 통과하면 ForPostLoginData를 실행한다.
    if (passwordRegex.test(userPw)) {
      ForPostLoginData(loginData, setRegisterError);
    }
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
            로그인
          </Typography>
          <Boxs
            component="form"
            noValidate
            onSubmit={createLoginData}
            sx={{ mt: 3 }}
          >
            <FormControl component="fieldset" variant="standard">
              <Grid container spacing={1.5}>
                {/* 아이디 입력칸 */}
                <Grid item xs={12}>
                  <TextField
                    required
                    autoFocus
                    fullWidth
                    type="id"
                    id="id"
                    name="id"
                    label="아이디"
                    error={idError !== "" || false}
                  />
                </Grid>
                {/* 유효성 검사를 통해 아이디가 형식에 맞지 않으면 밑에 빨간 글씨가 뜬다. */}
                <FormHelperTexts>{idError}</FormHelperTexts>
                {/* 비밀번호 입력칸 */}
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="password"
                    id="password"
                    name="password"
                    label="비밀번호"
                    error={passwordError !== "" || false}
                  />
                </Grid>
                {/* 유효성 검사를 통해 비밀번호가 형식에 맞지 않으면 밑에 빨간 글씨로 오류가 뜬다. */}
                <FormHelperTexts>{passwordError}</FormHelperTexts>
              </Grid>
              {/* 로그인 버튼을 누르면 위 입력한 데이터(loginData)를 백에 보낸다. */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                size="large"
              >
                로그인
              </Button>
            </FormControl>
            {/* 아이디찾기 버튼을 누를경우 해당 페이지로 이동한다. */}
            <Button
              className="loginPage-findId"
              onClick={() => navigate("/FindId")}
            >
              아이디찾기
            </Button>
            {/* 비밀번호찾기 버튼을 누를경우 해당 페이지로 이동한다. */}
            <Button
              className="loginPage-findPw"
              onClick={() => navigate("/FindPw")}
            >
              비밀번호찾기
            </Button>
            <br />
            {/* 회원가입 버튼을 누를경우 해당 페이지로 이동한다. */}
            <Button
              className="loginPage-join"
              onClick={() => navigate("/Join")}
            >
              회원가입
            </Button>
            {/* 입력한 값이 백에 정상적으로 전송되지 않는다면 오류가 뜬다. */}
            <FormHelperTexts>{registerError}</FormHelperTexts>
          </Boxs>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
