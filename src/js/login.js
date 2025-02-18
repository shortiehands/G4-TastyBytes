import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import '../css/login-register.css';
import { FaUserAlt, FaLock } from "react-icons/fa";
import axios from "axios";

const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook for redirection

  useEffect(() => {
    document.body.classList.add("login-page-background");

    return () => {
      document.body.classList.remove("login-page-background"); // Remove when leaving the page
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post("http://127.0.0.1:8000/login", 
            new URLSearchParams({ username, password }),
            { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        );

        const data = response.data;
        localStorage.setItem("username", data.tokens.username);
        localStorage.setItem("token", data.access_token);
        navigate("/recipes");
        

  
      } catch (error) {
        setError("Error connecting to server");
        console.error("Login error:", error);
  
        if (error.response) {
          setError(error.response.data.message || "Invalid username or password");
        } else {
          setError("Error connecting to server");
        }
      }
    };

  return (
    <div className="wrapper-login">
      <form onSubmit={handleLogin}>
      <h1>Login</h1>

        {error && <p className="message">{error}</p>}

        <div className='input-box'>
          <input type="text" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} required/>
          <FaUserAlt className='icon'/>
        </div>

        <div className='input-box'>
          <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required/>
          <FaLock className='icon'/>
        </div>

        <div className='remember-forgot'>
          <label><input type="checkbox"/>Remember me</label>
          <Link to="https://example.com">Forgot Password?</Link>
        </div>

        <button type='submit'>Login</button>

        <div className='register-link'>
          <p>Don't have an account? <Link to="/register">Register</Link></p>
        </div>

      </form>
    </div>
  );
};

export default Login;