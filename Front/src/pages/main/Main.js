import React from "react";
import "../../App.css";
import ScrollMain from "../../components/ScrollMain.js";
import Header from "../../components/header/Header.js";

// 메인 페이지
function Main() {
  // console.log(sessionStorage.getItem("sessionId") + "main");
  return (
    <>
      <Header />
      <ScrollMain />
    </>
  );
}

export default Main;
