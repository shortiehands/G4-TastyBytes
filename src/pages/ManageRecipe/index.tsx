import React, { useEffect, useState } from "react";
import CustomContainer from "../../components/CustomContainer";
import {
  Button,
  Col,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
  Table,
} from "react-bootstrap";
import { recipeItem } from "../FindRecipe/recipeList";
import Title from "../../components/Title";
import { DivStyled, TextStyled } from "./styles";
import ModalResult from "../../components/ModalResult";

// Update to your actual backend URL
const BASE_URL = "http://localhost:8000";

const ManageRecipe = () => {
  const [recipes, setRecipes] = useState<recipeItem[]>([]);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const [title, setTitle] = useState("");
  const [typeValue, setTypeValue] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [selectedRecipeId, setSelectedRecipeId] = useState<number | null>(null);

  const fetchRecipes = async () => {
    try {
      const response = await fetch(`${BASE_URL}/recipes/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          ...(username && { "X-Username": username }),
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.length === 0) {
          setRecipes([]); // Set an empty array instead of showing an error
        } else {
          setRecipes(data);
        }
        setError(""); // Clear the error message
      } else {
        setError("Failed to fetch recipes");
      }
    } catch (err) {
      console.error("Error fetching recipes:", err);
      setError("Error fetching recipes");
    }
  };

  const handleEdit = (recipe: recipeItem) => {
    setEditId(recipe.id);
    setTitle(recipe.title);
    setTypeValue(recipe.type);
    setIngredients(recipe.ingredients);
    setSteps(recipe.steps);
  };

  const handleDelete = async (id: any) => {
    try {
      const response = await fetch(`${BASE_URL}/recipes/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          ...(username ? { "X-Username": username } : {}),
        },
      });
      if (response.ok) {
        fetchRecipes();
      } else {
        setError("Failed to delete recipe");
      }
    } catch (err) {
      console.error("Error deleting recipe:", err);
      setError("Error deleting recipe");
    }
  };

  const resetForm = () => {
    setTitle("");
    setTypeValue("");
    setIngredients("");
    setSteps("");
    setEditId(null);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setRecipes([]);

    const method = editId ? "PUT" : "POST";
    const url = editId
      ? `${BASE_URL}/recipes/${editId}`
      : `${BASE_URL}/recipes/`;

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          ...(username ? { "X-Username": username } : {}),
        },
        body: JSON.stringify({
          title,
          type: typeValue,
          ingredients,
          steps,
        }),
      });
      if (response.ok) {
        await fetchRecipes();
        resetForm();
      } else {
        setError("Failed to save recipe");
      }
    } catch (err) {
      console.error("Error saving recipe:", err);
      setError("Error saving recipe");
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div>
      <CustomContainer className="generate-page">
        <Title title="Manage Your Recipe" className="center" />
        {recipes.length > 0 ? (
          <Table bordered hover>
            <thead>
              <tr>
                <th>Title</th>
                <th>Type</th>
                <th>Ingredients</th>
                <th>Steps</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {recipes.map((recipe) => (
                <tr key={recipe.id}>
                  <td>{recipe.title}</td>
                  <td>{recipe.type}</td>
                  <td>{recipe.ingredients}</td>
                  <td>{recipe.steps}</td>
                  <td>
                    <div style={{ padding: "0 1rem" }}>
                      <Row style={{ marginBottom: "0.5rem" }}>
                        <Button
                          className="w-100"
                          onClick={() => handleEdit(recipe)}
                        >
                          Edit
                        </Button>
                      </Row>
                      <Row>
                        <Button
                          className="w-100"
                          onClick={() => {
                            setSelectedRecipeId(recipe.id);
                            setShowDeleteModal(true);
                          }}
                        >
                          Delete
                        </Button>
                        <ModalResult
                          show={showDeleteModal}
                          onProceed={() => {
                            if (selectedRecipeId !== null) {
                              handleDelete(selectedRecipeId);
                            }
                            setShowDeleteModal(false);
                            setSelectedRecipeId(null);
                          }}
                          onHide={() => {
                            setShowDeleteModal(false);
                            setSelectedRecipeId(null);
                          }}
                          title="Are you sure you want to delete?"
                        />
                      </Row>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <DivStyled>
            <TextStyled>You do not own any recipe.</TextStyled>
          </DivStyled>
        )}

        <Form>
          <div>
            <FormGroup>
              <FormLabel>Title:</FormLabel>
              <FormControl
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Type:</FormLabel>
              <FormControl
                type="text"
                value={typeValue}
                onChange={(e) => setTypeValue(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Ingredients:</FormLabel>
              <FormControl
                style={{ height: "100px" }}
                as="textarea"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Steps:</FormLabel>
              <FormControl
                style={{ height: "100px" }}
                as="textarea"
                value={steps}
                onChange={(e) => setSteps(e.target.value)}
                required
              />
            </FormGroup>
          </div>
          <div>
            <Button
              style={{ marginRight: "1rem" }}
              onClick={() => {
                if (editId) {
                  setShowUpdateModal(true);
                } else {
                  setShowSuccessModal(true);
                }
              }}
            >
              {editId ? "Update" : "Add"} Recipe
            </Button>
            <ModalResult
              show={showSuccessModal}
              isSuccess={true}
              onHide={() => {
                handleSubmit({ preventDefault: () => {} });
                setShowSuccessModal(false);
              }}
              title="You have successfully added recipe!"
            />
            <ModalResult
              show={showUpdateModal}
              onProceed={() => {
                handleSubmit({ preventDefault: () => {} });
                setShowUpdateModal(false);
              }}
              onHide={() => setShowUpdateModal(false)}
              title="Are you sure you want to update recipe?"
            />
            {editId && <Button onClick={resetForm}>Cancel</Button>}
          </div>
        </Form>
      </CustomContainer>
    </div>
  );
};

export default ManageRecipe;
