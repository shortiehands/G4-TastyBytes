import React from "react";
import { MainContainer } from "./styles";
import { Card } from "react-bootstrap";

interface CustomContainerProps {
  children: React.ReactNode;
  mainStyle?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
  cardStyle?: React.CSSProperties;
  className?: string;
}

const CustomContainer: React.FC<CustomContainerProps> = ({
  children,
  mainStyle,
  bodyStyle,
  cardStyle,
  className,
}) => {
  return (
    <MainContainer style={mainStyle ? mainStyle : {margin: "3% 10%"}} className={className}>
      <Card style={cardStyle}>
        <Card.Body style={bodyStyle} className={className}>{children}</Card.Body>
      </Card>
    </MainContainer>
  );
};

export default CustomContainer;