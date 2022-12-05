import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Button,
  CssBaseline,
  TextField,
  FormControl,
  FormControlLabel,
  Checkbox,
  FormHelperText,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material/";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import styled from "styled-components";
import { Link } from "react-router-dom";
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

const FindId = () => {
  const theme = createTheme();
  const [checked, setChecked] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [birthError, setBirthError] = useState("");

  //   const [nameError, setNameError] = useState("");
  const [registerError, setRegisterError] = useState("");
  const navigate = useNavigate();

  const onhandlePost = async (data) => {
    const { email, birth } = data;
    const postData = { email, birth };

    // post
    await axios
      // spring에 보낼 url : controller 와 Dto를 확인해서 수정하자!
      .post("/member/findId", data)
      .then(function (response) {
        console.log(response, "성공");
        navigate.push("/confirmId");
      })
      .catch(function (err) {
        console.log(err);
        setRegisterError(
          "해당 정보와 동일한 아이디가 존재하지 않습니다. 다시 한번 확인해 주세요."
        );
      });
  };

  // form 전송
  const handleSubmit = (e) => {
    // e.preventDefault();

    const data = new FormData(e.currentTarget);
    const joinData = {
      email: data.get("email"),
      birth: data.get("birth"),
    };
    const { email, birth } = joinData;
    console.log(joinData);

    // 이메일 유효성 체크
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (!emailRegex.test(email))
      setEmailError("올바른 이메일 형식이 아닙니다.");
    else setEmailError("");

    // 생년월일 유효성 체크
    const birthRegex = /^(?=.*[0-9]).{8,25}$/;
    if (!birthRegex.test(birth) && birth.length !== 6)
      setBirthError("형식이 일치하지 않습니다. 6자리 생년월일을 입력해주세요!");
    else setBirthError("");

    // 모두 통과하면 post되는 코드(상단 axios)
    if (emailRegex.test(email) && birthRegex.test(birth)) {
      onhandlePost(joinData);
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
            onSubmit={handleSubmit}
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
                    label="생년월일 입력(ex.990820)"
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

              <Link to="/confirmId">
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  size="large"
                >
                  아이디 찾기
                </Button>
              </Link>
            </FormControl>
            <FormHelperTexts>{registerError}</FormHelperTexts>
          </Boxs>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default FindId;
