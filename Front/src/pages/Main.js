import React from "react";
import "../App.css";
import Scroll from "../components/Scroll";
// import { Route, Router } from "react-router-dom";
import Header from "../components/Header";
import { useState } from "react";
// import "./styles.css";
import Register from "./Join";
import { Routes } from "react-router-dom";

function Main() {
  return (
    <>
      <Header/>
      
      <Scroll></Scroll>
    </>
  );
}

export default Main;
