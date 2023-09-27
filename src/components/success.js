import React from "react";
import "./success.css";
import Navbar from "./Navbar";

const SuccessPage = () => {
  return (
    <>
      <Navbar />
      <div>
        <h2>Image Shared Successfully</h2>
        <p>Your image has been successfully shared!</p>
      </div>
    </>
  );
};

export default SuccessPage;
