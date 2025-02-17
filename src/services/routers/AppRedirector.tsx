import React from "react";
import { useLocation } from "react-router";
import { paths } from "../../configs/routes";
import {
  allowSearchParams,
  getRelativePath,
  isValidPath,
  navigate,
  baseRouterPath,
} from "./common";

interface AppRedirectorProps {
  children: React.ReactNode;
}

const AppRedirector: React.FC<AppRedirectorProps> = ({ children }) => {
  const location = useLocation();
  const pathName = location.pathname;
  console.log(pathName);
  const search = location.search;
  const origin = window.location.origin;

  const searchParams =
    !!search && allowSearchParams(getRelativePath(pathName)) ? search : "";

  // In our case pathName starts with "/" not baseRouterPath
  if (!pathName.startsWith("/")) {
    const path = ((path) => (path === "" ? paths.home : path))(
      pathName.replace("/", "").trim()
    );

    window.location.href = `${origin}${baseRouterPath}/${path}${searchParams}`;
  } else {
    const relativePath = getRelativePath(pathName);

    // in our case relativePath === ""
    if (relativePath === `${baseRouterPath}` || relativePath === "") {
      return navigate(paths.home);
    }

    if (!isValidPath(relativePath)) {
      return navigate(paths.notFound);
    } else if (search && !searchParams) {
      window.location.href = `${origin}${baseRouterPath}/${relativePath}`;
    } else {
      return <>{children}</>;
    }
  }

  return <></>;
};

export default AppRedirector;
