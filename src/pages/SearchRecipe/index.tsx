import React, { useState } from "react";
import TextField from "../../components/FormLayout/TextField";
import { Button, Form } from "react-bootstrap";
import CustomContainer from "../../components/CustomContainer/CustomContainer";
import Title from "../../components/Title";

interface RecipeResponse {
  recipe: string;
}

const SearchRecipe = () => {
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [recipeResponse, setRecipeResponse] = useState<RecipeResponse | null>(
    null
  );
  const [error, setError] = useState<string>("");

  // Call the FastAPI endpoint to generate a recipe from the prompt
  const generateRecipe = async (prompt: string): Promise<RecipeResponse> => {
    const response = await fetch("http://localhost:8000/recipes/generate_recipe/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

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

    try {
      const data = await generateRecipe(userInput);
      setRecipeResponse(data);
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }

    console.log(recipeResponse);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  };

  return (
    <div>
      <CustomContainer className="search-page">
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
        {error && <p style={{ color: "red" }}>Error: {error}</p>}
        {recipeResponse && <div>{recipeResponse.recipe}</div>}
      </CustomContainer>
    </div>
  );
};

export default SearchRecipe;
