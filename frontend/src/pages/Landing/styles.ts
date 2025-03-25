import styled from "styled-components";
import landingBg from "../../images/food-background.jpg";
import { Form, FormControl, Nav, NavDropdown } from "react-bootstrap";
import { colors } from "../../styles/Theme";

const Background = styled.div`
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover; //contain
  min-height: auto;
  height: auto;
  width: 100%;
  background-image: url(${landingBg});
  align-items: center;
`;

const App = styled.div`
  background-color: white;
`;
const AuthFormContainer = styled.div`
  display: flex;
  justify-content: right;
  padding-right: 12rem;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;
const AuthForm = styled.div`
  width: 420px;
  box-shadow: rgb(0 0 0 / 16%) 1px 1px 10px;
  padding-top: 30px;
  padding-bottom: 20px;
  border-radius: 8px;
  background-color: #ffe5d4;

  &.signUp {
    padding-bottom: 30px;
  }

  @media (max-width: 453px) {
    width: 360px;
  }

  @media (max-width: 390px) {
    width: 335px;
  }

  @media (max-width: 360px) {
    width: 320px;
  }
`;
const AuthFormContent = styled.div`
  padding-left: 12%;
  padding-right: 12%;

  @media (max-width: 453px) {
    padding-left: 9%;
    padding-right: 9%;
  }
`;
const AuthFormTitle = styled.div`
  text-align: center;
  margin-bottom: 1em;
  font-size: 24px;
  color: rgb(34, 34, 34);
  font-weight: 800;
`;
const Label = styled.div`
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  color: rgb(34, 34, 34);
`;
const FieldLabel = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: rgb(34, 34, 34);
`;
const FormInput = styled(FormControl)`
  height: 2.8rem;
`;
const CheckLabel = styled(Form.Check)`
  margin-top: 0.4rem;
  .form-check-label {
    margin-top: 0.27rem;
    font-size: 11px;
  }

  .form-check-input {
    margin-right: 0px;
  }
`;
const NavLinkStyled = styled(Nav.Link)`
  font-size: 11px;
  font: Poppins;
  color: #1c72fa;
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
`;

const NavDropdownStyled = styled(NavDropdown)`
  font-size: 11px;
  font: Poppins;
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;

  .dropdown-item {
    padding: 10px 0px 10px 25px;
  }

  .dropdown-item:hover {
    background-color: ${colors.orange};
    color: ${colors.white};
  }

  .dropdown-menu.show {
    inset: 3px auto auto -110px !important;
    border: none;
    box-shadow: 0rem 0rem 0.625rem ${colors.lightBlack};
  }
`;

const FormTextStyled = styled(Form.Text)`
  font-size: 0.688rem;
  color: ${colors.slateGrey};
  padding-bottom: 0.25rem;

  &.required-field {
    color: ${colors.red};
  }
`;

export {
  Background,
  App,
  AuthFormContainer,
  AuthForm,
  AuthFormContent,
  AuthFormTitle,
  FieldLabel,
  Label,
  FormInput,
  CheckLabel,
  NavLinkStyled,
  NavDropdownStyled,
  FormTextStyled,
};
