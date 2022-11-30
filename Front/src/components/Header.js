import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
// import MenuIcon from '@mui/icons-material/Menu';
import { createTheme } from '@material-ui/core/styles';
// import { ThemeProvider } from '@material-ui/styles';

export default function Header() {
  
  
  const theme = createTheme({
    palette: {
        primary: {
          main: "#00ff0000",
        },
      }
  });
  

  return (
    
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" theme={theme} >
        <Toolbar >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            {/* 로고 */}
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            실천내용
          </Typography>
          <Button color="inherit">로그인</Button>
          <Button color="inherit" >회원가입</Button>
        </Toolbar>
      </AppBar>
    </Box>

  );

}
