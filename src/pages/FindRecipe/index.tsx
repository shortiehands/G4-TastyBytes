import React, { useState, useEffect } from "react";
import Title from "../../components/Title";
import CustomContainer from "../../components/CustomContainer";
import { Form, Button } from "react-bootstrap";
import TextField from "../../components/FormLayout/TextField";
import { recipeItem } from "./recipeList";
import ShowRecipes from "./showRecipes";

// Update to your actual backend URL
const BASE_URL = "http://localhost:8000";

const FindRecipe = () => {
  const [recipes, setRecipes] = useState<recipeItem[]>([]);
  const [title, setTitle] = useState("");
  const [typeValue, setTypeValue] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [searchResults, setSearchResults] = useState<recipeItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);

  const handleSearch = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSearchResults([]);
    setShow(false);

    if (!searchTerm.trim()) {
      setError("Please enter at least one ingredient to search.");
      return;
    }
    setError("");
    try {
      const response = await fetch(
        `${BASE_URL}/recipes/search_recipes?ingredients=${encodeURIComponent(
          searchTerm
        )}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data);
        setShow(true);
      } else {
        setError("Failed to fetch recipes based on search.");
      }
    } catch (err) {
      console.error("Error searching recipes:", err);
      setError("Error searching recipes.");
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
        <div style={{ paddingTop: "3rem" }}>
          {error && <p style={{ color: "red" }}>Error: {error}</p>}
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
      </CustomContainer>
    </div>
  );
};

export default FindRecipe;
