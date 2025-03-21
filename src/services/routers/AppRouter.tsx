import React from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import { paths } from "../../configs/routes";
import AppRedirector from "./AppRedirector";
import Layout from "../../components/Layout";
import HomePage from "../../pages/HomePage";
import GenerateRecipe from "../../pages/GenerateRecipe";
import Login from "../../pages/Landing/Login";
import SignUp from "../../pages/Landing/SignUp";
import FindRecipe from "../../pages/FindRecipe";

const AppRouter = () => {
  globalThis["a"] = useNavigate();
  return (
    <AppRedirector>
      <Layout>
        <Routes>
          <Route path={paths.home} element={<HomePage />} />
          <Route path={paths.generateRecipeAI} element={<GenerateRecipe />} />
          <Route path={paths.login} element={<Login />} />
          <Route path={paths.signUp} element={<SignUp />} />
          <Route path={paths.findRecipe} element={<FindRecipe />} />
        </Routes>
      </Layout>
    </AppRedirector>
  );
};

export default AppRouter;
