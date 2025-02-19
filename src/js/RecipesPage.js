import React, { useState, useEffect } from "react";

// Update to your actual backend URL
const BASE_URL = "http://localhost:8000";

export default function RecipesPage() {
  const [recipes, setRecipes] = useState([]);
  const [title, setTitle] = useState("");
  const [typeValue, setTypeValue] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const[searchTerm, setSearchTerm] = useState("");


  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  const fetchRecipes = async () => {
    try {
      const response = await fetch(`${BASE_URL}/recipes/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-Username": username,
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

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setError("Please enter at least one ingredient to search.");
      return;
    }
    setError("");
    try {
      const response = await fetch(`${BASE_URL}/recipes/search_recipes?ingredients=${encodeURIComponent(searchTerm)}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data);
      } else {
        setError("Failed to fetch recipes based on search.");
      }
    } catch (err) {
      console.error("Error searching recipes:", err);
      setError("Error searching recipes.");
    }
  };

  

  
  useEffect(() => {
    fetchRecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetForm = () => {
    setTitle("");
    setTypeValue("");
    setIngredients("");
    setSteps("");
    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
          "X-Username": username,
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

  const handleEdit = (recipe) => {
    setEditId(recipe.id);
    setTitle(recipe.title);
    setTypeValue(recipe.type);
    setIngredients(recipe.ingredients);
    setSteps(recipe.steps);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${BASE_URL}/recipes/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Username": username,
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

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Manage Your Recipes</h1>

      <div style={styles.searchContainer}>
        <input
          style={styles.searchInput}
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by ingredients (comma separated)"
        />
        <button style={styles.searchButton} onClick={handleSearch}>
          Search
        </button>
        <button style={styles.searchButton} onClick={fetchRecipes}>
          Show All
        </button>
      </div>

      {error && <p style={styles.error}>{error}</p>}

      {searchResults.length > 0 && (
        <div style={styles.cardGrid}>
          {searchResults.map((item) => (
            <div key={item.id} style={styles.card}>
              <h3 style={{ marginBottom: "10px" }}>{item.title}</h3>
              <img
              src={item.image}
              alt={item.title}
              style={{ width: "200px", borderRadius: "8px" }}
        />
      </div>
    ))}
  </div>
)}


      {/* Recipe Form */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Title:</label>
          <input
            style={styles.input}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>


        <div style={styles.formGroup}>
          <label style={styles.label}>Type:</label>
          <input
            style={styles.input}
            type="text"
            value={typeValue}
            onChange={(e) => setTypeValue(e.target.value)}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Ingredients:</label>
          <textarea
            style={styles.textarea}
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Steps:</label>
          <textarea
            style={styles.textarea}
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            required
          />
        </div>

        <div style={styles.buttonRow}>
          <button style={styles.button} type="submit">
            {editId ? "Update" : "Add"} Recipe
          </button>
          {editId && (
            <button
              style={{ ...styles.button, ...styles.cancelButton }}
              type="button"
              onClick={resetForm}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

        

      {/* Recipe Table */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Title</th>
            <th style={styles.th}>Type</th>
            <th style={styles.th}>Ingredients</th>
            <th style={styles.th}>Steps</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {recipes.map((recipe) => (
            <tr style={styles.tr} key={recipe.id}>
              <td style={styles.td}>{recipe.title}</td>
              <td style={styles.td}>{recipe.type}</td>
              <td style={styles.td}>{recipe.ingredients}</td>
              <td style={styles.td}>{recipe.steps}</td>
              <td style={styles.td}>
                <button
                  style={{ ...styles.button, ...styles.editButton }}
                  onClick={() => handleEdit(recipe)}
                >
                  Edit
                </button>
                <button
                  style={{ ...styles.button, ...styles.deleteButton }}
                  onClick={() => handleDelete(recipe.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Inline CSS Styles (basic example)
const styles = {
  container: {
    width: "90%",          // 90% of the browser window
    maxWidth: "1200px",
    margin: "40px auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "28px",
    color: "#333",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: "10px",
  },

  searchContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",    // vertically center items
    marginBottom: "20px",
    gap: "10px",
  },
  searchInput: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    width: "400px",          // increase the width
  },
  searchButton: {
    backgroundColor: "#3182ce",
    color: "#fff",
    border: "none",
    padding: "10px 20px",    // make the button a bit wider
    fontSize: "16px",
    borderRadius: "4px",
    cursor: "pointer",
  },
  form: {
    marginBottom: "30px",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  formGroup: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "8px",
    fontSize: "14px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  textarea: {
    width: "100%",
    height: "80px",
    padding: "8px",
    fontSize: "14px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  buttonRow: {
    display: "flex",
    gap: "10px",
  },
  button: {
    backgroundColor: "#2f855a",
    color: "#fff",
    border: "none",
    padding: "10px 16px",
    fontSize: "14px",
    borderRadius: "4px",
    cursor: "pointer",
  },
  cancelButton: {
    backgroundColor: "#aaa",
  },
  editButton: {
    marginRight: "8px",
    backgroundColor: "#3182ce",
  },
  deleteButton: {
    backgroundColor: "#e53e3e",
  },
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "20px",
    marginBottom: "30px",
  },
  card: {
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#fff",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  th: {
    backgroundColor: "#f1f1f1",
    textAlign: "left",
    padding: "12px",
    borderBottom: "2px solid #ddd",
    fontWeight: "bold",
  },
  tr: {
    borderBottom: "1px solid #ddd",
  },
  td: {
    padding: "10px",
    verticalAlign: "top",
  },
};
