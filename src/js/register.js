import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import '../css/login-register.css';
import { FaUserAlt, FaLock, FaEnvelope } from "react-icons/fa";
import axios from "axios";
import OtpPopup from "../js/otppopup";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isOtpOpen, setIsOtpOpen] = useState(false);
  const [registeredUsername, setRegisteredUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
      document.body.classList.add("registration-page-background");
  
      return () => {
        document.body.classList.remove("registration-page-background"); // Remove when leaving the page
      };
    }, []);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:8000/registration",  // Replace with backend URL
        new URLSearchParams({ username, email, password }),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );

      if (response.status === 201) {
        setRegisteredUsername(username);
        setIsOtpOpen(true);
      }

    } catch (error) {
      setError("Error connecting to server");
      console.error("Registration error:", error);
  
      if (error.response) {
        setError(error.response.data.message || "Registration failed. Please try again.");
      } else {
        setError("Error connecting to server");
      }
    }
  };

const handleOtpSubmit = async (otp) => {
  try {
    const formData = new URLSearchParams();
    formData.append("username", registeredUsername);
    formData.append("confirmation_code", otp);

    const response = await axios.post("http://127.0.0.1:8000/confirmation", 
      formData,
      { headers: {"Content-Type": "application/x-www-form-urlencoded"}
    });

    if (response.status === 200) { 
      alert("Verification successful! Redirecting to login...");
      navigate("/login");
    }
  } catch (error) {
    console.error("Error during OTP verification:", error);
    alert(error.response?.data?.detail || "Invalid OTP");
  }
};

  return (
    <div className="wrapper-register">
      <form onSubmit={handleRegister}>
        <h1>Register</h1>

        {error && <p className="message">{error}</p>}

        <div className='input-box'>
            <input type="text" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} required/>
            <FaUserAlt className="icon" />
        </div>

        <div className='input-box'>
            <input type="text" placeholder='email@abc.com' value={email} onChange={(e) => setEmail(e.target.value)} required/>
            <FaEnvelope className="icon" />
        </div>

        <div className='input-box'>
            <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required/>
            <FaLock className='icon'/>
        </div>

        <button type="submit">Register</button>

        <div className="login-link">
          <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>

      </form>

      <OtpPopup isOpen={isOtpOpen} onClose={() => setIsOtpOpen(false)} onSubmit={handleOtpSubmit} />

    </div>
  );
};

export default Register;
