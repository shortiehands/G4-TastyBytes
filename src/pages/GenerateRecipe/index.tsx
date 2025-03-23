import React, { useState } from "react";
import TextField from "../../components/FormLayout/TextField";
import { Button, Card, Col, Form, ListGroup, Row } from "react-bootstrap";
import CustomContainer from "../../components/CustomContainer";
import Title from "../../components/Title";
import { ErrorTextStyled, HeaderText } from "./styles";
import { InfoCircle } from "iconsax-react";

interface RecipeResponse {
  recipe_name: string;
  overview: string;
  ingredients: string[];
  steps: string[];
}

const GenerateRecipe = () => {
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [recipeResponse, setRecipeResponse] = useState<RecipeResponse | null>(
    null
  );
  const [error, setError] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);

  // Call the FastAPI endpoint to generate a recipe from the prompt
  const generateRecipe = async (prompt: string): Promise<RecipeResponse> => {
    const response = await fetch(
      "http://localhost:8000/ai/generate_recipe/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to generate recipe");
    }

    const data = await response.json();
    return data as RecipeResponse;
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setRecipeResponse(null);

    if (!userInput) {
      setError("Field is required");
      setLoading(false);
      setShow(false);
      return;
    }

    try {
      const data = await generateRecipe(userInput);
      setRecipeResponse(data);
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }

    setShow(true);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  };

  return (
    <div>
      <CustomContainer className="generate-page">
        <Title title="Generate a New Recipe" className="center" />
        <Form onSubmit={handleSubmit}>
          <TextField
            id="dishDescription"
            type="text"
            label="create a recipe for ..."
            value={userInput}
            onChange={handleChange}
            style={{ textAlign: "center" }}
          />
          <Button type="submit" disabled={loading} style={{ width: "100%" }}>
            {loading ? "Generating..." : "Generate"}
          </Button>
        </Form>
        {error && (
          <ErrorTextStyled>
            <InfoCircle
              size={14}
              color="#e84242"
              style={{ marginRight: "0.75rem" }}
            />
            Error: {error}
          </ErrorTextStyled>
        )}
        {show ? (
          <CustomContainer className="generate-response">
            {recipeResponse && (
              <>
                <Row>
                  <HeaderText className="header">
                    {recipeResponse.recipe_name}
                  </HeaderText>
                </Row>
                <Row style={{ paddingBottom: "2rem" }}>
                  {recipeResponse.overview}
                </Row>
                <Row>
                  <Col md={12} lg={6}>
                    <Card
                      style={{
                        borderRadius: "0.625rem",
                        background: "#ECDFCC",
                        border: "none",
                        padding: "1rem 0",
                      }}
                    >
                      <Card.Body>
                        <HeaderText className="subHeader">
                          Ingredients
                        </HeaderText>
                        <ListGroup>
                          {recipeResponse.ingredients.map(
                            (ingredient, index) => (
                              <ListGroup.Item
                                key={index}
                                style={{
                                  background: "transparent",
                                }}
                              >
                                <p>{ingredient}</p>
                              </ListGroup.Item>
                            )
                          )}
                        </ListGroup>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={12} lg={6}>
                    <Card
                      style={{
                        borderRadius: "0.625rem",
                        background: "#ECDFCC",
                        border: "none",
                        padding: "1rem 0",
                      }}
                    >
                      <Card.Body>
                        <HeaderText className="subHeader">Steps</HeaderText>
                        <ListGroup>
                          {recipeResponse.steps.map((step, index) => (
                            <ListGroup.Item
                              key={index}
                              style={{
                                background: "transparent",
                              }}
                            >
                              {step}
                            </ListGroup.Item>
                          ))}
                        </ListGroup>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </>
            )}
          </CustomContainer>
        ) : (
          <></>
        )}
      </CustomContainer>
    </div>
  );
};

export default GenerateRecipe;
