import styled from "styled-components";
import { colors } from "../../styles/Theme";

const MainContainer = styled.div`
  .card-body {
    @media (max-width: 1100px) {
      margin: 2rem 2.5rem !important;
    }

    @media (max-width: 576px) {
      margin: 1rem 0.4rem !important;
    }
  }

  .card {
    border-radius: 0.625rem;
    // box-shadow: 0rem 0rem 0.625rem ${colors.black};
    background: transparent;
    border: none;
  }

  &.search-page {
    margin: 5% 15%;
`;

export { MainContainer };
