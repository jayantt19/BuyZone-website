import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import {useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
const [messageType, setMessageType] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");

    try {
        const response = await fetch(
            "https://shopsy-website-backend.onrender.com/api/auth/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            }
        );

        const data = await response.json();

        if (!response.ok) {
            setMessage(data.message || "Login failed");
            setMessageType("error");
            return;
        }

      // Update AuthContext
login(data.token, data.user);

setMessage(data.message);
setMessageType("success");

if (data.user.role === "admin") {
    navigate("/admin");
} else {
    navigate("/");
}



    } catch (error) {
        console.error("Login error:", error);

        setMessage("Server error");
        setMessageType("error");
    }
};

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Welcome Back</h2>
        <p>Login to continue shopping.</p>
     {message && (
    <div className={`message ${messageType}`}>
        {message}
    </div>
)}
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

       <div className="input-group">
  <label>Password</label>

  <div className="password-box">
    <input
      type={showPassword ? "text" : "password"}
      name="password"
      placeholder="Enter your password"
      value={formData.password}
      onChange={handleChange}
    />

    <span
      className="eye-icon"
      onClick={() => setShowPassword(!showPassword)}
    >
      {showPassword ? <FaEyeSlash /> : <FaEye />}
    </span>
  </div>
</div>

        <button type="submit">Login</button>

        <p className="register-link">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
