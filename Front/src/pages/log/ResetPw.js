import React, { useEffect, useState } from "react";
import {
  Button,
  CssBaseline,
  TextField,
  FormControl,
  FormHelperText,
  Grid,
  Box,
  Container,
  Typography,
} from "@mui/material/";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import styled from "styled-components";
import "../../App.css";
import Header from "../../components/header/Header";
import { ForResetPwPost } from "../../Api/LogData";
import Swal from "sweetalert2";

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
  // mui 테마
  const theme = createTheme();
  // 비밀번호 오류
  const [passwordError, setPasswordError] = useState("");
  // 재입력비밀번호 오류
  const [rePasswordError, setRePasswordError] = useState("");
  // 비밀번호 변경실패 오류
  const [registerError, setRegisterError] = useState("");

  // 비밀번호 변경버튼 눌렀을 때 실행되는 함수
  const postPasswordData = (e) => {
    // 새로고침 방지
    e.preventDefault();
    // FormData를 이용해 변화되는 입력값들을 설정
    const data = new FormData(e.currentTarget);
    const postResetPwData = {
      userPw: data.get("password"),
      rePassword: data.get("rePassword"),
    };
    const { userPw, rePassword } = postResetPwData;
    // 비밀번호 체크
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (!passwordRegex.test(userPw))
      setPasswordError(
        "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!"
      );
    else setPasswordError("");
    // 재비밀번호 체크
    if (userPw !== rePassword) {
      setRePasswordError("비밀번호가 일치하지 않습니다.");
    } else {
      setRePasswordError("");
    }
    // 위에서 설정한 유효성검사를 모두 통과하면 ForResetPwPost함수 실행
    if (passwordRegex.test(userPw) && rePassword === userPw) {
      ForResetPwPost(userPw, setRegisterError);
    } else {
      Swal.fire({
        icon: "error",
        text: "🌚잘못된 형식입니다.🌝",
        showConfirmButton: false,
        timer: 1500,
      });
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
            비밀번호변경
          </Typography>
          {/* 비밀번호 변경버튼을 눌렀을 때 postPasswordData 함수가 실행된다. */}
          <Boxs
            component="form"
            noValidate
            onSubmit={postPasswordData}
            sx={{ mt: 3 }}
          >
            <FormControl component="fieldset" variant="standard">
              <Grid container spacing={1.5}>
                {/* 비밀번호 입력칸 */}
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
                {/* 비밀번호 입력 오류 창 */}
                <FormHelperTexts>{passwordError}</FormHelperTexts>
                {/* rePassword 입력칸 */}
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="password"
                    id="rePassword"
                    name="rePassword"
                    label="비밀번호 재입력"
                    error={rePasswordError !== "" || false}
                  />
                </Grid>
                {/* rePassword 입력 오류 */}
                <FormHelperTexts>{rePasswordError}</FormHelperTexts>
              </Grid>
              {/* 이 버튼을 클릭할 시 postPasswordData 함수를 실행시킨다. */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                size="large"
                background-color="rgb(255, 217, 44)"
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
