import React from "react";
import { Outlet, Link } from "react-router-dom";
import "./App.css";

const Layout = () => {
  return (
    <>
      <div className="layoutContainer">
        <h1>PopFlash</h1>
        <Link to="/">
          <button type="button">Home</button>
        </Link>
        <Link to="/dashboard">
          <button type="button">Dashboard</button>
        </Link>
      </div>
      <Outlet />
    </>
  );
};

export default Layout;
