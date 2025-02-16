import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./login";
import Dashboard from "./dashboard";
import Register from "./register";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default App;