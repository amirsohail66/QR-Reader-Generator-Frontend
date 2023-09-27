import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import "./ImageUpload.css";
import Navbar from "./Navbar";

const ImageUploadForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(""); // State variable for error message


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleUploadClick = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("imagePath", image);
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token not found in local storage");
      return;
    }

    // Decode the token to get the user ID
    const decodedToken = jwt_decode(token);
    const userId = decodedToken.userId;

    // Make a POST request to your backend API for image upload
    try {
      const response = await fetch(
        `http://localhost:3000/user/uploadsImage/${userId}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.status === 200) {
        // Upload successful, handle the response accordingly
        console.log("Image uploaded successfully");

        // Redirect to the desired page after successful upload
        navigate("/gallery");
      } else {
        // Handle login errors here
        const errorData = await response.json();
        console.error("Upload error:", errorData.msg || errorData.errors[0].msg);
        setErrorMessage(errorData.msg || errorData.errors[0].msg); // Set the error message state
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="d-flex">
        <div className="image-upload-container">
          <h2>Upload Image</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="imagePath">Image</label>
            <input
              type="file"
              id="imagePath"
              name="imagePath"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
          </div>
          <button type="button" onClick={handleUploadClick}>
            Upload
          </button>
        </div>{" "}
      </div>
    </>
  );
};

export default ImageUploadForm;
