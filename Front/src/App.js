import React from "react";
import "./App.css";
import Header from "./components/Header";
import Scroll from "./components/Scroll";
import { Route, Router } from "react-router-dom";
import Popup from "./components/Popup";

function App() {
  return (
    <>
      <Header></Header>
      <Popup></Popup>
      <Scroll></Scroll>
      {/* </body> */}
    </>
  );
}

export default App;
