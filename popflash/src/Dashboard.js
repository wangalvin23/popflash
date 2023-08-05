import React, { useEffect, useState } from "react";
import Login from "./Login";
import "./App.css";

const Dashboard = () => {
  const [token, setToken] = useState(null);

  console.log({ token: token });
  if (!token) {
    return <Login setToken={setToken} />;
  } else {
    (async () => {
      const res = await fetch("/api/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });
    })();
    return (
      <div className="dashboardContainer">
        {token && <h1>ALVIN's Dashboard</h1>}
      </div>
    );
  }
};

export default Dashboard;
