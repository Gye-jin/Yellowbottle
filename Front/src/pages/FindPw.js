import Header from "../components/Header";
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
import { Link } from "react-router-dom";

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
  const [emailError, setEmailError] = useState('');
  // const [passwordState, setPasswordState] = useState('');
  const [passwordError, setPasswordError] = useState('');
  // 아이디 추가
  const [idError, setIdError] = useState('');
  // 생년월일 추가
  const [birthError, setBirthError] = useState('');
  const [registerError, setRegisterError] = useState('');
  const navigate = useNavigate();

  const handleAgree = (event) => {
    setChecked(event.target.checked);
  };

  const onhandlePost = async (data) => {
    const { id, email, birth } = data;
    const postData = { id, email, birth };

    // post
    await axios
    // spring에 보낼 url : controller 와 Dto를 확인해서 수정하자!
      .post('/member/join', postData)
      .then(function (response) {
        console.log(response, '성공');
        navigate.push('/');
      })
      .catch(function (err) {
        console.log(err);
        setRegisterError('비밀번호 찾기에 실패하였습니다. 다시한번 확인해 주세요.');
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const joinData = {
      id: data.get("id"),
      email: data.get('email'),
      birth: data.get('birth'),
    };
    const { id, email, birth } = joinData;

    // 아이디 유효성 체크: 기존 데이터와 비교해야하는데 이걸 모르겠음 -- 보류 의논 필요( t/f 로 받을지, 아이디로 받을지)
    if (id === data.get("id")) setIdError(' id = data.get("id)');
    else setIdError('');

    // 이메일 유효성 체크
    const emailRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (!emailRegex.test(email)) setEmailError('올바른 이메일 형식이 아닙니다.');
    else setEmailError('');

    // 생년월일 유효성 체크
    if (birth.length !== 6) setBirthError('형식이 일치하지 않습니다. 990101과 같이 입력해주세요!');
    else setBirthError('');

    if (
      // 작성한 아이디 !== 기존 아이디 &&
    //   passwordRegex.test(password) &&
      // password === rePassword &&
    //   nameRegex.test(name) &&
      emailRegex.test(email) &&
      birth.length.test(birth) &&
      checked
    ) {
      onhandlePost(joinData);
    }
  };

  return (
    
    <ThemeProvider theme={theme}>
      <Header/>
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
          {/* <Typography component="h1" variant="h5">
            
          </Typography> */}
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
              </Grid>
              <Link to={'/resetPw'}>
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                size="large"
              >
                비밀번호 찾기
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

export default FindPw;
