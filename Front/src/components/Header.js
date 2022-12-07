import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { createTheme } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";

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
  );
}
