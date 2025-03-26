import React, { useEffect, useState } from "react";
import {
  AuthForm,
  AuthFormContainer,
  AuthFormContent,
  FormTextStyled,
} from "../styles";
import {
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  InputGroup,
} from "react-bootstrap";
import {
  Eye,
  EyeSlash,
  InfoCircle,
  SecuritySafe,
  Sms,
  Verify,
} from "iconsax-react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../../components/CustomButton";
import axios from "axios";
import ModalResult from "../../../components/ModalResult";
import { paths } from "../../../configs/routes";

const BASE_URL = process.env.BACKEND_URL;

const SignUpForm: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [otp, setOtp] = useState("");
  const [registeredUsername, setRegisteredUsername] = useState("");
  const [otpError, setOtpError] = useState<string | null>(null);
  const [openOtp, setOpenOtp] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const togglePassword = () => {
    setPasswordType(passwordType === "password" ? "text" : "password");
  };

  const validateEmail = (email: any) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password: string) => {
    return (
      password.match(/(?=.*[a-z])/) &&
      password.match(/(?=.*[A-Z])/) &&
      password.match(/(?=.*\d)/) &&
      password.match(/(?=.*[!@#$%^&*(),.?":{}|<>])/) &&
      password.length >= 8
    );
  };

  const handleSignUp = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setEmailError(null);
    setPasswordError(null);

    let hasError = false;

    // Validate email
    if (!email) {
      setEmailError("Field is required");
      hasError = true;
    } else if (!validateEmail(email)) {
      setEmailError("Invalid email format");
      hasError = true;
    }

    // Validate username
    if (!username) {
      setUsernameError("Field is required");
      hasError = true;
    }

    // Validate password
    if (!password) {
      setPasswordError("Field is required");
      hasError = true;
    } else if (!validatePassword(password)) {
      setPasswordError(
        "Password must contain at least 8 characters, including uppercase, lowercase, and a number"
      );
      hasError = true;
    }

    if (hasError) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/registration`, // Replace with backend URL
        new URLSearchParams({ username, email, password }),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );

      if (response.status === 201) {
        setRegisteredUsername(username);
        setOpenOtp(true);
      }
    } catch (error) {
      setError("Error connecting to server");
      console.error("Registration error:", error);

      if (axios.isAxiosError(error) && error.response) {
        setError(
          error.response.data?.detail ||
            "Registration failed. Please try again."
        );
      } else {
        setError("Error connecting to server");
      }
    }
    setLoading(false);
  };

  const handleOtpSubmit = async (otp: string) => {
    setLoading(true);
    setOtpError(null);

    try {
      const formData = new URLSearchParams();
      formData.append("username", registeredUsername);
      formData.append("confirmation_code", otp);

      const response = await axios.post(
        "http://127.0.0.1:8000/confirmation",
        formData,
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );

      if (response.status === 200) {
        setOpenModal(true);
      }
    } catch (error) {
      setOtpError("Invalid OTP");
    }

    setLoading(false);
  };

  const handleClose = () => {
    setOpenModal(false);
    setLoading(false);
    navigate("/" + paths.login);
  };

  useEffect(() => {
    username && setUsernameError(null);
    password && setPasswordError(null);
    email && setEmailError(null);
  }, [username, password, email]);

  return (
    <AuthFormContainer>
      <AuthForm className="signUp">
        <AuthFormContent>
          {openOtp ? (
            <>
              <h5
                style={{
                  color: "#E36432",
                  textAlign: "left",
                  fontSize: "24px",
                  font: "Poppins",
                }}
              >
                Verification
              </h5>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleOtpSubmit(otp);
                }}
                style={{ paddingTop: "0.7rem" }}
              >
                <FormLabel
                  style={{
                    textAlign: "left",
                    fontSize: "11px",
                    font: "Poppins",
                  }}
                >
                  OTP
                </FormLabel>
                <FormGroup
                  style={otpError ? { marginBottom: "1rem" } : undefined}
                >
                  <InputGroup>
                    <InputGroup.Text
                      style={{
                        height: "2.8rem",
                        backgroundColor: "white",
                        borderRight: "none",
                        borderColor: "#E2E2E2",
                      }}
                    >
                      <Verify size={15} color="black" />
                    </InputGroup.Text>
                    <FormControl
                      id="otp"
                      type="tel"
                      placeholder="Enter OTP"
                      style={
                        otpError
                          ? {
                              height: "2.8rem",
                              borderLeft: "none",
                              borderColor: "#E2E2E2",
                              marginBottom: "0.25rem",
                            }
                          : {
                              height: "2.8rem",
                              borderLeft: "none",
                              borderColor: "#E2E2E2",
                            }
                      }
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                    />
                  </InputGroup>
                  {otpError && (
                    <FormTextStyled className="required-field">
                      <InfoCircle
                        size={14}
                        color="#e84242"
                        style={{ marginRight: "0.75rem" }}
                      />
                      {otpError}
                    </FormTextStyled>
                  )}
                </FormGroup>
                <CustomButton
                  title="VERIFY"
                  disabled={loading}
                  style={{
                    width: "100%",
                    fontSize: "11px",
                    font: "Poppins",
                    marginTop: "1rem",
                  }}
                  type="submit"
                />
              </Form>
            </>
          ) : (
            <>
              <h5
                style={{
                  color: "#E36432",
                  textAlign: "left",
                  fontSize: "24px",
                  font: "Poppins",
                }}
              >
                Sign Up.
              </h5>
              <Form onSubmit={handleSignUp} style={{ paddingTop: "0.7rem" }}>
                <FormLabel
                  style={{
                    textAlign: "left",
                    fontSize: "11px",
                    font: "Poppins",
                  }}
                >
                  Email
                </FormLabel>
                <FormGroup
                  style={emailError ? { marginBottom: "1rem" } : undefined}
                >
                  <InputGroup>
                    <InputGroup.Text
                      style={{
                        height: "2.8rem",
                        backgroundColor: "white",
                        borderRight: "none",
                        borderColor: "#E2E2E2",
                      }}
                    >
                      <Sms size={15} color="black" />
                    </InputGroup.Text>
                    <FormControl
                      id="email"
                      type="email"
                      placeholder="Enter email"
                      style={
                        emailError
                          ? {
                              height: "2.8rem",
                              borderLeft: "none",
                              borderColor: "#E2E2E2",
                              marginBottom: "0.25rem",
                            }
                          : {
                              height: "2.8rem",
                              borderLeft: "none",
                              borderColor: "#E2E2E2",
                            }
                      }
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </InputGroup>
                  {emailError && (
                    <FormTextStyled className="required-field">
                      <InfoCircle
                        size={14}
                        color="#e84242"
                        style={{ marginRight: "0.75rem" }}
                      />
                      {emailError}
                    </FormTextStyled>
                  )}
                </FormGroup>
                <FormLabel
                  style={{
                    textAlign: "left",
                    fontSize: "11px",
                    font: "Poppins",
                  }}
                >
                  Username
                </FormLabel>
                <FormGroup
                  style={usernameError ? { marginBottom: "1rem" } : undefined}
                >
                  <InputGroup>
                    <InputGroup.Text
                      style={{
                        height: "2.8rem",
                        backgroundColor: "white",
                        borderRight: "none",
                        borderColor: "#E2E2E2",
                      }}
                    >
                      <Sms size={15} color="black" />
                    </InputGroup.Text>
                    <FormControl
                      id="username"
                      placeholder="Enter username"
                      style={
                        usernameError
                          ? {
                              height: "2.8rem",
                              borderLeft: "none",
                              borderColor: "#E2E2E2",
                              marginBottom: "0.25rem",
                            }
                          : {
                              height: "2.8rem",
                              borderLeft: "none",
                              borderColor: "#E2E2E2",
                            }
                      }
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </InputGroup>
                  {usernameError && (
                    <FormTextStyled className="required-field">
                      <InfoCircle
                        size={14}
                        color="#e84242"
                        style={{ marginRight: "0.75rem" }}
                      />
                      {usernameError}
                    </FormTextStyled>
                  )}
                </FormGroup>
                <FormLabel
                  style={{
                    textAlign: "left",
                    fontSize: "11px",
                    font: "Poppins",
                  }}
                >
                  Password
                </FormLabel>
                <FormGroup
                  style={passwordError ? { marginBottom: "1rem" } : undefined}
                >
                  <InputGroup>
                    <InputGroup.Text
                      style={{
                        height: "2.8rem",
                        backgroundColor: "white",
                        borderRight: "none",
                        borderColor: "#E2E2E2",
                      }}
                    >
                      <SecuritySafe size={15} color="black" />
                    </InputGroup.Text>
                    <FormControl
                      id="password"
                      type={passwordType}
                      placeholder="Enter password"
                      style={
                        passwordError
                          ? {
                              height: "2.8rem",
                              borderLeft: "none",
                              borderRight: "none",
                              borderColor: "#E2E2E2",
                              marginBottom: "0.25rem",
                            }
                          : {
                              height: "2.8rem",
                              borderLeft: "none",
                              borderRight: "none",
                              borderColor: "#E2E2E2",
                            }
                      }
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputGroup.Text
                      style={{
                        height: "2.8rem",
                        backgroundColor: "white",
                        borderColor: "#E2E2E2",
                        cursor: "pointer",
                      }}
                      onClick={togglePassword}
                    >
                      {passwordType === "text" ? (
                        <EyeSlash size={15} color="black" />
                      ) : (
                        <Eye size={15} color="black" />
                      )}
                    </InputGroup.Text>
                  </InputGroup>
                  {passwordError && (
                    <FormTextStyled className="required-field">
                      <InfoCircle
                        size={14}
                        color="#e84242"
                        style={{ marginRight: "0.75rem" }}
                      />
                      {passwordError}
                    </FormTextStyled>
                  )}
                </FormGroup>
                {error && (
                  <FormTextStyled className="required-field">
                    <InfoCircle
                      size={14}
                      color="#e84242"
                      style={{ marginRight: "0.75rem" }}
                    />
                    {error}
                  </FormTextStyled>
                )}
                <CustomButton
                  title="SIGN UP"
                  disabled={loading}
                  type="submit"
                />
              </Form>
            </>
          )}
          <ModalResult
            show={openModal}
            onHide={handleClose}
            isSuccess={true}
            title="Thanks for signing up!"
          />
          <p
            className="sign-up text-center mt-4 mb-2"
            style={{
              fontSize: "11px",
              font: "Poppins",
            }}
          >
            Already have an account?
            <a
              href={"/" + paths.login}
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
    </AuthFormContainer>
  );
};

export default SignUpForm;
