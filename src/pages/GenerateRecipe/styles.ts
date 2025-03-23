import styled from "styled-components";
import { colors } from "../../styles/Theme";

const HeaderText = styled.p`
  text-align: center;

  &.header {
    font-weight: bold;
    font-size: 1.5rem;
    text-align: center;
    color: ${colors.darkGrey};
  }

  &.subHeader {
    text-decoration-line: underline;
    font-size: 1.25rem;
    font-weight: 500;
    color: ${colors.darkGrey};
  }
`;

const ErrorTextStyled = styled.p`
  padding-top: 1rem;
  color: ${colors.red};
`;

export { HeaderText, ErrorTextStyled };
