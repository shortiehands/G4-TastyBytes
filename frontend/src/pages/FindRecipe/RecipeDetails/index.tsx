import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { ReviewDiv, UserRecipesDiv } from "../styles";
import { useLocation, useNavigate } from "react-router-dom";
import { recipeItem } from "../recipeList";
import CustomContainer from "../../../components/CustomContainer";
import Title from "../../../components/Title";
import RecipeReviews from "../RecipeReviews";
import { Back } from "iconsax-react";
import { paths } from "../../../configs/routes";

interface LocationState {
  recipe: recipeItem;
  fromFind: boolean;
  searchTerm: string;
}

const RecipeDetails = () => {
  const { state } = useLocation() as { state: LocationState };
  const navigate = useNavigate();
  const recipe = state?.recipe;
  const fromFind = state?.fromFind;
  const searchTerm = state?.searchTerm;

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <>
      <CustomContainer className="generate-page">
        {!recipe ? (
          <p style={{ color: "red" }}>Recipe data not found.</p>
        ) : (
          <>
            <ReviewDiv className="back">
              <span style={{ cursor: "pointer" }}>
                <Back
                  size={20}
                  color="black"
                  onClick={() =>
                    navigate("/" + paths.findRecipe, {
                      state: { searchTerm },
                    })
                  }
                />
              </span>
              <Title
                title="Recipe Details"
                style={{ fontSize: "1.75rem", marginBottom: "0" }}
              />
            </ReviewDiv>
            <Row className="mb-4">
              {recipe && (
                <UserRecipesDiv key={recipe.id} className="p-3">
                  <h5 style={{ color: "#d6703c" }}>{recipe.title}</h5>
                  <p
                    style={{
                      fontWeight: "bold",
                      fontSize: "0.9rem",
                      color: "#5c5c5c",
                    }}
                  >
                    Type: {recipe.type || "N/A"}
                  </p>
                  <div style={{ marginBottom: "1rem" }}>
                    <strong>Ingredients:</strong>
                    <div style={{ marginTop: "0.5rem" }}>
                      {recipe.ingredients
                        .split("*")
                        .map((item) => item.trim())
                        .filter((item) => item.length > 0)
                        .map((item, i) => (
                          <p key={i} style={{ marginBottom: "0.25rem" }}>
                            - {item}
                          </p>
                        ))}
                    </div>
                  </div>
                  <div>
                    <strong>Steps:</strong>
                    <div style={{ marginTop: "0.5rem" }}>
                      {recipe.steps
                        .split("\n")
                        .map((step) => step.trim())
                        .filter((step) => step.length > 0)
                        .map((step, i) => (
                          <p key={i} style={{ marginBottom: "0.4rem" }}>
                            {step}
                          </p>
                        ))}
                    </div>
                  </div>
                </UserRecipesDiv>
              )}
            </Row>
            <RecipeReviews recipeId={recipe.id} />
          </>
        )}
      </CustomContainer>
    </>
  );
};

export default RecipeDetails;
