import { Card, Col } from "react-bootstrap";
import styled from "styled-components";

const CardStyled = styled(Card)`
  background-color: #f7f2ea !important;
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

const UserRecipesDiv = styled.div`
  background-color: #f7f2ea;
  border-radius: 0.75rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  width: 100%;
  border: 1px solid #e2d6c3;
`;

export { CardStyled, TextStyled, ColStyled, UserRecipesDiv };
