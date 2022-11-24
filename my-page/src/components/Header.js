import React from "react";
import styled from "styled-components";

const HeaderUI = styled.li.a`
  list-style-type: none;
  padding: 40px;
  margin: 0px;
  width: 150px;
  background: #c0d651;
  height: 100%;
  overflow: auto;
  display: table-column;
  position: sticky;
  left:0;
`;

function Header() {
  return (
    <div className="headbar">
      <ol className="hh">
        <h1>Diary</h1>
        <li>
          <a href="/menu1">메뉴1</a>
        </li>
        <li>
          <a href="/menu2">메뉴2</a>
        </li>
        <li>
          <a href="/menu3">메뉴3</a>
        </li>
      </ol>
    </div>
  );
}

export default Header;