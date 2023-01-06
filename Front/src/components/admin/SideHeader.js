import styled from "styled-components";
import { NavLink } from "react-router-dom";
import SidebarItem from "./SidebarItem";

export default function SideHeader() {
  const Side = styled.div`
    display: flex;
    border-right: 1px solid #e0e0e0;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 20%;
  `;

  const Menu = styled.div`
    margin-top: 30px;
    width: 200px;
    display: flex;
    flex-direction: column;
  `;
  const menus = [
    { name: "메일 전송", path: "/adminMailPage" },
    { name: "보낸 메일", path: "/adminMailCheck" },
    { name: "대시보드", path: "/adminLogPage" },
  ];

  return (
    <Side>
      <Menu>
        {menus.map((menu, index) => {
          return (
            <NavLink
              exact
              style={{ color: "gray", textDecoration: "none" }}
              to={menu.path}
              key={index}
              activeStyle={{ color: "black" }}
            >
              <SidebarItem menu={menu} />
            </NavLink>
          );
        })}
      </Menu>
    </Side>
  );
}
