import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate, useLocation } from "react-router-dom";
import "./SingleImage.css";

const SingleImage = () => {
  const location = useLocation(); // Initialize useLocation
  const navigate = useNavigate();
  // Extract the imageId from the query parameters
  const queryParams = new URLSearchParams(location.search);
  const imageId = queryParams.get("imageId");
  const [image, setImage] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token"); // Retrieve the token from localStorage

    // Make sure the token exists before making the request
    if (token) {
      fetch(`http://localhost:3000/user/image?imageId=${imageId}`, {
        headers: {
          Authorization: `${token}`, // Include the token in the request headers
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // Assuming your API response is in the format { success, status, message, data }
          if (data.success) {
            setImage(data.data);
          } else {
            console.error("Error fetching image:", data.message);
          }
        })
        .catch((error) => {
          console.error("Error fetching image:", error);
        });
    } else {
      // Handle the case where the token is not available
      console.error("Token not found in localStorage. Please log in.");
      navigate(
        `/?redirect=${encodeURIComponent(
          location.pathname + location.search
        )}`
      );
    }
  }, [imageId, navigate, location]);

  function getImageName(imagePath) {
    const parts = imagePath.split("/");
    return parts[parts.length - 1];
  }

  return (
    <>
      <Navbar />
      <div>
        <h2>Single Image</h2>
        {image ? (
          <div className="single-image-card">
            <img
              src={`http://localhost:3000/${getImageName(
                image.imagePath
              )}`}
              alt={image.name}
              className="image-size"
            />
            <div className="image-info">
              <h3>Name: {image.name}</h3>
              <p>Description: {image.description}</p>
            </div>
          </div>
        ) : (
          <p>Loading image...</p>
        )}
      </div>
    </>
  );
};

export default SingleImage;
