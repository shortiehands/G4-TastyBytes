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
  black: "#252525",
  lightBlack: "#0000000d",
  greyWhite: "#f5f5ef",
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
        background-color: ${colors.white};

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
        --bs-btn-bg: ${colors.orange};
        --bs-btn-border-color: ${colors.orange};
        --bs-btn-hover-color: white;
        --bs-btn-hover-bg: ${colors.peach};
        --bs-btn-hover-border-color:${colors.peach};
        --bs-btn-focus-shadow-rgb: none;
        --bs-btn-active-color: white;
        --bs-btn-active-bg: ${colors.orange};
        --bs-btn-active-border-color: ${colors.orange};
        
        :focus {
            background-color: ${colors.orange};
        }
    }
`;

export default GlobalStyle;
