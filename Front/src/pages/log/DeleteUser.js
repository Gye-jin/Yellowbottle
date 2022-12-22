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
import Swal from "sweetalert2";
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

// 회원가입 페이지
const DeleteUser = () => {
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
  // 재입력 비밀번호 입력오류
  const [rePasswordError, setRePasswordError] = useState("");
  // 회원탈퇴 체크박스 체크여부확인
  const [CheckedPersonal, setCheckedPersonal] = useState(false);
  // 회원탈퇴버튼 눌렀을 때 오류
  const [registerError, setRegisterError] = useState("");
  // 해당유저 세션아이디 선언
  const userSession = sessionStorage.getItem("sessionId");
  // 회원탈퇴동의 체크박스 여부 함수
  const handlePersonalAgree = (event) => {
    setCheckedPersonal(event.target.checked);
  };

  // 회원탈퇴 버튼 누를때 실행되는 함수: updateData(입력된 값)를 유효성 검사를 통해 LogData.js에 있는 ForPostUpdateData 함수에 보내준다.
  const createDeleteData = (e) => {
    // 실행시 화면새로고침 방지
    e.preventDefault();
    const userPw = document.getElementById("password").value;
    const rePassword = document.getElementById("rePassword").value;
    const deleteData = new FormData();
    deleteData.append("sessionId", userSession);
    deleteData.append("userPw", userPw);
    // 비밀번호 체크
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (!passwordRegex.test(userPw)) setPasswordError("잘못된 비밀번호입니다.");
    else setPasswordError("");
    // 재비밀번호 체크
    if (userPw !== rePassword) {
      setRePasswordError("비밀번호가 일치하지 않습니다.");
    } else {
      setRePasswordError("");
    }
    // 회원가입 동의 체크
    if (!CheckedPersonal) {
      Swal.fire({
        icon: "error",
        title: "🌚회원탈퇴 동의 미체크🌝",
        showConfirmButton: false,
        timer: 1000,
      });
    }
    passwordRegex.test(userPw) && rePassword === userPw && CheckedPersonal
      ? ForPostDeleteData(deleteData)
      : setRegisterError("🌍환경지킴이 포기하실건가요?🌍");
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
                    <ThemeProvider theme={theme3}>
                      <TextField
                        required
                        fullWidth
                        type="password"
                        id="password"
                        name="password"
                        label="비밀번호 (숫자+영문자+특수문자 8자리 이상)"
                        error={passwordError !== "" || false}
                      />
                    </ThemeProvider>
                  </Grid>
                  {/* 유효성 검사를 통해 비밀번호가 형식에 맞지 않으면 밑에 빨간 글씨로 오류가 뜬다. */}
                  <FormHelperTexts>{passwordError}</FormHelperTexts>
                  {/* rePassword 입력칸 */}
                  <Grid item xs={12}>
                    <ThemeProvider theme={theme3}>
                      <TextField
                        required
                        fullWidth
                        type="password"
                        id="rePassword"
                        name="rePassword"
                        label="비밀번호 재입력"
                        error={rePasswordError !== "" || false}
                      />
                    </ThemeProvider>
                  </Grid>
                  {/* 유효성 검사를 통해 rePassword가 형식에 맞지 않으면 밑에 빨간 글씨로 오류가 뜬다. */}
                  <FormHelperTexts>{rePasswordError}</FormHelperTexts>
                </Grid>
                {/* 개인정보 동의칸 */}
                <Grid item xs={12}>
                  <ThemeProvider theme={theme3}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={handlePersonalAgree}
                          color="primary"
                        />
                      }
                      label="귀하는 Yellowbottle 회원탈퇴에 동의합니다."
                    />
                  </ThemeProvider>
                </Grid>
                {/* 회원탈퇴 버튼을 누르면 위 입력한 데이터(deleteData)를 백에 보낸다. */}
                <ThemeProvider theme={theme1}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    size="large"
                  >
                    탈퇴
                  </Button>
                </ThemeProvider>
              </FormControl>
              {/* 입력한 값이 백에 정상적으로 전송되지 않는다면 오류가 뜬다. */}
              <FormHelperTexts>{registerError}</FormHelperTexts>
            </Boxs>
          </Box>
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default DeleteUser;
