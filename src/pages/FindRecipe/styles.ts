import { Card, Col } from "react-bootstrap";
import styled from "styled-components";

const CardStyled = styled(Card)`
  background-color: white !important;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const TextStyled = styled.p`
  font-size: 16px;
  font-weight: 500;
`;

const ColStyled = styled(Col)`
  display: flex;
  align-items: stretch;
`;

export { CardStyled, TextStyled, ColStyled };
