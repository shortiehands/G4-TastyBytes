import styled from "styled-components";
import { colors } from "../../styles/Theme";
import { Card } from "react-bootstrap";

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

const ResponseDiv = styled(Card)`
  border-radius: 0.625rem;
  background: ${colors.orange};
  border: none;
`;

export { HeaderText, ResponseDiv };
