import React from "react";
import logo from "../images/logo.png";
import homeImg from "../images/home.jpeg";
import { JSX } from "react/jsx-runtime";

export const Logo = (
  props: JSX.IntrinsicAttributes &
    React.ClassAttributes<HTMLImageElement> &
    React.ImgHTMLAttributes<HTMLImageElement>
) => <img alt="" {...props} src={logo} />;

export const HomeImg = (
  props: JSX.IntrinsicAttributes &
    React.ClassAttributes<HTMLImageElement> &
    React.ImgHTMLAttributes<HTMLImageElement>
) => <img alt="" {...props} src={homeImg} />;