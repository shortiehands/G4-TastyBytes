import React, {
  SetStateAction,
  useEffect,
  useState,
  Dispatch,
  useContext,
} from "react";
import { Navbar, Nav, Col, NavDropdown } from "react-bootstrap";
import {
  DivControl,
  HeaderMain,
  NavContainer,
  ProfileDropdown,
  SpanIcon,
} from "./styles";
import { Logo } from "../Images";
import { paths } from "../../configs/routes";
import { Profile } from "iconsax-react";

const Header: React.FC = () => {
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });
  return (
    <>
      <HeaderMain>
        <NavContainer
          style={{ display: "flex", width: "100%"}}
        >
          <div style={{ padding: "0 1rem 0.1rem 1rem" }}>
            <Navbar.Brand href="/home">
              <Logo />
            </Navbar.Brand>
          </div>
          <Col>
            <DivControl>
                <ProfileDropdown
                  title={
                    <SpanIcon>
                      <Profile size={24} color="white"/>
                    </SpanIcon>
                  }
                >
                  <NavDropdown.Item>My Profile</NavDropdown.Item>
                </ProfileDropdown>
            </DivControl>
          </Col>
        </NavContainer>
      </HeaderMain>
    </>
  );
};

export default Header;
