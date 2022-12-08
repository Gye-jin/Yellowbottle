import React from "react";
import "../App.css";
import Scroll from "../components/Scroll.js";
// import { Route, Router } from "react-router-dom";
import Header from "../components/Header.js";

function Main() {
  console.log(sessionStorage.getItem("id") + "main");
  return (
    <>
      <Header />
      <Scroll />
    </>
  );
}

export default Main;
