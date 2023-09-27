import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./login.css";
import { useNavigate, useLocation } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State variable for error message

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Make a POST request to your backend API here
    try {
      const response = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 200) {
        // Login successful, handle the response accordingly
        const data = await response.json();
        console.log("Login successful:", data);

        const token = data.data.token;
        localStorage.setItem("token", token);

        // Check if there's a redirect URL in the query parameters
        const params = new URLSearchParams(location.search);
        const redirectUrl = params.get("redirect");

        // If a redirect URL is found, navigate to it; otherwise, go to the default route
        if (redirectUrl) {
          navigate(redirectUrl);
        } else {
          navigate("/gallery"); // Default route
        }
      } else {
        // Handle login errors here
        const errorData = await response.json();
        // console.error("Login error:", errorData.msg);
        setErrorMessage(errorData.msg); // Set the error message state
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        <Link to="/signup" className="link">
          Go to SignUp
        </Link>
      </form>
    </div>
  );
};

export default Login;
