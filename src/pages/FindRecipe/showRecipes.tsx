import React, { useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { recipeItem } from "./recipeList";
import CustomPagination from "../../components/CustomPagination";
import { CardStyled, ColStyled, TextStyled } from "./styles";

interface ShowRecipesProps {
  items: recipeItem[];
}

const ShowRecipes: React.FC<ShowRecipesProps> = ({ items }) => {
  const [pageItems, setPageItems] = useState<recipeItem[]>([]);

  const navigate = useNavigate();

  const pageSize = 9;

  return (
    <>
      <div>
        <Row>
          {pageItems.map((item, index) => (
            <ColStyled key={index} md={4} className="mb-4">
              <CardStyled>
                <Card.Body>
                  <TextStyled>{item.title}</TextStyled>
                  <Card.Img src={item.image} />
                </Card.Body>
              </CardStyled>
            </ColStyled>
          ))}
        </Row>
      </div>
      <CustomPagination
        pageSize={pageSize}
        items={items}
        setPageItems={(p) => setPageItems(p)}
      />
    </>
  );
};

export default ShowRecipes;
