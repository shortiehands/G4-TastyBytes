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
import ManageRecipe from "../../pages/ManageRecipe";
import ForgotPassword from "../../pages/Landing/ForgotPassword";
import CheckAccess from "./CheckAccess";

const AppRouter = () => {
  globalThis["a"] = useNavigate();
  return (
    <Routes>
      <Route path={paths.login} element={<Login />} />
      <Route path={paths.signUp} element={<SignUp />} />
      <Route path={paths.forgotPassword} element={<ForgotPassword />} />
      <Route
        path={paths.home}
        element={
          <Layout>
            <HomePage />
          </Layout>
        }
      />

      <Route
        path={paths.generateRecipeAI}
        element={
          <Layout>
            <GenerateRecipe />
          </Layout>
        }
      />
      <Route
        path={paths.findRecipe}
        element={
          <Layout>
            <FindRecipe />
          </Layout>
        }
      />
      {/* Protected routes */}
      <Route
        path={paths.manageRecipe}
        element={
          <CheckAccess>
            <Layout>
              <ManageRecipe />
            </Layout>
          </CheckAccess>
        }
      />
    </Routes>
  );
};

export default AppRouter;
