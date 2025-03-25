import React from "react";
import { Background } from "./styles";

interface LandingMainProps {
  children: React.ReactNode;
}

const LandingMain: React.FC<LandingMainProps> = ({ children }) => {
  return <Background>{children}</Background>;
};

export default LandingMain;
