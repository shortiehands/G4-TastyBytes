import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import '../css/login-register.css';
import { FaUserAlt, FaLock, FaEnvelope } from "react-icons/fa";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
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

      const data = response.data;
      localStorage.setItem("token", data.access_token);
      navigate("/login"); // Redirect to login after successful registration

    } catch (error) {
      setError("Error connecting to server");
      console.error("Login error:", error);
  
      if (error.response) {
        setError(error.response.data.message || "Registration failed. Please try again.");
      } else {
        setError("Error connecting to server");
      }
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
    </div>
  );
};

export default Register;
