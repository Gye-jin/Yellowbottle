import React, { useState } from "react";
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
  // Label,
} from "@mui/material/";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import styled from "styled-components";
import Header from "../../components/header/Header";
import { duplicationCheck } from "../../Api/LogData";
import { ForPostJoinData } from "../../Api/LogData";
import {
  BirthRegexTest,
  EmailRegexTest,
  GenderRegexTest,
  IdRegexTest,
  NameRegexTest,
  PasswordRegexTest,
} from "../../components/Regex";

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
const Join = () => {
  // mui 테마
  const theme = createTheme();
  // 개인정보 체크박스 체크여부확인
  const [CheckedPersonal, setCheckedPersonal] = useState(false);
  // 이메일 입력오류
  const [emailError, setEmailError] = useState("");
  // 비밀번호 입력오류
  const [passwordError, setPasswordError] = useState("");
  // 아이디 입력오류
  const [idError, setIdError] = useState("");
  // 아이디 중복검사
  const [usableId, setUsableId] = useState(false);
  // 생년월일 입력오류
  const [birthError, setBirthError] = useState("");
  // 이름 입력오류
  const [nameError, setNameError] = useState("");
  // 회원가입버튼 눌렀을 때 오류
  const [registerError, setRegisterError] = useState("");

  // 개인정보동의 체크박스 여부 함수
  const handlePersonalAgree = (event) => {
    setCheckedPersonal(event.target.checked);
  };

  // 회원가입 버튼 누를때 실행되는 함수: joinData(입력된 값)를 유효성 검사를 통해 JoinData.js에 있는 ForPostJoinData 함수에 보내준다.
  const createJoinData = (e) => {
    // 실행시 화면새로고침 방지
    e.preventDefault();
    // FormData를 통해 각각의 입력값들이 변화되면 바뀐 value값 확인 가능!
    const data = new FormData(e.currentTarget);
    const joinData = {
      userId: data.get("id"),
      email: data.get("email"),
      name: data.get("name"),
      userPw: data.get("password"),
      birth: data.get("birth"),
      sex: data.get("gender"),
      subStatus: data.get("userEmail") === "on" ? 1 : 0,
    };
    // 입력된 값들을 joinData에 넣는다.
    const { userId, email, name, userPw, birth, sex, subStatus } = joinData;
    // 입력한 값 유효성체크
    IdRegexTest(userId, setIdError);
    EmailRegexTest(email, setEmailError);
    PasswordRegexTest(userPw, setPasswordError);
    BirthRegexTest(birth, setBirthError);
    NameRegexTest(name, setNameError);
    GenderRegexTest(sex);
    // 회원가입 동의 체크
    if (!CheckedPersonal) {
      alert("회원가입 약관에 동의해주세요.");
    }
    // 만약 위 유효성 검사를 모두 통과하면 ForPostJoinData()를 실행한다.
    if (
      passwordError === "" &&
      nameError === "" &&
      emailError === "" &&
      idError === "" &&
      CheckedPersonal &&
      usableId === true
    ) {
      console.log(joinData);
      ForPostJoinData(joinData, setRegisterError);
    } else {
      setRegisterError("🌍다시 확인해주세요🌍");
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
            회원가입
          </Typography>
          <Boxs
            component="form"
            noValidate
            onSubmit={createJoinData}
            sx={{ mt: 3 }}
          >
            <FormControl component="fieldset" variant="standard">
              <div className="join-inputId">
                {/* 아이디 입력칸 */}
                <Grid item xs={12}>
                  <TextField
                    required
                    autoFocus
                    fullWidth
                    type="text"
                    id="id"
                    name="id"
                    label="아이디"
                    error={idError !== "" || false}
                  />
                </Grid>
              </div>
              {/* 유효성 검사를 통해 아이디가 형식에 맞지 않으면 밑에 빨간 글씨로 오류가 뜬다. */}
              <FormHelperTexts>{idError}</FormHelperTexts>
              {/* 아이디 중복검사 버튼을 누르면 입력된 아이디값을 백에 존재하는 아이디 값들과 비교해서 중복여부를 알려준다. */}
              <a
                className="join-idCheck"
                onClick={() => duplicationCheck(setUsableId)}
              >
                아이디 중복검사
              </a>
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
                  />
                </Grid>
                {/* 유효성 검사를 통해 비밀번호가 형식에 맞지 않으면 밑에 빨간 글씨로 오류가 뜬다. */}
                <FormHelperTexts>{passwordError}</FormHelperTexts>
                {/* 이름 입력칸 */}
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="name"
                    name="name"
                    label="이름"
                    error={nameError !== "" || false}
                  />
                </Grid>
                {/* 유효성 검사를 통해 이름이 형식에 맞지 않으면 밑에 빨간 글씨로 오류가 뜬다. */}
                <FormHelperTexts>{nameError}</FormHelperTexts>
                {/* 생년월일 입력칸 */}
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="birth"
                    id="birth"
                    name="birth"
                    label="생년월일 입력(ex.1999-08-20)"
                    error={birthError !== "" || false}
                  />
                </Grid>
                {/* 유효성 검사를 통해 생일이 형식에 맞지 않으면 밑에 빨간 글씨로 오류가 뜬다. */}
                <FormHelperTexts>{birthError}</FormHelperTexts>
                {/* 이메일 입력칸 */}
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
                {/* 유효성 검사를 통해 이메일이 형식에 맞지 않으면 밑에 빨간 글씨로 오류가 뜬다. */}
                <FormHelperTexts>{emailError}</FormHelperTexts>
                {/* 성별 선택칸 */}
                <div className="join-genderRadio">
                  <span>성별 </span>
                  <input type="radio" id="gender" name="gender" value="F" />
                  여성
                  <input type="radio" id="gender" name="gender" value="M" />
                  남성
                  <div id="result"></div>
                </div>
                {/* 개인정보 동의칸 */}
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={handlePersonalAgree}
                        color="primary"
                      />
                    }
                    label="개인정보 수집 동의"
                  />
                </Grid>
                {/* 이메일 수신동의칸 */}
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        id="userEmail"
                        name="userEmail"
                        color="primary"
                      />
                    }
                    label="(선택)이메일 수신 동의"
                  />
                </Grid>
              </Grid>
              {/* 회원가입 버튼을 누르면 위 입력한 데이터(joinData)를 백에 보낸다. */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                size="large"
              >
                회원가입
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

export default Join;
