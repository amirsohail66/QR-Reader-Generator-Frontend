import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Import useLocation
import "./ShareImagePage.css";
import jwt_decode from "jwt-decode";
import Navbar from "./Navbar";

const ShareImagePage = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const location = useLocation(); // Initialize useLocation
  const [errorMessage, setErrorMessage] = useState(""); // State variable for error message


  // Extract the imageId from the query parameters
  const queryParams = new URLSearchParams(location.search);
  const imageId = queryParams.get("imageId");
  const authenticatedUserId = queryParams.get("id");

  const handleSendImage = async () => {
    try {
      // Retrieve the token from local storage
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Token not found in local storage");
        return;
      }

      // Decode the token to get the user ID
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;

      console.log(userId);

      // Construct the request data
      const requestData = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Include the authorization token in the request headers
          Authorization: `${token}`,
        },
        body: JSON.stringify({
          imageId: imageId,
          email: email,
          userId: userId, // Include the user ID in the request body
          // Add other required parameters here
        }),
      };

      // Make the API request
      const response = await fetch(
        `http://localhost:3000/user/shareImage?imageId=${imageId}&id=${authenticatedUserId}`,
        requestData
      );

      if (response.ok) {
        // API call was successful, redirect to the success page
        navigate("/share-success");
      } else {
        // Handle login errors here
        const errorData = await response.json();
        console.error("Image error:", errorData.errors[0].msg);
        setErrorMessage(errorData.errors[0].msg); // Set the error message state
      }
    } catch (error) {
      console.error("Error sharing image:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="share-image-container">
        <div>
          <h2>Share Image</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button onClick={handleSendImage}>Send Image</button>
        </div>
      </div>
    </>
  );
};

export default ShareImagePage;
