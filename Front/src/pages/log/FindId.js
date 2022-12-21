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
import Header from "../../components/header/Header";
import { ForPostFindIdData } from "../../Api/LogData";
import Swal from "sweetalert2";

// mui의 내장 css
const FormHelperTexts = styled(FormHelperText)`
  width: 100%;
  padding-left: 16px;
  font-weight: 700 !important;
  color: #d32f2f !important;
`;

const Boxs = styled(Box)`
  padding-bottom: 40px !important;
`;

// 아이디 찾기 페이지
const FindId = () => {
  //mui테마
  const theme = createTheme();
  //이메일 입력오류
  const [emailError, setEmailError] = useState("");
  //생년월일 입력오류
  const [birthError, setBirthError] = useState("");
  //아이디찾기 버튼 눌렀을 때 오류
  const [registerError, setRegisterError] = useState("");
  //페이지 이동 함수
  const navigate = useNavigate();
  // 아이디찾기 버튼누를시 실행 함수: 입력된 값-백엔드로 전송(request)
  const createFindIdData = (e) => {
    //실행시 창 새로고침 방지
    e.preventDefault();
    // FormData를 통해 각각의 입력값이 변하면 해당 value값 확인가능.
    const data = new FormData(e.currentTarget);
    const findIdData = {
      email: data.get("email"), //id가 email인 input칸의 e.currentTarget.value
      birth: data.get("birth"),
    };
    // 입력된 값들을 findIdData에 넣음.
    const { email, birth } = findIdData;
    //findIdData의 각각의 입력값들은 유효성검사를 거침
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
    // 모두 통과하면 ForPostFindIdData를 실행함.
    if (birthRegex.test(birth) && emailRegex.test(email)) {
      ForPostFindIdData(findIdData, setRegisterError);
    } else {
      Swal.fire({
        icon: "error",
        title: "🌚잘못된 정보입니다🌝",
      });
    }
  };
  return (
    // mui의 theme사용, Header컴포넌트 삽입, Container, Box, Boxs구성
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
            아이디찾기
          </Typography>
          <Boxs
            component="form"
            noValidate
            onSubmit={createFindIdData}
            sx={{ mt: 3 }}
          >
            <FormControl component="fieldset" variant="standard">
              <Grid container spacing={1.5}>
                {/* 생년월일 입력칸 */}
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="birth"
                    id="birth"
                    name="birth"
                    label="생년월일 입력(ex.1995-02-19)"
                    error={birthError !== "" || false}
                  />
                </Grid>
                {/* 유효성검사 맞지않으면 birthError로 빨간글씨 표시 */}
                <FormHelperTexts>{birthError}</FormHelperTexts>
                {/* 이메일 입력 */}
                <Grid item xs={12}>
                  <TextField
                    required
                    autoFocus
                    fullWidth
                    type="email"
                    id="email"
                    name="email"
                    label="이메일 주소"
                    error={emailError !== "" || false}
                  />
                </Grid>
                {/* 이메일형식에 맞지않을 경우, 빨간글자로 표시 */}
                <FormHelperTexts>{emailError}</FormHelperTexts>
              </Grid>
              {/* 아이디찾기 버튼을 누르면 type="submit"에 의해 createFindIdData이 실행됨 */}
              <Button
                className="findId-findIdBtn"
                color="warning"
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                size="large"
              >
                아이디 찾기
              </Button>
              {/* 입력된 값이 정상적으로 post 되지 않으면 아래 빨간글씨 오류 띄우기 */}
              <FormHelperTexts>{registerError}</FormHelperTexts>
            </FormControl>
            {/* 아이디찾기 버튼을 누를경우 해당 페이지로 이동한다. */}
            <Button
              className="loginPage-findId"
              onClick={() => navigate("/login")}
            >
              로그인
            </Button>
            {/* 비밀번호찾기 버튼을 누를경우 해당 페이지로 이동한다. */}
            <Button
              className="loginPage-findPw"
              onClick={() => navigate("/findPw")}
            >
              비밀번호찾기
            </Button>
          </Boxs>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default FindId;
