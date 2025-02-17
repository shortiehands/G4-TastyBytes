import styled from "styled-components";
import { colors } from "../../styles/Theme";

const TitleStyled = styled.p`
  margin-bottom: 3rem;
  font-weight: 500;
  color: ${colors.white};

  @media screen and (max-width: 720px) {
    font-size: 14px;
  }

  @media screen and (max-width: 420px) {
    font-size: 13px;
  }

  &.center {
    @media (max-width: 576px) {
      margin-bottom: 2.5rem;
      text-align: center;
    }
  }
`;

export { TitleStyled };
