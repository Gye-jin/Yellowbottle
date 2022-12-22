import React from "react";
import styled from "styled-components";
function SidebarItem({ menu }) {
  const PP = styled.p`
    display: inline-block;
    font-weight: bold;
    font-size: 20px;
  `;
  return (
    <div className="sidebar-item">
      <PP>{menu.name}</PP>
    </div>
  );
}

export default SidebarItem;
