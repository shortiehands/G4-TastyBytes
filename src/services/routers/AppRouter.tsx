import React from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import { paths } from "../../configs/routes";
import AppRedirector from "./AppRedirector";
import Layout from "../../components/Layout";
import HomePage from "../../pages/HomePage";
import SearchRecipe from "../../pages/SearchRecipe";

const AppRouter = () => {
    globalThis["a"] = useNavigate();
    return (
        <AppRedirector>
            {/* <CheckAccess> */}
            <Layout>
                <Routes>
                    <Route path={paths.home} element={<HomePage />} />
                    <Route path={paths.generateRecipeAI} element={<SearchRecipe />} />
                    {/* <Route path={paths.login} element={<Login />} /> */}
                </Routes>
            </Layout>
            {/* </CheckAccess> */}
        </AppRedirector>
    );
};

export default AppRouter;