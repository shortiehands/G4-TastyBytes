import React from "react";
import { BodyStyled, CustomCard, TitleStyled } from "./styles";
import { HomeImg } from "../../components/Images";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <CustomCard>
      <Card.Img as={HomeImg} />
      <Card.ImgOverlay style={{ paddingTop: "4rem" }}>
        <BodyStyled>UR ULTIMATE RECIPE FINDER</BodyStyled>
        <TitleStyled>A TASTE OF INNOVATION</TitleStyled>
        <Button
          style={{
            padding: "1rem 1.75rem",
            backgroundColor: "white",
            color: "black",
            fontWeight: "500",
            border: "none",
            borderRadius: "0",
          }}
          onClick={() => {
            navigate("/generate-recipe-AI");
          }}
        >
          Find Recipe
        </Button>
      </Card.ImgOverlay>
    </CustomCard>
  );
};

export default HomePage;
