import styled from "styled-components";
import { colors } from "../../styles/Theme";

const DivStyled = styled.div`
  text-align: center;
  padding-bottom: 1.5rem;
`;

const TextStyled = styled.p`
  color: red;
  font-weight: 500;
  font-size: 15px;
`;

const ErrorStyled = styled.p`
  font-size: 0.688rem;
  color: ${colors.red};
`;

export { DivStyled, TextStyled, ErrorStyled };
