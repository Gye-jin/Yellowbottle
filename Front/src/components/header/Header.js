import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { createTheme } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import HeaderLogin from "./HeaderLogin";
import HeaderAdmin from "./HeaderAdmin";
import styled from "styled-components";

// 상태값에 따른 헤더 부여 함수 및 비회원용 헤더
export default function Header() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#4A4040",
      },
    },
  });
  const Boxs = styled(Box)``;

  // navigate(이동)하는 함수
  const navigate = useNavigate();
  // login 상태값... 기본값은 false
  const [isLogin, setIsLogin] = useState(false);
  // session을 확인해 userId의 값에따라 Header부분을 변경함
  useEffect(() => {
    // userId 키를 이용해 세션을 찾음
    const whoSession = sessionStorage.getItem("sessionId");
    // 세션값이 없으면 비회원
    if (whoSession === null) {
    }
    // 세션값이 백에서 지정한 관리자 값이면 isLogin값을 admin으로 수정
    else if (whoSession === "관리자") {
      setIsLogin("admin");
    }
    // 세션값이 존재한다면 isLogin값을 true로 수정 --> 만약 setisLogin("admin")이 안된다면 isLogin의 초기값을 false가 아닌 ""로 설정하자
    else {
      setIsLogin(true);
    }
  });
  // return되는 Header
  // 만약 isLogin값이 기본값 false이면 비회원용 헤더를 보여준다.
  if (isLogin === false) {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" theme={theme}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => navigate("/")}
            >
              {/* 로고 */}
              <img
                className="logo"
                src="/img/logo.png"
                width="100"
                height="80"
              />
            </IconButton>
            <Typography
              onClick={() => navigate("/feed")}
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              실천내용
            </Typography>
            <Button color="inherit" onClick={() => navigate("/login")}>
              로그인
            </Button>
            <Button color="inherit" onClick={() => navigate("/join")}>
              회원가입
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }
  // 만약 isLogin 값이 admin이라면 관리자용 헤더를 보여준다.
  else if (isLogin === "admin") {
    return <HeaderAdmin isLogin={isLogin} />;
  }
  // 만약 isLogin 값이 true라면 회원용 헤더를 보여준다.
  else {
    return <HeaderLogin isLogin={isLogin} />;
  }
}
