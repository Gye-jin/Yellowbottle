import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
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
import Header from "../components/Header";
import ForPostFindIdData from "../Api/FindIdData";

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

const FindId = () => {
  const theme = createTheme();
  const [userId, setUserId] = useState("");
  const [emailError, setEmailError] = useState("");
  const [birthError, setBirthError] = useState("");
  const [registerError, setRegisterError] = useState("");
  const navigate = useNavigate();

  // form 전송(request)
  const createFindIdData = (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const findIdData = {
      email: data.get("email"),
      birth: data.get("birth"),
    };
    const { email, birth } = findIdData;
    console.log(findIdData);

    // 이메일 유효성 체크
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (!emailRegex.test(email))
      setEmailError("올바른 이메일 형식이 아닙니다.");
    else setEmailError("");

    // 생년월일 유효성 체크
    const birthRegex =
      /^(19[0-9][0-9]|20\d{2})-(0[0-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
    if (!birthRegex.test(birth))
      setBirthError("형식이 일치하지 않습니다. 8자리 생년월일을 입력해주세요!");
    else setBirthError("");

    // 모두 통과하면 post되는 코드(상단 axios)
    if (emailRegex.test(email) && birthRegex.test(birth)) {
      ForPostFindIdData(findIdData, setUserId, setRegisterError);
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
                <FormHelperTexts>{birthError}</FormHelperTexts>

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
                <FormHelperTexts>{emailError}</FormHelperTexts>
              </Grid>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                size="large"
              >
                아이디 찾기
              </Button>
            </FormControl>
            <div>
              {userId.length !== 0 && birthError === "" && emailError === "" ? (
                <h3>귀하의 아이디는 {userId} 입니다</h3>
              ) : (
                <></>
              )}
            </div>

            <div className="butom">
              <p onClick={() => navigate("/login")}>로그인 이동</p>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <p onClick={() => navigate("/findPw")}>비밀번호찾기</p>
            </div>
            <FormHelperTexts>{registerError}</FormHelperTexts>
          </Boxs>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default FindId;
