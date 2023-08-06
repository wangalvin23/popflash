import React, { useEffect, useState } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";

const Login = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redo, setRedo] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const body = await res.json();
    let changeRedo = false;
    if (body.token) {
      setCurrentUser({
        token: body.token,
        userId: body.id,
        username: username,
      });
      navigate(`/dashboard/${username}`);
    } else {
      changeRedo = true;
    }
    setRedo(changeRedo);
  };

  return (
    <div className="loginContainer">
      <h1>Login Page</h1>
      {currentUser.username && (
        <h4>Currently Logged In as {currentUser.username}</h4>
      )}
      <form className="userForm" onSubmit={handleSubmit}>
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
        <button type="submit">Submit</button>
      </form>
      {redo && <h4>Incorrect Username / Password</h4>}
    </div>
  );
};

export default Login;
