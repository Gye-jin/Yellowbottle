import React from "react";
import styled from "styled-components";
import { Routes, Route } from "react-router-dom";

function Header() {
  const [content, setContent] = useState();

  const handleClickButton = (e) => {
    const { name } = e.target;
    setContent(name);
  };

  const selectComponent = {
    Login: <Login />,
    // Join: <Join />
  };

  return (
    <div className="header">
      <button>
        <a href="/">C-Zero</a>
      </button>
      <a href="/feed">실천내용</a>

      {/* <Routes> */}
      {/* <Route> */}
      <a href="/login">로그인</a>
      {/* </Route>
      </Routes> */}
      <a href="/join">회원가입</a>
    </div>
  );
}

export default Header;
