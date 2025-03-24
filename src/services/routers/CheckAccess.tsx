import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import { paths } from "../../configs/routes";
import { navigate } from "./common";
import { useNavigate } from "react-router-dom";

interface CheckAccessProps {
  children: React.ReactNode;
}

const CheckAccess: React.FC<CheckAccessProps> = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  const token = localStorage.getItem("token");
  if (!token) return null;

  return <>{children}</>;
};

export default CheckAccess;
