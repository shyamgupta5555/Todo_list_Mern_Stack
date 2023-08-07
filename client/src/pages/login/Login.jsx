import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors

    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5050/api/login", {
        email,
        password,
      });
      console.log("Login success:", response.data);
      localStorage.setItem("userToken",response.data.id)
      localStorage.setItem("token",response.data.token)
      navigate("/")
    } catch (err) {
      setError(err.response.data.message);
    }

  };

  return (
    <div className="login">
      <div className="item">
        <h1>Login</h1>
      </div>

      <div className="main">
        {error && <p className="error">{error}</p>} {/* Show error message */}
        <form onSubmit={handleSubmit}>
          <div className="email">
            <h3>user name</h3>
            <input
              type="text"
              placeholder="enter email Id"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="password">
            <h3>password</h3>
            <input
              type="password"
              placeholder="enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="btn">submit</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
