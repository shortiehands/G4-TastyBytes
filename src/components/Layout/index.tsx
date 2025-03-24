import React from "react";
import Header from "../Header";
import { AppContainer, Main, AppBody } from "./styles";
import { useLocation } from "react-router-dom";
import { paths } from "../../configs/routes";

interface LayoutProps {
  children: React.ReactNode;
  currentPath?: string;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const pathName = location.pathname;

  return (
    <AppContainer>
      <Main>
        <Header />
        <AppBody>{children}</AppBody>
      </Main>
    </AppContainer>
  );
};

export default Layout;
