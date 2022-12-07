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
  // Label,
} from "@mui/material/";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import styled from "styled-components";
import Header from "../components/Header";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormControl from '@mui/material/FormControl';
import FormLabel from "@mui/material/FormLabel";
import { duplicationCheckAPI } from "../Api/data";

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

const Join = () => {
  const theme = createTheme();
  const [checkedGender, setCheckedGender] = useState(false);
  const [CheckedPersonal, setCheckedPersonal] = useState(false);
  // const [checkedEmail, setCheckedEmail] = useState(false);
  const [emailError, setEmailError] = useState("");
  // const [passwordState, setPasswordState] = useState('');
  const [passwordError, setPasswordError] = useState("");
  // 아이디 추가
  const [userId, setUserId] = useState("");
  const [idError, setIdError] = useState("");
  // 아이디 중복검사 추가
  const [usableId, setUsableId] = useState(false);
  // 생년월일 추가
  const [birthError, setBirthError] = useState("");

  const [nameError, setNameError] = useState("");
  const [registerError, setRegisterError] = useState("");
  const navigate = useNavigate();

  // const genderAgree = (e) => {
  //   setCheckedGender(e.target.checkedGender);
  // }

  const handlePersonalAgree = (event) => {
    setCheckedPersonal(event.target.checked);
  };

  const handleGenderAgree = (e) => {
    setCheckedGender(e.target.value);
  };

  const userIdHandler = (e) => {
    setUserId(e.target.value);
  };

  const onhandlePost = async (joinData) => {
    // post
    await axios
      // spring에 보낼 url : controller 와 Dto를 확인해서 수정하자!
      .post("http://localhost:8080/api/join", joinData)
      .then(function (response) {
        console.log(response, "성공");
        navigate("/login");
      })
      .catch(function (err) {
        console.log(err);
        setRegisterError("회원가입에 실패하였습니다. 다시한번 확인해 주세요.");
      });
  };

  // id가 중복된 아이디인지 검사하는 곳
  const duplicationCheck = () => {
    // const userId = event.currentTarget.get("id");
    duplicationCheckAPI(userId).then((response) => {
      console.log(response);
      if (response === false) {
        alert("사용 가능한 아이디입니다");
        setUsableId(response);
      } else {
        alert("중복된 아이디입니다.");
        setUsableId(response);
      }
      console.log("중복체크");
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const joinData = {
      userId: data.get("id"),
      email: data.get("email"),
      name: data.get("name"),
      userPw: data.get("password"),
      birth: data.get("birth"),
      sex: data.get(""),
    };
    const { userId, email, name, userPw, birth } = joinData;

    // 아이디 유효성 체크: 기존 데이터와 비교해야하는데 이걸 모르겠음 -- 보류 의논 필요( t/f 로 받을지, 아이디로 받을지)
    // if (id === data.get("id")) setIdError(' 중복된 아이디입니다.');
    // else setIdError('');

    // 이메일 유효성 체크
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (!emailRegex.test(email))
      setEmailError("올바른 이메일 형식이 아닙니다.");
    else setEmailError("");

    // 비밀번호 유효성 체크
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (!passwordRegex.test(userPw))
      setPasswordError(
        "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!"
      );
    else setPasswordError("");

    // 생년월일 유효성 체크
    const birthRegex =
      /^(19[0-9][0-9]|20\d{2})-(0[0-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
    if (!birthRegex.test(birth))
      setBirthError(
        "형식이 일치하지 않습니다. 1999-08-20과 같이 입력해주세요!"
      );
    else setBirthError("");

    // 이름 유효성 검사
    const nameRegex = /^[가-힣a-zA-Z]+$/;
    if (!nameRegex.test(name) || name.length < 1)
      setNameError("올바른 이름을 입력해주세요.");
    else setNameError("");

    // 성별 체크 검사
    if (!checkedGender) alert("성별을 체크해주세요.");

    // 회원가입 동의 체크
    if (!CheckedPersonal) alert("회원가입 약관에 동의해주세요.");

    if (
      // 작성한 아이디 !== 기존 아이디 &&
      passwordRegex.test(userPw) &&
      // password === rePassword &&
      nameRegex.test(name) &&
      // birth.length.test(birth) &&
      emailRegex.test(email) &&
      // checkedGender &&
      CheckedPersonal
    ) {
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
          {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} /> */}
          <Typography component="h1" variant="h5">
            회원가입
          </Typography>

          <div className="join-inputId">
            <Grid item xs={12}>
              <TextField
                required
                autoFocus
                fullWidth
                type="id"
                id="id"
                name="id"
                onChange={userIdHandler}
                value={userId}
                label="아이디"
                error={idError !== "" || false}
                // className="join-inputId"
              />
            </Grid>
          </div>
          <FormHelperTexts>{idError}</FormHelperTexts>
          <button className="join-idCheck" onClick={duplicationCheck}>
            아이디 중복검사
          </button>

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
                    type="password"
                    id="password"
                    name="password"
                    label="비밀번호 (숫자+영문자+특수문자 8자리 이상)"
                    error={passwordError !== "" || false}
                  />
                </Grid>
                <FormHelperTexts>{passwordError}</FormHelperTexts>
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
                <FormHelperTexts>{nameError}</FormHelperTexts>
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
                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    {/* {" "} */}
                    <p className="join-gender" onChange={handleGenderAgree}>
                      성별
                      <FormControlLabel
                        id="male"
                        value="M"
                        control={<Checkbox />}
                        label="남"
                      />
                      <FormControlLabel
                        id="female"
                        value="F"
                        control={<Checkbox />}
                        label="여"
                      />
                    </p>
                  </RadioGroup>
                </FormControl>
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
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={handlePersonalAgree}
                        color="primary"
                      />
                    }
                    label="(선택)이메일 수신 동의"
                  />
                </Grid>
              </Grid>
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
            <FormHelperTexts>{registerError}</FormHelperTexts>
          </Boxs>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Join;
