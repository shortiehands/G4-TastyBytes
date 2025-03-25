import React from "react";
import CustomContainer from "../../components/CustomContainer";
import Title from "../../components/Title";
import { Row } from "react-bootstrap";

const Profile = () => {
  const username = localStorage.getItem("username");

  return (
    <CustomContainer className="generate-page">
      <Title title="My Profile" />
      <div>
        {username && (
          <h5 style={{ color: "#d6703c" }}>
            Welcome, <strong>{username}</strong>
          </h5>
        )}
      </div>
    </CustomContainer>
  );
};

export default Profile;
