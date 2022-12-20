import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { createTheme } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

// 관리자용 헤더
export default function HeaderAdmin() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#4A4040",
      },
    },
  });

  // const Typographys = styled(Typography)`
  //   width: 90%;
  // `;
  // navigate(이동)하는 함수
  const navigate = useNavigate();

  // const isLogin = props.isLogin;

  // 로그아웃 함수
  const onLogout = async () => {
    // 이 부분부터 새롭게 쓴 logout
    await axios
      // 백에 userId 세션을 보내서 확인되면 로그아웃 진행 오류는 경고창
      .post("http://localhost:8080/api/logout", {
        sessionId: sessionStorage.getItem("sessionId"),
      })

      .then((response) => {
        response.data
          ? // 백에서 정상적으로 처리되면 로그아웃 성공! 후 메인페이지로 이동
            sessionStorage.removeItem("sessionId")((window.location.href = "/"))
          : // 백에서 정상적으로 처리 실패시 로그아웃 실패!
            alert("🤘🏿😝😜🤘🏿" + " " + "로그아웃실패");
      });
  };

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
              alt="로고"
              className="logo"
              src="/img/logo.png"
              width="100"
              height="80"
            />
          </IconButton>
          {/* 실천내용 */}
          <Typography
            onClick={() => navigate("/feed")}
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            실천내용
          </Typography>
          {/* 로그아웃 */}
          <Button color="inherit" onClick={onLogout}>
            로그아웃
          </Button>
          <Button color="inherit" onClick={() => navigate("/adminLogPage")}>
            관리자페이지
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
