import Header from "../../components/header/Header";
import React, { useState } from "react";
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
import { ForSendCertiNum, passResetPw } from "../../Api/LogData";

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
  // 입력된 인증 번호
  const [inputNum, setinputNum] = useState("");
  // 백에서 받은 인증번호
  const [certiNum, setCertiNum] = useState("");

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
              <div className="join-inputId">
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
              {/*  인증번호 발송 버튼을 누르면 입력된 값을 백에 존재하는 값들과 비교해서 
              존재여부를 파악하고 있다면 인증번호를 해당 이메일로 발송한다. */}
              <a
                className="join-idCheck"
                onClick={() =>
                  ForSendCertiNum(userId, email, birth, setCertiNum)
                }
              >
                인증번호 발송
              </a>
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
