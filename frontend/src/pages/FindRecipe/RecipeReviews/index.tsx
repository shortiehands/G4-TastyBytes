import React, { useEffect, useState } from "react";

import Title from "../../../components/Title";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Card,
  Col,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
  Table,
} from "react-bootstrap";
import { paths } from "../../../configs/routes";

const BASE_URL = "http://localhost:8000";

interface ReviewProps {
  recipeId: number;
}

interface Review {
  username: string;
  review: string;
  rating: number;
}

const RecipeReviews: React.FC<ReviewProps> = ({ recipeId }) => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");

  const [reviews, setReviews] = useState<Review[]>([]);
  const [error, setError] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);
  const [editMode, setEditMode] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const fetchReviews = async () => {
    try {
      const response = await fetch(`${BASE_URL}/recipes/${recipeId}/reviews`);
      if (response.ok) {
        const data = await response.json();
        setReviews(data);
      }
    } catch (err: any) {
      setError(err.message || "Failed to load reviews");
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [recipeId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    setError("");

    if (!username) {
      navigate("/login");
      return;
    }

    const method = editMode ? "PUT" : "POST";
    const endpoint = editMode
      ? `${BASE_URL}/recipes/${recipeId}/reviews/${username}`
      : `${BASE_URL}/recipes/${recipeId}/reviews`;

    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ review: reviewText, rating, username }),
      });

      if (response.ok) {
        await fetchReviews();
        resetForm();
      } else {
        const data = await response.json();
        setSubmitError(data.detail || "Failed to submit review.");
      }
    } catch (err) {
      setSubmitError("Something went wrong.");
    }
  };

  const handleEdit = (review: Review) => {
    setEditMode(true);
    setReviewText(review.review);
    setRating(review.rating);
    setSubmitError("");
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/recipes/${recipeId}/reviews/${username}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        fetchReviews();
      } else {
        setSubmitError("Failed to delete review.");
      }
    } catch (err) {
      setSubmitError("Error deleting review.");
    }
  };

  const resetForm = () => {
    setReviewText("");
    setRating(5);
    setEditMode(false);
    setSubmitError("");
  };

  return (
    <div style={{ paddingTop: "2.5rem" }}>
      <Title
        style={{ fontSize: "1.75rem", marginBottom: "1.5rem" }}
        title="Reviews"
      />
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <>
          {reviews.length > 0 ? (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              {reviews.map((review, index) => (
                <Card
                  key={index}
                  className="shadow-sm"
                  style={{
                    padding: "0.5rem 1rem",
                  }}
                >
                  <Card.Body>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <Card.Title style={{ marginBottom: "0.5rem" }}>
                          {review.username}
                        </Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                          {"⭐".repeat(review.rating)}{" "}
                          <span style={{ color: "#999", marginLeft: "0.5rem" }}>
                            {review.rating} / 5
                          </span>
                        </Card.Subtitle>
                      </div>
                      {review.username === username && (
                        <div style={{ display: "flex", gap: "0.5rem" }}>
                          <Button
                            variant="outline-warning"
                            size="sm"
                            onClick={() => handleEdit(review)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={handleDelete}
                          >
                            Delete
                          </Button>
                        </div>
                      )}
                    </div>
                    <Card.Text style={{ marginTop: "0.75rem" }}>
                      {review.review}
                    </Card.Text>
                  </Card.Body>
                </Card>
              ))}
            </div>
          ) : (
            <p style={{ color: "gray" }}>
              No reviews yet. Be the first to leave one!
            </p>
          )}
        </>
      )}
      <div style={{ paddingTop: "2rem" }}>
        {!username ? (
          <p>
            Want to share your thoughts?{" "}
            <a href={"/" + paths.login}>{"Sign in"}</a> to leave a review!
          </p>
        ) : (
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <FormLabel>Comments:</FormLabel>
              <FormControl
                style={{ height: "100px" }}
                as="textarea"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Rating:</FormLabel>
              <FormControl
                as="select"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                required
              >
                {[5, 4, 3, 2, 1].map((value) => (
                  <option key={value} value={value}>
                    {value} Star{value !== 1 && "s"}
                  </option>
                ))}
              </FormControl>
            </FormGroup>
            <Button style={{ marginRight: "1rem" }} type="submit">
              {editMode ? "Update" : "Add"} Review
            </Button>
            {submitError && (
              <p style={{ color: "red", paddingTop: "1rem" }}>{submitError}</p>
            )}
          </Form>
        )}
      </div>
    </div>
  );
};

export default RecipeReviews;
