import styled from "styled-components";
import { colors } from "../../styles/Theme";

const TitleStyled = styled.p`
  margin-bottom: 3rem;
  font-weight: bold;
  color: ${colors.darkGrey};
  font-size: 2.25rem;

  @media screen and (max-width: 720px) {
    font-size: 14px;
  }

  @media screen and (max-width: 420px) {
    font-size: 13px;
  }

  &.center {
    text-align: center;

    @media (max-width: 576px) {
      margin-bottom: 1.5rem;
    }
  }
`;

export { TitleStyled };
