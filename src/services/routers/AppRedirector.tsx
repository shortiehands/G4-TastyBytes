import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
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
  const origin = window.location.origin;

  const navigate = useNavigate();

  useEffect(() => {
    const relativePath = getRelativePath(pathName);
    if (relativePath === `${baseRouterPath}` || relativePath === "") {
      navigate(`/${paths.home}`, { replace: true });
    } else if (!isValidPath(relativePath)) {
      navigate(`/${paths.notFound}`, { replace: true });
    }
  }, [pathName, navigate]);

  return <>{children}</>;
};

export default AppRedirector;
