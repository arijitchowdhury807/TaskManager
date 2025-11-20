import React, { useState } from "react";
import "../styles/Register.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:4000/api/v1/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.status === 201) {
      // Save JWT token from backend
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      alert("Registration successful!");
      
      // Redirect to tasks page
      navigate("/tasks");
    } 
    else {
      alert(data?.message || "Registration failed");
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-card">

        <h2 className="title">Create Account</h2>
        <p className="subtitle">Join our Task Manager Today!</p>

        <form onSubmit={handleSubmit} className="form">

          <div className="form-group">
            <label>Name</label>
            <input 
              type="text"
              name="name"
              placeholder="Your full name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

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

          <button className="register-btn">Register</button>
        </form>

        <p className="bottom-text">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Login</span>
        </p>

      </div>
    </div>
  );
};

export default Register;
