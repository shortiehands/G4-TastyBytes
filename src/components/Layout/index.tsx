import React, { useState } from "react";
// import Menu from "components/Menu";
import Header from "../Header";
import { AppContainer, Main, AppBody } from "./styles";

interface LayoutProps {
  children: React.ReactNode;
  currentPath?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, currentPath }) => {
//   const [menuOpen, setMenuOpen] = useState(false);

  return (
    <AppContainer>
      <Main>
        <Header />
        <AppBody>
          {/* <Menu
            currentPath={currentPath}
            open={menuOpen}
            setOpen={setMenuOpen}
          />
          {menuOpen && (
            <MenuOverlay onClick={handleOnClickClose}>"</MenuOverlay>
          )} */}
          {children}
        </AppBody>
      </Main>
    </AppContainer>
  );
};

export default Layout;
