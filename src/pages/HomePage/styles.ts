import { Card } from "react-bootstrap";
import styled from "styled-components";
import { colors } from "../../styles/Theme";

const CustomCard = styled(Card)`
  width: 100%;
  height: 70vh;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const TitleStyled = styled.p`
  font-size: 4rem;
  font-weight: bold;
  color: white;
  margin-bottom: 3rem;
`;

const BodyStyled = styled.p`
  font-size: 1.25rem;
  font-weight: 500;
  color: white;
  margin-bottom: 5rem;
`;

export { CustomCard, TitleStyled, BodyStyled };
