import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
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

// mui의 css 우선순위가 높기때문에 important를 설정 - 실무하다 보면 종종 발생 우선순위 문제
const FormHelperTexts = styled(FormHelperText)`
  width: 100%;
  padding-left: 16px;
  font-weight: 700 !important;
  color: #d32f2f !important;
`;

const Boxs = styled(Box)`
  padding-bottom: 40px !important;
`;

const Login = () => {
  const theme = createTheme();
  const [passwordError, setPasswordError] = useState("");
  // 아이디 추가
  const [idError, setIdError] = useState("");
  const [registerError, setRegisterError] = useState("");
  const navigate = useNavigate();

  const loginDataPost = async (loginData) => {
    // post
    await axios
      // spring에 보낼 url : controller 와 Dto를 확인해서 수정하자!
      .post("http://localhost:8080/api/login", loginData)
      .then(function (response) {
        // response 는 백에서 프론트로 ... request는 프론트에서 백으로
        console.log(response, "성공");
        sessionStorage.setItem("userId", document.getElementById("id").value);
        navigate("/");
      })
      .catch(function (err) {
        console.log(err);
        setRegisterError("로그인에 실패하였습니다. 다시한번 확인해 주세요.");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const loginData = {
      userId: data.get("id"), // id의  e.currentTarget.value
      userPw: data.get("password"),
    };
    const { userId, userPw } = loginData;
    console.log(loginData);

    // 비밀번호 유효성 체크
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (!passwordRegex.test(userPw))
      // test()는 문자열 일치를 확인해준다. 또한 여기 있는 password는 위에 data.get("password")이다.
      setPasswordError(
        "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!"
      );
    else setPasswordError("");

    if (passwordRegex.test(userPw)) {
      loginDataPost(loginData);
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
          {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} /> */}
          <Typography component="h1" variant="h5">
            로그인
          </Typography>
          <Boxs
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <FormControl component="fieldset" variant="standard">
              <Grid container spacing={1.5}>
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
                <FormHelperTexts>{idError}</FormHelperTexts>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="password"
                    id="password"
                    name="password"
                    label="비밀번호 (숫자+영문자+특수문자 8자리 이상)"
                    error={passwordError !== "" || false}
                  />
                </Grid>
                <FormHelperTexts>{passwordError}</FormHelperTexts>
              </Grid>
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

            <Button
              className="loginPage-findId"
              onClick={() => navigate("/FindId")}
            >
              아이디찾기
            </Button>
            <Button
              className="loginPage-findPw"
              onClick={() => navigate("/FindPw")}
            >
              비밀번호찾기
            </Button>
            <br />
            <Button
              className="loginPage-join"
              onClick={() => navigate("/Join")}
            >
              회원가입
            </Button>
            <FormHelperTexts>{registerError}</FormHelperTexts>
          </Boxs>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
