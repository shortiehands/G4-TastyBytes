import React, { useEffect, useState } from "react";
import { Navbar, Col, NavDropdown } from "react-bootstrap";
import {
  DivControl,
  HeaderMain,
  HeaderText,
  NavContainer,
  ProfileDropdown,
  SpanIcon,
} from "./styles";
import { Logo } from "../Images";
import { paths } from "../../configs/routes";
import { Profile } from "iconsax-react";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token);
    };

    checkAuth();

    // Listen for changes to localStorage (e.g., login/logout from other tabs)
    window.addEventListener("storage", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    sessionStorage.clear();
    setIsAuthenticated(false);
    navigate("/" + paths.home);
  };

  return (
    <>
      <HeaderMain>
        <NavContainer style={{ display: "flex", width: "100%" }}>
          <div style={{ padding: "0 1rem 0.1rem 1rem" }}>
            <Navbar.Brand href="/home">
              <Logo />
            </Navbar.Brand>
          </div>
          <Col>
            <DivControl>
              <HeaderText
                style={{ paddingRight: "1rem" }}
                onClick={() => navigate("/" + paths.findRecipe)}
              >
                Find Recipe
              </HeaderText>
              <HeaderText
                style={{ paddingRight: "1rem" }}
                onClick={() => navigate("/" + paths.generateRecipeAI)}
              >
                AI Generate
              </HeaderText>
              <HeaderText onClick={() => navigate("/" + paths.manageRecipe)}>
                Manage Recipe
              </HeaderText>
              <ProfileDropdown
                title={
                  <SpanIcon>
                    <Profile size={24} color="white" />
                  </SpanIcon>
                }
              >
                {isAuthenticated ? (
                  <>
                    <NavDropdown.Item onClick={() => navigate("/" + paths.profile)}>
                      My Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={handleSignOut}>
                      Sign Out
                    </NavDropdown.Item>
                  </>
                ) : (
                  <NavDropdown.Item
                    onClick={() => {
                      navigate("/" + paths.login);
                    }}
                  >
                    Sign In
                  </NavDropdown.Item>
                )}
              </ProfileDropdown>
            </DivControl>
          </Col>
        </NavContainer>
      </HeaderMain>
    </>
  );
};

export default Header;
