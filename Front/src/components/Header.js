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

export default function Header() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#00ff0000",
      },
    },
  });

  // navigate(이동)하는 함수
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(false);

  // const isLogin = props.isLogin;

  useEffect(() => {
    // // sessionStoage에 userId라는 key값으로 저장된 값이 없다면
    // if (sessionStorage.getItem("userId") === null) {
    //   console.log("isLogin ?? ::", isLogin);
    // } else {
    //   // sessionStoage에 userId라는 key값으로 저장된 값이 있다면
    //   // 로그인 상태 변경
    //   setIsLogin(true);
    //   console.log("isLogin ?? ::", isLogin);
    // }

    sessionStorage.getItem("userId") ? setIsLogin(true) : console.log("dd");
  });

  return (
    <div>
      {isLogin ? (
        // Header 컴포넌트 호출 시 isLogin 이라는 props 값을 전달
        <HeaderLogin isLogin={isLogin} />
      ) : (
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
                  src="img/czero_Logo.jpg"
                  width="120"
                  height="70"
                />
              </IconButton>
              <Typography
                onClick={() => navigate("/Feed")}
                variant="h6"
                component="div"
                sx={{ flexGrow: 1 }}
              >
                실천내용
              </Typography>
              <Button color="inherit" onClick={() => navigate("/Login")}>
                로그인
              </Button>
              <Button color="inherit" onClick={() => navigate("/Join")}>
                회원가입
              </Button>
            </Toolbar>
          </AppBar>
        </Box>
      )}
    </div>
  );
}
