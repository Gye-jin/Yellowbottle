import React from "react";
import Header from "../../components/header/Header";
import SideHeader from "../../components/admin/SideHeader";
import MailSend from "../../components/admin/MailSend";
import styled from "styled-components";
const Center = styled.div`
  height: 92vh;

  display: flex;
  flex-direction: row;
`;
function AdminMailPage() {
  return (
    <>
      <Header />
      <Center>
        <SideHeader />
        <MailSend />
      </Center>
    </>
  );
}

export default AdminMailPage;
