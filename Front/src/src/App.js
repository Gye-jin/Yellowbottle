import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Join from "./pages/Join";
import Feed from "./pages/Feed";
import ReadBoard from "./pages/ReadBoard";
import Header from "./components/Header";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div>
      {/* //       <ul>
//         <li>
//           <Link to="/">Main</Link>
//         </li>
//         <li>
//           <Link to="/login">로그인</Link>
//         </li>
//       </ul>
//       <hr />
//       <Route path="/" exact={true} component={Main} />
//       <Route path="/login" component={Login} />
//     </div> */}

      {/* <BrowserRouter> */}
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/readboard/*" element={<ReadBoard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* </BrowserRouter> */}
    </div>
  );
}

export default App;
