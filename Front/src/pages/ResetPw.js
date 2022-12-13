import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Button,
  CssBaseline,
  TextField,
  FormControl,
  FormHelperText,
  Grid,
  Box,
  Container,
} from "@mui/material/";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import styled from "styled-components";
// import Header from '../components/Header';
import "../App.css";
import Header from "../components/Header";
// import { useNavigate } from "react-router-dom";

// mui 기본 css 적용
const FormHelperTexts = styled(FormHelperText)`
  width: 100%;
  padding-left: 16px;
  font-weight: 700 !important;
  color: #d32f2f !important;
`;

const Boxs = styled(Box)`
  padding-bottom: 40px !important;
`;

const ResetPw = () => {
  const theme = createTheme();
  const [passwordError, setPasswordError] = useState("");
  // 아이디 추가
  const [registerError, setRegisterError] = useState("");
  const navigate = useNavigate();

  const onhandlePost = async (password) => {
    // post
    await axios
      // spring에 보낼 url : controller 와 Dto를 확인해서 수정하자!
      .post("http://localhost:8080/api/updatePw", {
        userId: sessionStorage.getItem("userId"),
        userPw: password,
      })
      .then(function (response) {
        sessionStorage.clear();
        console.log(response, "성공");
        alert("비밀번호 변경에 성공하셨습니다!");
        navigate("/login");
      })
      .catch(function (err) {
        console.log(err);
        setRegisterError(
          "비밀번호 변경에 실패하였습니다. 다시한번 확인해 주세요."
        );
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const postResetPwData = {
      password: data.get("password"),
      rePassword: data.get("rePassword"),
    };
    const { password, rePassword } = postResetPwData;

    // 비밀번호 유효성 체크
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(
        "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!"
      );
    } else {
      setPasswordError("");
    }

    // 비밀번호 같은지 체크
    if (password != rePassword) {
      setPasswordError("비밀번호가 일치하지 않습니다.");
    } else {
      setPasswordError("");
    }

    if (
      // 작성한 아이디 !== 기존 아이디 &&
      passwordRegex.test(password) &&
      password === rePassword
    ) {
      console.log(sessionStorage.getItem("userId"));
      onhandlePost(password);
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
                    fullWidth
                    type="password"
                    id="password"
                    name="password"
                    label="비밀번호 (숫자+영문자+특수문자 8자리 이상)"
                    error={passwordError !== "" || false}
                  />
                </Grid>
                <FormHelperTexts>{passwordError}</FormHelperTexts>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="password"
                    id="rePassword"
                    name="rePassword"
                    label="비밀번호 재입력"
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
                비밀번호 변경
              </Button>
            </FormControl>
            <FormHelperTexts>{registerError}</FormHelperTexts>
          </Boxs>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default ResetPw;
