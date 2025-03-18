import React from "react";
import logo from "../images/logo.png";
import homeImg from "../images/home.jpeg";
import successIcon from "../images/success.svg";
import failIcon from "../images/fail.svg";
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

export const SuccessIcon = (
  props: JSX.IntrinsicAttributes &
    React.ClassAttributes<HTMLImageElement> &
    React.ImgHTMLAttributes<HTMLImageElement>
) => <img alt="" {...props} src={successIcon} />;

export const FailIcon = (
  props: JSX.IntrinsicAttributes &
    React.ClassAttributes<HTMLImageElement> &
    React.ImgHTMLAttributes<HTMLImageElement>
) => <img alt="" {...props} src={failIcon} />;
