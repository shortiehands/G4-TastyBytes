import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { baseRouterPath } from "./services/routers/common";
import GlobalStyle from "./styles/Theme";

declare global {
  var a: any; // 👈️ disables type checking for property
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
// when i put in auth provider and Ypgraphql then it works, but if just ypgraphql is not working
root.render(
      <BrowserRouter basename={baseRouterPath}>
        <GlobalStyle />
        <App />
      </BrowserRouter>
);
