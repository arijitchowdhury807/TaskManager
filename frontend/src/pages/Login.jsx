import React, { useState } from "react";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:4000/api/v1/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Login successful!");
      localStorage.setItem("token", data.token);
      navigate("/tasks");
    } else {
      alert(data?.message || "Login failed");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">

        <h2 className="title">Welcome Back</h2>
        <p className="subtitle">Login to continue managing tasks</p>

        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="******"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button className="login-btn">Login</button>
        </form>

        <p className="bottom-text">
          Don’t have an account?{" "}
          <span onClick={() => navigate("/register")}>Register</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
