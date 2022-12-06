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
import { findEqeulAPI } from "../Api/data";

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
  const [usableId, setUsableId] = useState("");

  //   const [nameError, setNameError] = useState("");
  const [registerError, setRegisterError] = useState("");
  const navigate = useNavigate();

  // const onhandlePost = async (joindata) => {
  //   const findEqeulId = () => {
  //     findEqeulAPI(userId, email, birth).then((response) => {
  //       console.log(response);
  //       if (response === false) {
  //         alert("귀하의 아이디는 {userId} 입니다");
  //         setUsableId(response);
  //       } else {
  //         alert("해당정보에 일치하는 아이디가 없습니다.");
  //         setUsableId(response);
  //       }
  //       console.log("아이디여부체크");
  //     });
  //   };

  const onhandlePost = async (joindata) => {
    // post
    await axios
      // spring에 보낼 url : controller 와 Dto를 확인해서 수정하자!
      .post("http://localhost:8080/api/findId", joindata)
      .then(function (response) {
        //id담긴 response
        console.log(response, "아이디찾기 성공");
      })
      .catch(function (err) {
        console.log(err);
        setRegisterError(
          "해당 정보와 동일한 아이디가 존재하지 않습니다. 다시 한번 확인해 주세요."
        );
      });
  };

  // form 전송(request)
  const handleSubmit = (e) => {
    e.preventDefault();

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
    const birthRegex =
      /^(19[0-9][0-9]|20\d{2})-(0[0-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
    if (!birthRegex.test(birth))
      setBirthError("형식이 일치하지 않습니다. 8자리 생년월일을 입력해주세요!");
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
              {birthError === false &&
              emailError === false &&
              registerError === false ? (
                <h3>귀하의 아이디는 (response) 입니다</h3>
              ) : null}
            </div>

            <div className="butom">
              <p>
                <a href="/login">로그인 이동</a>
              </p>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <p>
                <a href="/findPw">비밀번호찾기</a>
              </p>
            </div>
            <FormHelperTexts>{registerError}</FormHelperTexts>
          </Boxs>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default FindId;
