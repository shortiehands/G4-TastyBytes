import React from "react";
import { useLocation } from "react-router";
import { paths } from "../../configs/routes";
import {
  getRelativePath,
  navigate,
  baseRouterPath,
} from "./common";

interface AppRedirectorProps {
  children: React.ReactNode;
}

const AppRedirector: React.FC<AppRedirectorProps> = ({ children }) => {
  const location = useLocation();
  const pathName = location.pathname;
  const search = location.search;
  const origin = window.location.origin;

  // In our case pathName starts with "/" not baseRouterPath
  if (!pathName.startsWith("/")) {
    const path = ((path) => (path === "" ? paths.home : path))(
      pathName.replace("/", "").trim()
    );

    window.location.href = `${origin}${baseRouterPath}`;
  } else {
    const relativePath = getRelativePath(pathName);

    // in our case relativePath === ""
    if (relativePath === `${baseRouterPath}` || relativePath === "") {
      return navigate(paths.home);
    }
    // ✅ NEW: allow dynamic paths like recipe-details/123
    const basePath = relativePath.split("/")[0]; // e.g., "recipe-details"
    const validBasePaths = Object.values(paths).map((p) => p.replace("/", ""));

    if (!validBasePaths.includes(basePath)) {
      return navigate(paths.notFound);
    } else {
      return <>{children}</>;
    }
  }

  return <></>;
};

export default AppRedirector;
