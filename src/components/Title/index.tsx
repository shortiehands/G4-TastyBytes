import React from "react";
import { TitleStyled } from "./styles";

interface TitleProps {
  title?: string;
  style?: React.CSSProperties;
  className?: string;
}

const Title: React.FC<TitleProps> = ({ title, style, className }) => {
  return <TitleStyled style={style} className={className}>{title}</TitleStyled>;
};

export default Title;