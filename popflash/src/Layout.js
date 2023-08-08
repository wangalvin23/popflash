import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import "./App.css";

const Layout = ({ currentUser, setCurrentUser }) => {
  const isLoggedIn = !!currentUser.token;
  const navigate = useNavigate();

  const signOut = () => {
    setCurrentUser({ token: null, userId: null, username: null });
    navigate("/");
  };

  return (
    <>
      <div className="layoutContainer">
        <h1>PopFlash</h1>
        <Link to="/">
          <button type="button">Home</button>
        </Link>
        {!isLoggedIn ? (
          <Link to="/login">
            <button type="button">Login</button>
          </Link>
        ) : null}
        {isLoggedIn ? (
          <>
            <Link to={`/dashboard/${currentUser.username}`}>
              <button type="button">{currentUser.username}</button>
            </Link>
            <Link to="/post">
              <button>Post</button>
            </Link>
            <button onClick={signOut}>Logout</button>
          </>
        ) : null}
      </div>
      <Outlet />
    </>
  );
  /*return (
    <>
      <div className="layoutContainer">
        <h1>PopFlash</h1>
        <Link to="/">
          <button type="button">Home</button>
        </Link>
        <Link to="/dashboard">
          <button type="button">
            {token ? `${savedName}'s Dashboard` : "Dashboard"}
          </button>
        </Link>
        <Link to="/login">
          <button type="button">{token ? "Change User" : "Login"}</button>
        </Link>
      </div>
      <Outlet />
    </>
  );*/
};

export default Layout;
