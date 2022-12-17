import React, { useState } from "react";
import {
  Button,
  CssBaseline,
  TextField,
  FormControl,
  FormHelperText,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Typography,
  Container,
  // Label,
} from "@mui/material/";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import styled from "styled-components";
import Header from "../../components/header/Header";
import { ForPostDeleteData } from "../../Api/LogData";

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

// 회원가입 페이지
const DeleteUser = () => {
  // mui 테마
  const theme = createTheme();

  // 비밀번호
  const [password, setPassword] = useState();
  // 재입력 비밀번호
  const [rePassword, setRePassword] = useState("");
  // 비밀번호 입력오류
  const [passwordError, setPasswordError] = useState("");
  // 재입력 비밀번호 입력오류
  const [rePasswordError, setRePasswordError] = useState("");
  // 회원탈퇴 체크박스 체크여부확인
  const [CheckedPersonal, setCheckedPersonal] = useState(false);
  // 회원탈퇴버튼 눌렀을 때 오류
  const [registerError, setRegisterError] = useState("");
  // 해당유저 세션아이디 선언
  const userSession = sessionStorage.getItem("sessionId");
  // rePassword 입력할때마다 인식해주는 함수
  const rePasswordHandler = (e) => {
    setRePassword(e.target.value);
  };
  // password 입력할떄마다 인식해주는 함수
  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };
  // 회원탈퇴동의 체크박스 여부 함수
  const handlePersonalAgree = (event) => {
    setCheckedPersonal(event.target.checked);
  };

  // 회원탈퇴 버튼 누를때 실행되는 함수: updateData(입력된 값)를 유효성 검사를 통해 LogData.js에 있는 ForPostUpdateData 함수에 보내준다.
  const createDeleteData = (e) => {
    // 실행시 화면새로고침 방지
    e.preventDefault();
    const deleteData = new FormData();
    deleteData.append("sessionId", userSession);
    deleteData.append("userPw", password);

    console.log(deleteData);
    // FormData의 key 확인
    for (let key of deleteData.keys()) {
      console.log("폼데이터 key값", key);
    }

    // FormData의 value 확인
    for (let value of deleteData.values()) {
      console.log("폼데이터 value값", value);
    }

    // deleteData에 넣은 각각의 값들은 유효성 검사를 거친다.

    // 비밀번호 유효성 체크
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (!passwordRegex.test(password))
      setPasswordError(
        "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!"
      );
    else setPasswordError("");

    // 비밀번호 같은지 체크
    if (password !== rePassword) {
      setRePasswordError("비밀번호가 일치하지 않습니다.");
    } else {
      setRePasswordError("");
    }
    // 회원가입 동의 체크
    if (!CheckedPersonal) alert("회원탈퇴 동의란에 체크해주세요.");

    // 만약 위 유효성 검사를 모두 통과하면 ForPostJoinData()를 실행한다.
    if (passwordRegex.test(password) && CheckedPersonal) {
      ForPostDeleteData(deleteData, setRegisterError);
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
            회원탈퇴
          </Typography>

          <Boxs
            component="form"
            noValidate
            onSubmit={createDeleteData}
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
                    onChange={passwordHandler}
                  />
                </Grid>
                {/* 유효성 검사를 통해 비밀번호가 형식에 맞지 않으면 밑에 빨간 글씨로 오류가 뜬다. */}
                <FormHelperTexts>{passwordError}</FormHelperTexts>
                {/* rePassword 입력칸 */}
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="rePassword"
                    id="rePassword"
                    name="rePassword"
                    label="비밀번호 재입력"
                    onChange={rePasswordHandler}
                    error={rePasswordError !== "" || false}
                  />
                </Grid>
                {/* 유효성 검사를 통해 rePassword가 형식에 맞지 않으면 밑에 빨간 글씨로 오류가 뜬다. */}
                <FormHelperTexts>{rePasswordError}</FormHelperTexts>
              </Grid>
              {/* 개인정보 동의칸 */}
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox onChange={handlePersonalAgree} color="primary" />
                  }
                  label="귀하는 C-ZERO 회원탈퇴에 동의합니다."
                />
              </Grid>
              {/* 회원탈퇴 버튼을 누르면 위 입력한 데이터(deleteData)를 백에 보낸다. */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                size="large"
              >
                탈퇴
              </Button>
            </FormControl>
            {/* 입력한 값이 백에 정상적으로 전송되지 않는다면 오류가 뜬다. */}
            <FormHelperTexts>{registerError}</FormHelperTexts>
          </Boxs>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default DeleteUser;
