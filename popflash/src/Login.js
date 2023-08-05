import React, { useEffect, useState } from "react";
import "./App.css";

const Login = ({ setToken }) => {
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
    if (body.token !== null) {
      setToken(body.token);
    } else {
      changeRedo = true;
    }
    setRedo(changeRedo);
  };

  console.log({ username: username, password: password });
  console.log({ redo: redo });
  return (
    <div className="loginContainer">
      <h1>Login Page</h1>
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
