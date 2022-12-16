import React from "react";
import "../App.css";
import ScrollMain from "../components/ScrollMain";
// import { Route, Router } from "react-router-dom";
import Header from "../components/Header.js";

function Main() {
  console.log(sessionStorage.getItem("id") + "main");
  return (
    <>
      <Header />
      <ScrollMain />
    </>
  );
}

export default Main;
