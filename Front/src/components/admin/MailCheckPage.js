import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import SidebarItem from "./SidebarItem";
import Mailtest2 from "./MailCheck";
// npm install react react-router-dom
export default function MailCheckPage() {
  const Side = styled.div`
  display:flex;
  border-right: 1px solid #e0e0e0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 20%;
`
const Center = styled.div`
  height: 92vh;

  display:flex;
  flex-direction: row;
  
  
`

const Menu = styled.div`
  margin-top: 30px;
  width: 200px;
  display: flex;
  flex-direction: column;
`
 
    const menus = [
    { name: "메일 전송", path: "/adminMailPage" },
    { name: "보낸 메일", path: "/adminMailCheck" },
    { name: "대시보드", path: "/adminLogPage" },
    
     ];

   
    const navigate = useNavigate();
    
    return(
      <p>
       
        <Center>
        <Side>
        
        <Menu>
        
        {menus.map((menu, index) => {
          return (
            <NavLink
              exact
              style={{color: "gray", textDecoration: "none"}}
              to={menu.path}
              key={index}
              activeStyle={{color: "black"}}
            >
              <SidebarItem
                menu={menu}
              />
            </NavLink>
          );
        })}
        
        </Menu>
      
    </Side>
    <Mailtest2/>
    </Center>
    </p>
    );
}