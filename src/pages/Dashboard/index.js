import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/"); // Redirect back to login page
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Welcome to the Dashboard! 🎉</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;