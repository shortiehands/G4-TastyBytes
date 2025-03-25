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
  comment: string;
  rating: number;
  created_at?: string;
}

const RecipeReviews: React.FC<ReviewProps> = ({ recipeId }) => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const [reviews, setReviews] = useState<Review[]>([]);
  const [error, setError] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [createdAt, setCreatedAt] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [userHasReview, setUserHasReview] = useState(false);

  const fetchReviews = async () => {
    try {
      const response = await fetch(`${BASE_URL}/recipes/${recipeId}/reviews`);
      if (!response.ok) {
        throw new Error("No reviews found");
      }
      const data = await response.json();
      setReviews(data);

      // Check if the logged-in user already has a review
      if (username) {
        const userReview = data.find((r: Review) => r.username === username);
        if (userReview) {
          setUserHasReview(true);
          setComment(userReview.comment);
          setRating(userReview.rating);
          setEditMode(true);
        }
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

    if (!username) {
      navigate("/login");
      return;
    }

    const payload = {
      username,
      comment,
      rating,
      createdAt,
    };

    const method = editMode ? "PUT" : "POST";
    const endpoint = editMode
      ? `${BASE_URL}/recipes/${recipeId}/reviews/${username}`
      : `${BASE_URL}/recipes/${recipeId}/reviews`;

    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setComment("");
        setRating(5);
        setEditMode(false);
        fetchReviews();
      } else {
        const data = await response.json();
        setSubmitError(data.detail || "Failed to submit review.");
      }
    } catch (err) {
      setSubmitError("Something went wrong.");
    }
  };

  const handleEdit = (review: Review) => {
    setComment(review.comment);
    setRating(review.rating);
    // setCreatedAt(review.created_at);
  };

  const handleDelete = async () => {
    if (!username) return;

    try {
      const response = await fetch(
        `${BASE_URL}/recipes/${recipeId}/reviews/${username}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setComment("");
        setRating(5);
        setEditMode(false);
        setUserHasReview(false);
        fetchReviews();
      } else {
        setSubmitError("Failed to delete review.");
      }
    } catch (err) {
      setSubmitError("Error deleting review.");
    }
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
          {reviews.map((review, index) => (
            <Table hover style={{ background: "transparent" }}>
              <tbody>
                <tr key={index}>
                  <td>{review.username}</td>
                  <td>{review.comment}</td>
                  <td>{review.rating}</td>
                  {/* <td>
                    {review.created_at && (
                      <small className="text-muted">
                        Posted on{" "}
                        {new Date(review.created_at).toLocaleDateString()}
                      </small>
                    )}
                  </td> */}
                  {userHasReview && (
                    <td>
                      <div style={{ padding: "0 1rem" }}>
                        <Row style={{ marginBottom: "0.5rem" }}>
                          <Button
                            className="w-100"
                            onClick={() => handleEdit(review)}
                          >
                            Edit
                          </Button>
                        </Row>
                        <Row>
                          <Button className="w-100" onClick={handleDelete}>
                            Delete
                          </Button>
                        </Row>
                      </div>
                    </td>
                  )}
                </tr>
              </tbody>
            </Table>
          ))}
        </>
      )}
      <Form onSubmit={handleSubmit}>
        <div>
          <FormGroup>
            <FormLabel>Comments:</FormLabel>
            <FormControl
              style={{ height: "100px" }}
              as="textarea"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
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
        </div>
        <Button style={{ marginRight: "1rem" }} type="submit">
          {editMode ? "Update" : "Add"} Review
        </Button>
      </Form>
    </div>
  );
};

export default RecipeReviews;
