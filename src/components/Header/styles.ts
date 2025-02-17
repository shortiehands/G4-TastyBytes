import { Button, NavDropdown } from "react-bootstrap";
import styled from "styled-components";
import { colors } from "../../styles/Theme";
import { Logo } from "../Images";

const HeaderMain = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-flex: 0;
  -ms-flex: 0;
  width: -webkit-fill-available;
  width: -moz-available;
  box-shadow: 0rem 0.5rem 0.5rem 0rem ${colors.lightBlack};
  z-index: 100;
  padding: 12px 16px 5px 16px; // default 2.5rem
  background-color: ${colors.orange};

  @media (max-width: 399px) {
    padding-left: 5px;
  }

  @media (max-width: 387px) {
    padding-left: 0px;
    padding-right: 10px;
  }
`;

const NavContainer = styled.div`
  .dropdown-menu {
    font-size: 0.875rem;
    // min-width: 100%;
    margin: 0.5rem 0 0;
    // margin-top: 0.75rem;
    // margin-bottom: 0.5rem;
    border: 0.016rem solid ${colors.lightBlack};
    box-shadow: 0rem 0.375rem 0.5rem 0rem ${colors.lightBlack};
  }

  .dropdown-item {
    padding: 0.75rem 1rem;
    color: ${colors.black};
    text-align: inherit;
    border: 0;

    @media (max-width: 720px) {
      font-size: 12px;
    }
  }

  .dropdown-item:hover,
  .dropdown-item:focus {
    color: ${colors.darkGrey};
    text-decoration: none;
    background-color: ${colors.peach};
  }
  .dropdown-item.active,
  .dropdown-item:active {
    color: ${colors.orange};
    text-decoration: none;
    background-color: ${colors.peach};
  }

  // to set the dropdown menu for profile
  .dropdown-menu.show {
    left: auto;
    right: 0 !important;
  }
`;

// const NavDropdownStyled = styled(NavDropdown)`
//   margin-left: 6rem;
  
//   .dropdown-toggle {
//     color: ${colors.black};
//     border-radius: 0.375rem;
//     border: 0.063rem solid ${colors.whisper};
//     padding: 0.85rem;
//   }

//   .dropdown-toggle:focus,
//   .dropdown-toggle:active {
//     outline: 0;
//     box-shadow: 0 0 0 0.05rem ${colors.dodgerBlue};
//   }

//   .dropdown-menu.show {
//     display: block;
//   }

//   @media (max-width: 992px) {
//     margin-left: 0rem;
//   }
// `;

const SpanIcon = styled.span`
  padding-right: 0.625rem;
  padding-left: 1.25rem;

  &:hover {
    color: ${colors.white};
  }

  &. paddingRight {
    padding-left: 0rem !important;
  }

  @media (max-width: 576px) {
    padding-right: 0px;
    padding-left: 8px;
  }
  
  @media (max-width: 376px) {
    padding-left: 5px;
  }

  @media (max-width: 360px) {
    padding-left: 1px;
  }
`;

const DivControl = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 1rem 1rem 1rem 0;

  @media (max-width: 992px) {
    padding-top: 0.625rem;
  }
`;

const LogoStyled = styled(Logo)`
  align-items: center;
  // width: 95%;

  // @media (max-width: 992px) {
  //   width: 85%;
  // }
`;

const ProfileDropdown = styled(NavDropdown)`
  // padding-left: 6px;
  color: ${colors.white};

  @media (max-width: 992px) {
    .dropdown-toggle::after {
      display: none !important;
    }
  } 

  @media (max-width: 576px) {
    padding-left: 0px;
  }
`;

// const KayaakuBizSmLogoStyled = styled(KayaakuBizSmallLogo)`
//   width: 3rem;
//   margin-right: 20px;

//   @media (max-width: 992px){
//     margin-right: 0px !important;
//   }

//   @media (max-width: 368px){
//     width: 2.7rem;
//   }
// `;

// const ToggleButton = styled(Button)`
//   margin-right: 15px;
//   margin-top: 2px;
//   border: none;

//   @media (max-width: 576px){
//     margin-right: 8px;
//     padding-left: 0px;
//     padding-right: 2px;
//   }

//   @media (max-width: 377px) {
//     margin-right: 4px;
//   }

//   @media (max-width: 361px) {
//     margin-right: 2px;
//   }
// `;

export {
  HeaderMain,
  NavContainer,
//   NavDropdownStyled,
  SpanIcon,
  DivControl,
  LogoStyled,
  ProfileDropdown,
//   KayaakuBizSmLogoStyled,
//   ToggleButton,
};
