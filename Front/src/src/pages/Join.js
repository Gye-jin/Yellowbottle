import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
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
} from '@mui/material/';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styled from 'styled-components';

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
  const [checked, setChecked] = useState(false);
  const [emailError, setEmailError] = useState('');
  // const [passwordState, setPasswordState] = useState('');
  const [passwordError, setPasswordError] = useState('');
  // 아이디 추가
  const [idError, setIdError] = useState('');
  // 생년월일 추가
  const [birthError, setBirthError] = useState('');

  const [nameError, setNameError] = useState('');
  const [registerError, setRegisterError] = useState('');
  const navigate = useNavigate();

  const handleAgree = (event) => {
    setChecked(event.target.checked);
  };

  const onhandlePost = async (data) => {
    const { id, email, name, password, birth } = data;
    const postData = { id, email, name, password, birth };

    // post
    await axios
    // spring에 보낼 url : controller 와 Dto를 확인해서 수정하자!
      .post('/member/join', postData)
      .then(function (response) {
        console.log(response, '성공');
        navigate.push('/login');
      })
      .catch(function (err) {
        console.log(err);
        setRegisterError('회원가입에 실패하였습니다. 다시한번 확인해 주세요.');
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const joinData = {
      id: data.get("id"),
      email: data.get('email'),
      name: data.get('name'),
      password: data.get('password'),
      birth: data.get('birth'),
    };
    const { id, email, name, password, birth } = joinData;

    // 아이디 유효성 체크: 기존 데이터와 비교해야하는데 이걸 모르겠음 -- 보류 의논 필요( t/f 로 받을지, 아이디로 받을지)
    if (id === data.get("id")) setIdError(' 중복된 아이디입니다.');
    else setIdError('');

    // 이메일 유효성 체크
    const emailRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (!emailRegex.test(email)) setEmailError('올바른 이메일 형식이 아닙니다.');
    else setEmailError('');

    // 비밀번호 유효성 체크
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (!passwordRegex.test(password))
      setPasswordError('숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!');
    else setPasswordError('');

    // 생년월일 유효성 체크
    if (birth.length !== 6) setBirthError('형식이 일치하지 않습니다. 990101과 같이 입력해주세요!');
    else setBirthError('');

    // 이름 유효성 검사
    const nameRegex = /^[가-힣a-zA-Z]+$/;
    if (!nameRegex.test(name) || name.length < 1) setNameError('올바른 이름을 입력해주세요.');
    else setNameError('');

    // 성별 체크 검사
    // if (!checked) alert 

    // 회원가입 동의 체크
    if (!checked) alert('회원가입 약관에 동의해주세요.');

    if (
      // 작성한 아이디 !== 기존 아이디 &&
      passwordRegex.test(password) &&
      // password === rePassword &&
      nameRegex.test(name) &&
      emailRegex.test(email) &&
      checked
    ) {
      onhandlePost(joinData);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} /> */}
          <Typography component="h1" variant="h5">
            회원가입
          </Typography>
          <Boxs component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <FormControl component="fieldset" variant="standard">
              <Grid container spacing={1.5}>
                <Grid item xs={12}>
                  <TextField
                    required
                    autoFocus
                    fullWidth
                    type="id"
                    id="id"
                    name="id"
                    label="아이디"
                    error={idError !== '' || false}
                  />
                </Grid>
                <FormHelperTexts>{idError}</FormHelperTexts>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="password"
                    id="password"
                    name="password"
                    label="비밀번호 (숫자+영문자+특수문자 8자리 이상)"
                    error={passwordError !== '' || false}
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
                    error={nameError !== '' || false}
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
                    label="생년월일 입력(ex.990820)"
                    error={birthError !== '' || false}
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
                    error={emailError !== '' || false}
                  />
                </Grid>
                <FormHelperTexts>{emailError}</FormHelperTexts>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox onChange={handleAgree} color="primary" />}
                    label="개인정보 수집 동의"
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
