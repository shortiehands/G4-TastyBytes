import React, { useState, useEffect } from "react";
import Title from "../../components/Title";
import CustomContainer from "../../components/CustomContainer";
import { Form, Button, Table, Row, Col } from "react-bootstrap";
import TextField from "../../components/FormLayout/TextField";
import { recipeItem } from "./recipeList";
import ShowRecipes from "./showRecipes";
import { UserRecipesDiv } from "./styles";

// Update to your actual backend URL
const BASE_URL = "http://localhost:8000";

const FindRecipe = () => {
  const [apiError, setApiError] = useState("");
  const [dbError, setDbError] = useState("");
  const [searchResults, setSearchResults] = useState<recipeItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [searchDbResults, setSearchDbResults] = useState<recipeItem[]>([]);

  const handleSearch = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    setApiError("");
    setDbError("");
    setSearchResults([]);
    setShow(false);

    if (!searchTerm.trim()) {
      setApiError("Please enter at least one ingredient to search.");
      setLoading(false);
      return;
    }

    try {
      // Call external db
      const apiResponse = await fetch(
        `${BASE_URL}/recipes/search_recipes?ingredients=${encodeURIComponent(
          searchTerm
        )}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (apiResponse.ok) {
        const data = await apiResponse.json();
        setSearchResults(data);
        setShow(true);
      } else {
        setApiError("Failed to fetch recipes based on search.");
      }

      // Call internal DB (user-uploaded recipes)
      const userDbResponse = await fetch(
        `${BASE_URL}/recipes/search_user_recipes?ingredients=${encodeURIComponent(
          searchTerm
        )}`
      );

      if (userDbResponse.ok) {
        const data = await userDbResponse.json();
        setSearchDbResults(data);
      } else {
        setDbError("Failed to fetch recipes based on search.");
      }
    } catch (err) {
      console.error("Error searching recipes:", err);
      setApiError("Error searching recipes.");
      setDbError("Error searching recipes.");
    }
    setLoading(false);
  };

  return (
    <div>
      <CustomContainer className="generate-page">
        <Title className="center" title="Find Recipe" />
        <Form onSubmit={handleSearch}>
          <TextField
            id="ingredientsDescription"
            type="text"
            label="Search by ingredients (seperated by commas)"
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm((e.target as HTMLInputElement).value)
            }
          />
          <Button type="submit" disabled={loading} style={{ width: "100%" }}>
            Search
          </Button>
        </Form>
        {apiError && (
          <p style={{ paddingTop: "1rem", color: "red" }}>{apiError}</p>
        )}
        <div style={{ paddingTop: "2.5rem" }}>
          {show ? (
            searchResults.length > 0 ? (
              <ShowRecipes items={searchResults} />
            ) : (
              <p style={{ color: "red" }}>No recipe found.</p>
            )
          ) : (
            <></>
          )}
        </div>
        {searchDbResults.length > 0 && (
          <div style={{ paddingTop: "2.5rem" }}>
            <Title
              style={{ fontSize: "1.75rem", marginBottom: "1.5rem" }}
              title="Recipes Uploaded in the Community"
            />
            <div>
              {searchDbResults.map((recipe) => (
                <Row className="mb-4">
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
                </Row>
              ))}
            </div>
          </div>
        )}
      </CustomContainer>
    </div>
  );
};

export default FindRecipe;
