import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import "./Gallery.css";

const MyImages = () => {
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token"); // Retrieve the token from localStorage

    // Make sure the token exists before making the request
    if (token) {
      fetch("http://localhost:3000/user/myImages", {
        headers: {
          Authorization: `${token}`, // Include the token in the request headers
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // Assuming your API response is in the format { success, status, message, data }
          if (data.success) {
            setImages(data.data);
          } else {
            console.error("Error fetching images:", data.message);
          }
        })
        .catch((error) => {
          console.error("Error fetching images:", error);
        });
    } else {
      // Handle the case where the token is not available
      console.error("Token not found in localStorage. Please log in.");
    }
  }, []);

  function getImageName(imagePath) {
    const parts = imagePath.split("/");
    return parts[parts.length - 1];
  }

  const handleShareImage = (imageId, authenticatedUserId) => {
    // Pass the imageId as a parameter when navigating to ShareImagePage
    navigate(`/share-image?imageId=${imageId}&id=${authenticatedUserId}`);
  };

  return (
    <>
      <Navbar />
      <div>
        <h2>All Images</h2>
        <div className="image-gallery">
          {images.map((image) => (
            <div key={image._id} className="image-card">
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
              <button
                type="button"
                onClick={() => handleShareImage(image._id, image.user)}
              >
                Share Image
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MyImages;
