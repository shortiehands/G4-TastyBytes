import React, { useEffect, useState } from "react";
import {
  FormLabel,
  FormGroup,
  FormControl,
  Col,
  InputGroup,
  Stack,
  Form,
} from "react-bootstrap";
import {
  AuthForm,
  AuthFormContainer,
  AuthFormContent,
  CheckLabel,
  FormTextStyled,
  NavLinkStyled,
} from "../styles";
import { Eye, EyeSlash, User, SecuritySafe, InfoCircle } from "iconsax-react";
import { useNavigate } from "react-router";
import { paths } from "../../../configs/routes";
import CustomButton from "../../../components/CustomButton";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_URL;
// const BASE_URL = "http://localhost:8000";

const LoginForm: React.FC<any> = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [loading, setLoading] = useState(false); // for debugging
  const [error, setError] = useState<string | null>(null);
  const [usernameVal, setUsernameVal] = useState(false);
  const [passwordVal, setPasswordVal] = useState(false);
  const [invalidError, setInvalidError] = useState<string | null>(null);

  // Toggle Password Visibility
  const togglePassword = () => {
    setPasswordType(passwordType === "password" ? "text" : "password");
  };

  // Handle Cognito Login
  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setInvalidError(null);

    if (!username || !password) {
      if (!username) setUsernameVal(true);
      if (!password) setPasswordVal(true);
      setLoading(false);
      return;
    }
    try {
      const response = await axios.post(
        `${BASE_URL}/login`,
        new URLSearchParams({ username, password }),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );

      const data = response.data;
      localStorage.setItem("username", data.tokens.username);
      localStorage.setItem("token", data.access_token);
      navigate("/" + paths.home);
    } catch (error) {
      setError("Error connecting to server");
      console.error("Login error:", error);
      setInvalidError("Invalid username or password");

      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.message || "Invalid username or password");
      } else {
        setError("Error connecting to server");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    username && setUsernameVal(false);
    password && setPasswordVal(false);
  }, [username, password]);

  return (
    <AuthFormContainer>
      <AuthForm>
        <AuthFormContent>
          <h5
            style={{
              color: "#E36432",
              textAlign: "left",
              fontSize: "24px",
              font: "Poppins",
            }}
          >
            Hello.
          </h5>
          <Form onSubmit={handleLogin} style={{ paddingTop: "0.7rem" }}>
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
              style={usernameVal ? { marginBottom: "1rem" } : undefined}
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
                  <User size={15} color="black" />
                </InputGroup.Text>
                <FormControl
                  placeholder="Enter username"
                  style={
                    usernameVal
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
              {usernameVal && (
                <FormTextStyled className="required-field">
                  <InfoCircle
                    size={14}
                    color="#e84242"
                    style={{ marginRight: "0.75rem" }}
                  />
                  Field is required
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
              style={passwordVal ? { marginBottom: "1rem" } : undefined}
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
                  type={passwordType}
                  placeholder="Enter password"
                  style={
                    passwordVal
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
              {passwordVal && (
                <FormTextStyled className="required-field">
                  <InfoCircle
                    size={14}
                    color="#e84242"
                    style={{ marginRight: "0.75rem" }}
                  />
                  Field is required
                </FormTextStyled>
              )}
            </FormGroup>
            {invalidError ? (
              <FormTextStyled className="required-field">
                <InfoCircle
                  size={14}
                  color="#e84242"
                  style={{ marginRight: "0.75rem" }}
                />
                {invalidError}
              </FormTextStyled>
            ) : (
              <></>
            )}
            <Stack direction="horizontal" gap={5}>
              <FormGroup as={Col}>
                <CheckLabel
                  id={"default"}
                  type="checkbox"
                  label={"Remember Me"}
                  style={{
                    font: "Poppins",
                  }}
                />
              </FormGroup>
              {/* <FormGroup as={Col}>
                <NavLinkStyled href={"/" + paths.forgotPassword}>
                  Forgot password?
                </NavLinkStyled>
              </FormGroup> */}
            </Stack>
            <CustomButton title="LOGIN" disabled={loading} type="submit" />
          </Form>

          <p
            className="sign-up text-center mt-4 mb-2"
            style={{
              fontSize: "11px",
              font: "Poppins",
            }}
          >
            Don't have an account?
            <a
              href={"/" + paths.signUp}
              style={{
                fontSize: "11px",
                font: "Poppins",
              }}
            >
              {" Sign Up"}
            </a>
          </p>
        </AuthFormContent>
      </AuthForm>
    </AuthFormContainer>
  );
};

export default LoginForm;
