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
import "../../App.css";
import Header from "../../components/header/Header";
import { ForPostLoginData } from "../../Api/LogData";
import { yellow } from "@material-ui/core/colors";

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
    e.preventDefault();
    // FormData를 통해 각각의 입력값들이 변화되면 바뀐 value값 확인 가능!
    const data = new FormData(e.currentTarget);
    const loginData = {
      userId: data.get("id"), // id의  e.currentTarget.value
      userPw: data.get("password"),
    };
    // 입력된 값들을 loginData에 넣는다.
    const { userId, userPw } = loginData;
    // loginData에 넣은 각각의 값들은 유효성 검사를 거친다.
    // 아이디체크
    const idRegex = /^[a-zA-Z0-9]{4,19}$/g;
    if (!idRegex.test(userId)) {
      {
        setIdError("잘못된 아이디입니다.");
      }
    } else if (idRegex.test(userId)) {
      {
        setIdError("");
      }
    }
    // PasswordRegexTest(userPw, setPasswordError);
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (!passwordRegex.test(userPw)) {
      setPasswordError("잘못된 비밀번호입니다.");
    } else {
      setPasswordError("");
    }
    // 만약 위 유효성 검사를 모두 통과하면 ForPostLoginData를 실행한다.
    if (idRegex.test(userId) && passwordRegex.test(userPw)) {
      ForPostLoginData(loginData, setRegisterError);
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
                    <ThemeProvider theme={theme3}>
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
                    </ThemeProvider>
                  </Grid>
                  {/* 유효성 검사를 통해 아이디가 형식에 맞지 않으면 밑에 빨간 글씨가 뜬다. */}
                  <FormHelperTexts>{idError}</FormHelperTexts>
                  {/* 비밀번호 입력칸 */}
                  <Grid item xs={12}>
                    <ThemeProvider theme={theme3}>
                      <TextField
                        required
                        fullWidth
                        type="password"
                        id="password"
                        name="password"
                        label="비밀번호"
                        error={passwordError !== "" || false}
                      />
                    </ThemeProvider>
                  </Grid>
                  {/* 유효성 검사를 통해 비밀번호가 형식에 맞지 않으면 밑에 빨간 글씨로 오류가 뜬다. */}
                  <FormHelperTexts>{passwordError}</FormHelperTexts>
                </Grid>
                <ThemeProvider theme={theme1}>
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
                </ThemeProvider>
                {/* 입력한 값이 백에 정상적으로 전송되지 않는다면 오류가 뜬다. */}
                <FormHelperTexts>{registerError}</FormHelperTexts>
              </FormControl>
              {/* 아이디찾기 버튼을 누를경우 해당 페이지로 이동한다. */}
              <ThemeProvider theme={theme3}>
                <Button
                  className="loginPage-findId"
                  onClick={() => navigate("/findId")}
                >
                  아이디찾기
                </Button>
              </ThemeProvider>
              <ThemeProvider theme={theme3}>
                {/* 비밀번호찾기 버튼을 누를경우 해당 페이지로 이동한다. */}
                <Button
                  className="loginPage-findPw"
                  onClick={() => navigate("/findPw")}
                >
                  비밀번호찾기
                </Button>
              </ThemeProvider>
              <br />
              {/* 회원가입 버튼을 누를경우 해당 페이지로 이동한다. */}
              <ThemeProvider theme={theme3}>
                <Button
                  className="loginPage-join"
                  onClick={() => navigate("/join")}
                >
                  회원가입
                </Button>
              </ThemeProvider>
            </Boxs>
          </Box>
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default Login;
