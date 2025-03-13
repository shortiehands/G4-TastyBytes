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

  &.generate-page {
    margin: 5% 15%;

    .card {
      border-radius: 0.625rem;
      background: transparent;
      border: none;
    }
  }

  &.generate-response {
    padding: 3rem 0;

    .card {
      padding: 1.5rem 1.75rem;
      border-radius: 0;
      box-shadow: 0rem 0rem 0.625rem ${colors.lightBlack};
      background: ${colors.white};
      border: none;
    }
  }
`;

export { MainContainer };
