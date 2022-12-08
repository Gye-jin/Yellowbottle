import Header from "../components/Header";
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Avatar,
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
import { numGoAPI } from "../Api/data";
import { useCookies } from "react-cookie";
import { Router, Switch, Route } from "react-router";
// import { createBrowserHistory } from "history";

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

const FindPw = () => {
  const theme = createTheme();
  const [checked, setChecked] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [idError, setIdError] = useState("");
  const [userId, setUserId] = useState("");
  const [birth, setBirth] = useState("");
  const [email, setEmail] = useState("");
  const [birthError, setBirthError] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [cfnumError, setCfnumError] = useState("");
  const [cfnum, setcfnum] = useState("");
  const [confNum, setconfNum] = useState("");
  const navigate = useNavigate();

  const userIdhandler = (e) => {
    setUserId(e.target.value);
  };

  const birthhandler = (e) => {
    setBirth(e.target.value);
  };

  const emailhandler = (e) => {
    setEmail(e.target.value);
  };

  // const onhandlePost = async (findData) => {
  //   // post
  //   await axios
  //     // spring에 보낼 url : controller 와 Dto를 확인해서 수정하자!
  //     .post("http://localhost:8080/api/findPw", findData)
  //     .then(function (response) {
  //       sessionStorage.setItem("userid", document.getElementById("id"));
  //       sessionStorage.setItem("birth", document.getElementById("birth"));
  //       sessionStorage.setItem("email", document.getElementById("email"));
  //       console.log(response, "인증번호 발송 성공");
  //     })
  //     .catch(function (err) {
  //       console.log(err);
  //       setRegisterError(
  //         "인증번호 발송에 실패했습니다. 이메일주소를 확인해주세요."
  //       );
  //     });
  // };

  //인증번호 발송확인alert창
  const NumGo = () => {
    // const userId = document.getElementById("id").value;
    // const birth = document.getElementById("birth").value;
    // const email = document.getElementById("email").value;
    console.log(userId);
    console.log();
    numGoAPI(email, userId, birth).then((response) => {
      console.log(response);
      if (response !== 0) {
        alert("인증번호가 발송되었습니다.");
        sessionStorage.setItem("userid", document.getElementById("id"));
        sessionStorage.setItem("birth", document.getElementById("birth"));
        sessionStorage.setItem("email", document.getElementById("email"));
      } else {
        alert("없는 email입니다. 다시 입력해주세요");
      }
      console.log("이메일로 인증번호 발송");
    });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const data = new FormData(e.currentTarget);
  //   const findData = {
  //     userId: data.get("id"),
  //     email: data.get("email"),
  //     birth: data.get("birth"),
  //   };
  //   const { userId, email, birth } = findData;
  //   console.log(findData);
  // };

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

          <Grid container spacing={1.5}>
            <Grid item xs={12}>
              <TextField
                required
                autoFocus
                fullWidth
                type="id"
                id="id"
                name="id"
                // value={userId}
                onChange={userIdhandler}
                label="아이디"
                error={idError !== "" || false}
              />
            </Grid>

            <FormHelperTexts>{idError}</FormHelperTexts>
            <Grid item xs={12}>
              <TextField
                required
                autoFocus
                fullWidth
                type="email"
                id="email"
                name="email"
                // value={email}
                onChange={emailhandler}
                label="이메일 주소"
                error={emailError !== "" || false}
              />
            </Grid>
            <FormHelperTexts>{emailError}</FormHelperTexts>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                type="birth"
                id="birth"
                name="birth"
                // value={birth}
                onChange={birthhandler}
                label="생년월일 입력(ex.1998-02-15)"
                error={birthError !== "" || false}
              />
            </Grid>
          </Grid>
          <FormHelperTexts>{birthError}</FormHelperTexts>

          <button type="submit" className="numgo" onClick={NumGo}>
            인증번호 발송
          </button>

          <Boxs component="form" noValidate sx={{ mt: 3 }}>
            <FormControl component="fieldset" variant="standard">
              <Grid item xs={12}>
                <TextField
                  required
                  autoFocus
                  fullWidth
                  type="varchar"
                  id="confNum"
                  // value={cfnum}
                  name="cfnum"
                  label="인증번호 6자리"
                />
              </Grid>
              <FormHelperTexts>{cfnumError}</FormHelperTexts>

              {/* <button className="numgo" onClick={NumGo}>
                인증번호 확인
              </button> */}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                size="large"
                // onClick={() => navigate("/resetPw")}
                // onClick={(cfnum === response.data) => navigate("/resetPw")}
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
