import React, { useState } from "react";
import { AuthForm, AuthFormContainer, AuthFormContent } from "../styles";
import {
  FormGroup,
  Col,
  InputGroup,
  FormControl,
  FormLabel,
} from "react-bootstrap";
import { Sms, Eye, EyeSlash } from "iconsax-react";
import CustomButton from "../../../components/CustomButton";
import ModalResult from "../../../components/ModalResult";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../configs/routes";
import LandingMain from "../LandingMain";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const handleClose = () => {
    setOpenModal(false);
    navigate("/" + paths.login);
  };

  return (
    <LandingMain>
      <AuthFormContainer>
        <AuthForm>
          <AuthFormContent>
            <FormGroup as={Col}>
              <h5
                style={{
                  color: "#E36432",
                  textAlign: "left",
                  fontSize: "24px",
                  font: "Poppins",
                }}
              >
                Forgot Password.
              </h5>
            </FormGroup>
            <FormGroup as={Col}>
              <h2
                style={{
                  textAlign: "left",
                  fontSize: "11px",
                  font: "Poppins",
                }}
              >
                No worries, we'll send you a link to reset your password.
              </h2>
            </FormGroup>
            <FormGroup style={{ paddingTop: "0.7rem" }}>
              <FormLabel
                style={{
                  textAlign: "left",
                  fontSize: "11px",
                  font: "Poppins",
                }}
              >
                Email
              </FormLabel>
            </FormGroup>
            <FormGroup>
              <InputGroup>
                <InputGroup.Text
                  style={{
                    height: "2.8rem",
                    backgroundColor: "white",
                    borderRight: "none",
                    borderColor: "#E2E2E2",
                  }}
                >
                  <Sms size={15} color="black"/>
                </InputGroup.Text>
                <FormControl
                  type="email"
                  placeholder="Enter email"
                  style={{
                    height: "2.8rem",
                    borderLeft: "none",
                    borderColor: "#E2E2E2",
                  }}
                />
              </InputGroup>
            </FormGroup>
            <CustomButton
              onClick={() => {
                setOpenModal(true);
              }}
              title="Continue"
              style={{
                width: "100%",
                fontSize: "11px",
                font: "Poppins",
                marginTop: "1rem",
              }}
              type="submit"
            />
            <p
              className="text-center"
              style={{
                fontSize: "11px",
                font: "Poppins",
                marginTop: "2.5rem",
                marginBottom: "1.2rem",
              }}
            >
              Back to
              <a
                href="/login"
                style={{
                  fontSize: "11px",
                  font: "Poppins",
                }}
              >
                {" login"}
              </a>
            </p>
          </AuthFormContent>
        </AuthForm>
        <ModalResult
          show={openModal}
          onHide={handleClose}
          isSuccess={true}
          title="Check your email."
          subtitle="We have successfully emailed you a link to reset your password."
        />
      </AuthFormContainer>
    </LandingMain>
  );
};

export default ForgotPassword;
