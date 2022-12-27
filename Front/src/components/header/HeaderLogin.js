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
import Swal from "sweetalert2";

// 회원용 헤더
export default function HeaderLogin() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#332C2C",
      },
    },
  });

  // navigate(이동)하는 함수
  const navigate = useNavigate();
  // 실천내용버튼에 마우스 올렸을때 pointer 효과
  const handleMouseEnter = () => {
    document.body.style.cursor = "pointer";
  };

  const handleMouseLeave = () => {
    document.body.style.cursor = "default";
  };
  // 로그아웃 함수
  const onLogout = async () => {
    // 이 부분부터 새롭게 쓴 logout
    await axios
      // 백에 userId 세션을 보내서 확인되면 로그아웃 진행 오류는 경고창
      .post("http://localhost:8080/api/logout", {
        sessionId: sessionStorage.getItem("sessionId"),
      })
      .then((response) => {
        sessionStorage.removeItem("sessionId");
        Swal.fire({
          icon: "success",
          text: "🌚로그아웃 성공🌝",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          window.location.href = "/";
        }, 1500);
      })
      .catch((err) => {
        sessionStorage.removeItem("sessionId");
        Swal.fire({
          icon: "success",
          text: "🌚로그아웃 성공🌝",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          window.location.href = "/";
        }, 1500);
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
            <img className="logo" src="/img/logo.png" width="100" height="80" />
          </IconButton>
          <Typography
            fontSize="23px"
            onClick={() => navigate("/feed")}
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
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
