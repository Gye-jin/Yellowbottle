import Header from "../../components/header/Header";
import React, { useState } from "react";
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
import { ForSendCertiNum, passResetPw } from "../../Api/LogData";

// mui의 내장 css
const FormHelperTexts = styled(FormHelperText)`
  width: 100%;
  padding-left: 9px;
  font-weight: 700 !important;
`;
const Boxs = styled(Box)`
  padding-bottom: 40px !important;
`;

// 비밀번호 찾기 페이지
const FindPw = () => {
  // mui 테마
  const theme = createTheme();
  // 아이디, 생년월일, 이메일
  const [userId, setUserId] = useState("");
  const [birth, setBirth] = useState("");
  const [email, setEmail] = useState("");
  // 인증 번호
  const [inputNum, setinputNum] = useState("");
  // 백에서 받은 인증번호
  const [certiNum, setCertiNum] = useState("");
  // 유효성검사(아이디, 생년월일, 이메일)
  const [userIdError, setUserIdError] = useState("");
  const [birthError, setBirthError] = useState("");
  const [emailError, setEmailError] = useState("");

  // userId input값 바뀔 때마다 변하게 하는 함수
  const userIdHandler = (e) => {
    setUserId(e.target.value);
  };
  // birth input값 바뀔 때마다 변하게 하는 함수
  const birthHandler = (e) => {
    setBirth(e.target.value);
  };
  // email input값 바뀔 때마다 변하게 하는 함수
  const emailHandler = (e) => {
    setEmail(e.target.value);
  };
  // 인증번호 input값 바뀔 때마다 변하게 하는 함수
  const inputNumHandler = (e) => {
    setinputNum(e.target.value);
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

          <Boxs component="form" noValidate sx={{ mt: 3 }}>
            <FormControl component="fieldset" variant="standard">
              <div className="findpw-inputId">
                {/* 아이디 입력칸 */}
                <Grid item xs={12}>
                  <TextField
                    required
                    autoFocus
                    fullWidth
                    type="text"
                    id="id"
                    name="id"
                    label="아이디"
                    onChange={userIdHandler}
                  />
                </Grid>
                {/* 이메일 입력칸 */}
                <Grid item xs={12}>
                  <TextField
                    required
                    autoFocus
                    fullWidth
                    type="email"
                    id="email"
                    name="email"
                    label="이메일 주소"
                    onChange={emailHandler}
                  />
                </Grid>
                {/* 생년월일 입력칸 */}
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="birth"
                    id="birth"
                    name="birth"
                    label="생년월일 입력(ex.1999-08-20)"
                    onChange={birthHandler}
                  />
                </Grid>
              </div>
              <div className="confirm-button">
                {/*  인증번호 발송 버튼을 누르면 입력된 값을 백에 존재하는 값들과 비교해서 
              존재여부를 파악하고 있다면 인증번호를 해당 이메일로 발송한다. */}
                <a
                  className="findpw-idCheck"
                  onClick={() =>
                    ForSendCertiNum(userId, email, birth, setCertiNum)
                  }
                >
                  인증번호 발송
                </a>
              </div>
              <Grid container spacing={1.5}>
                {/* 인증번호 입력칸 */}
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="inputNum"
                    id="inputNum"
                    name="inputNum"
                    label="인증번호 6자리 입력"
                    onChange={inputNumHandler}
                  />
                </Grid>
              </Grid>
              {/* 비밀번호 변경 버튼을 누르면  */}
              {/* click은 데이터를 클릭하는 것에서 그치지만, submit은 데이터를 통으로 보낸다.
                또한, submit은 데이터를 받는 대상이 있어야만 제대로 작동한다.
                따라서 방금처럼 데이터를 받는 대상 없을 때는 submit을 쓸 수 없다. */}
              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                size="large"
                onClick={() => passResetPw(inputNum)}
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
