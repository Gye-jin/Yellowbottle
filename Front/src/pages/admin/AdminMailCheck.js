import React from "react";
import Header from "../../components/header/Header";
import MailCheck from "../../components/admin/MailCheck";
import SideHeader from "../../components/admin/SideHeader";
import styled from "styled-components";
function AdminMailCheck() {
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
        <MailCheck />
      </Center>
    </>
  );
}

export default AdminMailCheck;
