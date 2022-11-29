import React from "react";
import "./App.css";
import Header from "./components/Header";
import Scroll from "./components/Scroll";
// import { Route, Router } from "react-router-dom";
import ButtonAppBar from "./components/Demo";
import { useState } from "react";
// import "./styles.css";
import Example from "./components/Example";
import Register from "./Register";

function App() {
  // const [showPopup, setShowPopup] = useState(false);

  // const togglePopup = (event) => {
  //   setShowPopup(event.target.value)
  // };
  const [ispopup, setIsPopup] = useState(false)
  const handlePopup = () => {
    return (
        setIsPopup(!ispopup)
    )
}
  return (
    <>
      {/* <Header></Header> */}
      {/* <Example/> */}
      {/* <ButtonAppBar/> */}
      {/* <Popup></Popup> */}
      
      {/* <Scroll></Scroll> */}
      <Register/>
      {/* </body> */}
    </>
  );
}

export default App;
