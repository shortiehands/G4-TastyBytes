import "../../node_modules/bootstrap/scss/bootstrap.scss";
import { createGlobalStyle } from "styled-components";

export const colors = {
  orange: "#F28C62",
  peach: "#FFE5D4 ",
  white: "#FFFFFF",
  darkGrey: "#333333",
  mediumGrey: "#666666",
  deepOrange: "#E36432",
  lightGrey: "#DDDDDD",
  slateGrey: "#7c828a",
  black: "#252525",
  lightBlack: "#0000000d",
  greyWhite: "#f5f5ef",
  lightGreen: "#E5F6DF",
  lightBrown: "#ECDFCC",
  red: "#e84242",
};

const GlobalStyle = createGlobalStyle`
    *{
        @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
    }
    
    body {
        font-family: 'Poppins';
        font-size: 0.875rem; 
        line-height: 1;
        color: ${colors.black};
        background-color: ${colors.peach};

        @media screen and (max-width: 720px) {
            font-size: 12px;
        }

        // @media screen and (max-width: 420px) {
        //     font-size: 11px;
        // }
    }

    .btn {
        --bs-btn-font-size: 0.875rem;

        @media screen and (max-width: 420px) {
            font-size: 12px;
        }
    }

    .btn-primary {
        --bs-btn-color: white;
        --bs-btn-bg: ${colors.deepOrange};
        --bs-btn-border-color: ${colors.deepOrange};
        --bs-btn-hover-color: white;
        --bs-btn-hover-bg: ${colors.orange};
        --bs-btn-hover-border-color:${colors.orange};
        --bs-btn-focus-shadow-rgb: none;
        --bs-btn-active-color: white;
        --bs-btn-active-bg: ${colors.orange};
        --bs-btn-active-border-color: ${colors.orange};
        --bs-btn-disabled-bg: ${colors.orange};
        --bs-btn-disabled-border-color: ${colors.orange};
        
        :focus {
            background-color: ${colors.orange};
        }
    }

    .form-control {
        display: block;
        width: 100%;
        height: calc(1em + 1.5rem + 0.125rem);
        padding: 0.375rem 1rem;
        text-indent: 0.25rem;
        text-indent: 0.25rem;
        margin-bottom: 1.5rem;
        font-size: 0.875rem;
        font-weight: 400;
        line-height: 1;
        color: ${colors.black};
        background-color: #fff;
        background-clip: padding-box;
        border: 0.063rem solid ${colors.deepOrange};
        border-radius: 0.375rem;
        transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out; 
    
        @media screen and (max-width: 720px) {
            font-size: 13px;
        }
    }
        @media (prefers-reduced-motion: reduce) {
            .form-control {
            transition: none; } }
        .form-control::-ms-expand {
            background-color: transparent;
            border: 0; }
        .form-control:-moz-focusring {
            color: transparent;
            text-shadow: 0 0 0rgb(179, 190, 201); }
        .form-control:focus {
            color: ${colors.black};
            background-color: #fff;
            border-color: ${colors.deepOrange};
            outline: 0;
            box-shadow: none; 
        }
        .form-control::placeholder {
            color: ${colors.slateGrey}; 
            font-size: 0.813rem;

            @media screen and (max-width: 720px) {
                font-size: 13px;
            }
        }
        .form-control:focus + label {
            color: ${colors.deepOrange};
        }
}
`;

export default GlobalStyle;
