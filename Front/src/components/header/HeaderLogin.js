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

// 회원용 헤더
export default function HeaderLogin() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#00ff0000",
      },
    },
  });

  // navigate(이동)하는 함수
  const navigate = useNavigate();
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
          : // 백에서 정상적으로 처리 실패해도 로그아웃 성공!
            sessionStorage.removeItem("sessionId")(
              (window.location.href = "/")
            );
      });
  };

  return (
    <Box sx={{ flexGrow: 1 }} className="header-Header">
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
              src="/img/czero_Logo.jpg"
              width="120"
              height="70"
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
          <Button color="inherit" onClick={onLogout}>
            로그아웃
          </Button>
          <Button color="inherit" onClick={() => navigate("/myPage")}>
            마이페이지
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
