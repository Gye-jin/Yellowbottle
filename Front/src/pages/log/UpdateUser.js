import React, { useEffect, useState } from "react";
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
import { passUpdateUser, ForPostUpdateData } from "../../Api/LogData";
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
const UpdateUser = () => {
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
  // 이메일 입력오류
  const [emailError, setEmailError] = useState("");
  // 비밀번호
  const [userPw, setUserPw] = useState();
  // 이메일
  const [email, setEmail] = useState();
  // 이메일수신확인
  const [subStatus, setSubStatus] = useState();
  // 재입력 비밀번호
  const [rePassword, setRePassword] = useState("");
  // 비밀번호 입력오류
  const [passwordError, setPasswordError] = useState("");
  // 재입력 비밀번호 입력오류
  const [rePasswordError, setRePasswordError] = useState("");
  // 회원가입버튼 눌렀을 때 오류
  const [registerError, setRegisterError] = useState("");
  // 해당유저 세션아이디 선언
  const userSession = sessionStorage.getItem("sessionId");
  // 해당 userDTO를 담아둘 공간
  const [userDTO, setUserDTO] = useState([]);
  // rePassword 입력할때마다 인식해주는 함수
  const rePasswordHandler = (e) => {
    setRePassword(e.target.value);
  };
  // password 입력할떄마다 인식해주는 함수
  const passwordHandler = (e) => {
    setUserPw(e.target.value);
  };
  // email 입력할때마다 인식해주는 함수
  const emailHandler = (e) => {
    setEmail(e.target.value);
  };
  // 회원정보수정 페이지 접속시 기존 회원이메일 출력해줌
  useEffect(() => {
    const response = passUpdateUser(userSession);
    response.then((data) => {
      const agreeBtn = document.getElementById("email-agreement");
      const disagreeBtn = document.getElementById("email-disagreement");
      // 기존 회원의 이메일 수신여부를 default 값으로 회원정보 수신페이지에 보여줌
      data.subStatus
        ? agreeBtn.setAttribute("checked", "checked")
        : disagreeBtn.setAttribute("checked", "checked");
      setUserDTO(data);
    });
  }, []);
  // userDTO가 불러와지면 그때 기본적인 선언
  useEffect(() => {
    setUserPw(`${userDTO.userPw}`);
    setEmail(`${userDTO.email}`);
    setSubStatus(`${userDTO.subStatus}`);
  }, [userDTO]);

  // 수정 버튼 누를때 실행되는 함수: updateData(입력된 값)를 유효성 검사를 통해 LogData.js에 있는 ForPostUpdateData 함수에 보내준다.
  const createUpdateData = (e) => {
    // 실행시 화면새로고침 방지
    e.preventDefault();
    const emailCheckBtn = document.querySelector(
      "input[name='subStatus']:checked"
    );
    const updateData = new FormData();
    updateData.append("sessionId", userSession);
    updateData.append("userPw", userPw);
    updateData.append("email", email);
    updateData.append("subStatus", emailCheckBtn.value);
    // updateData에 넣은 각각의 값들은 유효성 검사를 거친다.
    // 이메일 체크
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (!emailRegex.test(email)) {
      setEmailError("올바른 이메일 형식이 아닙니다.");
    } else {
      setEmailError("");
    }
    // 비밀번호 체크
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (!passwordRegex.test(userPw))
      setPasswordError(
        "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!"
      );
    else setPasswordError("");
    // 재비밀번호 체크
    if (userPw !== rePassword) {
      setRePasswordError("비밀번호가 일치하지 않습니다.");
    } else {
      setRePasswordError("");
    }
    // 만약 위 유효성 검사를 모두 통과하면 ForPostJoinData()를 실행한다.
    if (
      emailRegex.test(email) &&
      passwordRegex.test(userPw) &&
      rePassword === userPw
    ) {
      ForPostUpdateData(updateData, setRegisterError);
    } else {
      Swal.fire({
        icon: "error",
        title: "🌚잘못된 정보입니다. 다시 입력해주세요🌝",
        showConfirmButton: false,
        timer: 1200,
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
              회원정보수정
            </Typography>

            <Boxs
              component="form"
              noValidate
              onSubmit={createUpdateData}
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
                        id="userPw"
                        name="userPw"
                        label="비밀번호 (숫자+영문자+특수문자 8자리 이상)"
                        error={passwordError !== "" || false}
                        onChange={passwordHandler}
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
                        onChange={rePasswordHandler}
                        error={rePasswordError !== "" || false}
                      />
                    </ThemeProvider>
                  </Grid>
                  {/* 유효성 검사를 통해 rePassword가 형식에 맞지 않으면 밑에 빨간 글씨로 오류가 뜬다. */}
                  <FormHelperTexts>{rePasswordError}</FormHelperTexts>
                  {/* 이메일 입력칸 */}
                  <Grid item xs={12}>
                    이메일 변경을 원하시면 입력해주세요
                  </Grid>
                  <Grid item xs={12}>
                    <ThemeProvider theme={theme3}>
                      <TextField
                        required
                        autoFocus
                        fullWidth
                        type="email"
                        id="email"
                        name="email"
                        label={`기존이메일: ${userDTO.email}`}
                        onChange={emailHandler}
                        error={emailError !== "" || false}
                      />
                    </ThemeProvider>
                  </Grid>
                  {/* 유효성 검사를 통해 이메일이 형식에 맞지 않으면 밑에 빨간 글씨로 오류가 뜬다. */}
                  <FormHelperTexts>{emailError}</FormHelperTexts>
                  {/* <h3>기존이메일수신동의</h3> */}
                  <div className="join-genderRadio">
                    <span>이메일 수신 동의 </span>
                    <input
                      type="radio"
                      id="email-agreement"
                      name="subStatus"
                      value="1"
                    />
                    동의
                    <input
                      type="radio"
                      id="email-disagreement"
                      name="subStatus"
                      value="0"
                    />
                    비동의
                  </div>
                </Grid>
                {/* 수정 버튼을 누르면 위 입력한 데이터(updateData)를 백에 보낸다. */}
                <ThemeProvider theme={theme1}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    size="large"
                  >
                    회원정보수정
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

export default UpdateUser;
