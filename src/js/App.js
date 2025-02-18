import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./login";
import Register from "./register";
import RecipesPage from "./RecipesPage"; // Import your recipes page

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/recipes" element={<RecipesPage />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default App;
