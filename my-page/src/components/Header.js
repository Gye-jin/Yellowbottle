import React from "react";
import styled from "styled-components";

// const HeaderUI = styled.ol`
//   list-style: none;
//   padding: 10px;
//   margin: 0px;
//   width: 100%;
//   background-color: #c9df59;
//   /* height: 100%; */
//   overflow: auto;
//   display: block;
//   /* display: table-column; */
//   position: fixed;
//   list-style: none;
//   align-items: center;
// `;

function Header() {
  return (
    <div className="headbar">
      <ol className="hh">
        <h1>Diary</h1>
        <li>
          <a href="/menu1">하루기록</a>
        </li>
        <br />
        <li>
          <a href="/menu2">감사일지</a>
        </li>
        <br />
        <li>
          <a href="/menu3">월간일정</a>
        </li>
      </ol>
    </div>
  );
}

export default Header;
