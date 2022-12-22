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
import Swal from "sweetalert2";
import { yellow } from "@material-ui/core/colors";

//mui 템플릿 사용
const FormHelperTexts = styled(FormHelperText)`
  width: 100%;
  padding-left: 16px;
  font-weight: 700 !important;
  color: #d32f2f !important;
`;
const Boxs = styled(Box)`
  padding-bottom: 40px !important;
`;

// 비밀번호 찾기 페이지
const FindPw = () => {
  // mui 테마
  const theme = createTheme();
  const theme1 = createTheme({
    palette: {
      primary: {
        main: yellow[500],
      },
    },
  });
  const theme3 = createTheme({
    palette: {
      primary: {
        main: "#393201",
      },
    },
  });
  // 백에서 받은 인증번호
  const [certiNum, setCertiNum] = useState("");
  // 유효성검사(아이디, 생년월일, 이메일)
  const [userIdError, setUserIdError] = useState("");
  const [birthError, setBirthError] = useState("");
  const [emailError, setEmailError] = useState("");
  // 인증번호받는 함수
  const findPwRegexTest = () => {
    const findPwData = {
      userId: document.getElementById("id").value,
      email: document.getElementById("email").value,
      birth: document.getElementById("birth").value,
    };
    const { userId, email, birth } = findPwData;
    // 아이디 체크
    const idRegex = /^[a-zA-Z0-9]{4,19}$/g;
    if (!idRegex.test(userId)) {
      setUserIdError("잘못된 아이디 형식입니다.");
    } else if (idRegex.test(userId)) {
      setUserIdError("");
    }
    // 이메일체크
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (!emailRegex.test(email)) {
      setEmailError("올바른 이메일 형식이 아닙니다.");
    } else {
      setEmailError("");
    }
    // 생년월일 체크
    const birthRegex =
      /^(19[0-9][0-9]|20\d{2})-(0[0-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
    if (!birthRegex.test(birth))
      setBirthError(
        "형식이 일치하지 않습니다. 1999-08-20과 같이 입력해주세요!"
      );
    else {
      setBirthError("");
    }
    // 유효성 체크 통과하면 백에 데이터 보냄
    if (
      idRegex.test(userId) &&
      emailRegex.test(email) &&
      birthRegex.test(birth)
    ) {
      ForSendCertiNum(findPwData, setCertiNum);
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
      <div className="logPage-background">
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
            <br />
            <br />
            <br />
            <Typography component="h1" variant="h5">
              비밀번호 찾기
            </Typography>
            <Boxs component="form" noValidate sx={{ mt: 3 }}>
              <FormControl component="fieldset" variant="standard">
                <div>
                  <Grid container spacing={1.5}>
                    {/* 아이디 입력칸 */}
                    <Grid item xs={12}>
                      <ThemeProvider theme={theme3}>
                        <TextField
                          required
                          autoFocus
                          fullWidth
                          type="text"
                          id="id"
                          name="id"
                          label="아이디"
                          error={userIdError !== "" || false}
                        />
                      </ThemeProvider>
                    </Grid>
                    <FormHelperTexts>{userIdError}</FormHelperTexts>
                    {/* 이메일 입력칸 */}
                    <Grid item xs={12}>
                      <ThemeProvider theme={theme3}>
                        <TextField
                          required
                          autoFocus
                          fullWidth
                          type="email"
                          id="email"
                          name="email"
                          label="이메일 주소"
                        />
                      </ThemeProvider>
                    </Grid>
                    <FormHelperTexts>{emailError}</FormHelperTexts>
                    {/* 생년월일 입력칸 */}
                    <Grid item xs={12}>
                      <ThemeProvider theme={theme3}>
                        <TextField
                          required
                          fullWidth
                          type="birth"
                          id="birth"
                          name="birth"
                          label="생년월일 입력(ex.1999-08-20)"
                        />
                      </ThemeProvider>
                    </Grid>
                    <FormHelperTexts>{birthError}</FormHelperTexts>
                  </Grid>
                </div>
                <div className="findPw-sendCertiNum">
                  {/*  인증번호 발송 버튼을 누르면 입력된 값을 백에 존재하는 값들과 비교해서 
              존재여부를 파악하고 있다면 인증번호를 해당 이메일로 발송한다. */}
                  <a
                    className="findPw-sendCertiNumBtn"
                    onClick={() => findPwRegexTest()}
                  >
                    인증번호 발송
                  </a>
                </div>
                <Grid container spacing={1.5}>
                  {/* 인증번호 입력칸 */}
                  <Grid item xs={12}>
                    <ThemeProvider theme={theme3}>
                      <TextField
                        required
                        fullWidth
                        type="inputNum"
                        id="inputNum"
                        name="inputNum"
                        label="인증번호 6자리 입력"
                      />
                    </ThemeProvider>
                  </Grid>
                </Grid>
                {/* 비밀번호 변경 버튼을 누르면  */}
                {/* click은 데이터를 클릭하는 것에서 그치지만, submit은 데이터를 통으로 보낸다.
                또한, submit은 데이터를 받는 대상이 있어야만 제대로 작동한다.
                따라서 방금처럼 데이터를 받는 대상 없을 때는 submit을 쓸 수 없다. */}
                <ThemeProvider theme={theme1}>
                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    size="large"
                    onClick={() => passResetPw()}
                  >
                    인증번호 확인
                  </Button>
                </ThemeProvider>
              </FormControl>
            </Boxs>
          </Box>
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default FindPw;
