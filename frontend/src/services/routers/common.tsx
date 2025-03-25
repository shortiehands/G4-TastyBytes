import React, {useEffect} from "react";
import { useNavigate } from "react-router";
import { allowSearchParamsPaths } from "../../configs/routes";
import { paths } from "../../configs/routes";

const Redirect = ({to}: {to: string}) => {
    let navigate = useNavigate();
    useEffect(() => {
        navigate(to);
    })
    return null;
}
const baseRouterPath = ((path) => (path ? `/${path}` : ""))(
    process.env.REACT_APP_BASE_PATH?.replace("/", "").trim()
  );

const allowSearchParams = (currentPath: string) =>
    allowSearchParamsPaths.includes(currentPath);

const getRelativePath = (currentPath: string) =>
    currentPath.replace(`/`, "").trim();

const navigate = (route: string) => (
    // <Redirect
    //   to={`${baseRouterPath}/${route.replace("/", "").trim()}`}
    // />
    <Redirect
    to={`/${route.replace("/", "").trim()}`}
  />
);

const isValidPath = (currentPath: string) =>
    Object.values(paths).includes(currentPath);

export {
    baseRouterPath,
    getRelativePath,
    isValidPath,
    navigate,
    allowSearchParams,
  };