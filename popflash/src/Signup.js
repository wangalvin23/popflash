import React, { useEffect, useState } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redo, setRedo] = useState(false); //use later to display error on input reqs

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
  };

  return (
    <div className="signupContainer">
      <h1>Sign Up</h1>
      <form className="signupForm" onSubmit={handleSubmit}>
        <h3 htmlFor="userName">Username</h3>
        <input
          type="text"
          id="userName"
          placeholder="Enter Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <h3 htmlFor="userPass">Password</h3>
        <input
          type="password"
          id="userPass"
          placeholder="Enter Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button type="submit">Finish Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
