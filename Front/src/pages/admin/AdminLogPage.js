import React from "react";
import Header from "../../components/header/Header";
import styled from "styled-components";
import SideHeader from "../../components/admin/SideHeader";
import Tableau1 from "../../components/admin/Tableau";
function AdminLogPage() {
  const Center = styled.div`
    height: 92vh;

    display: flex;
    flex-direction: row;
  `;
  return (
    <>
      <Header />
      <Center>
        <SideHeader />
        <Tableau1 />
      </Center>
    </>
  );
}

export default AdminLogPage;
