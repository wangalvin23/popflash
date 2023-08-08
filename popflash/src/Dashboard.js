import React, { useEffect, useState } from "react";
import "./App.css";
import { useParams } from "react-router-dom";

const Dashboard = ({ currentUser }) => {
  const params = useParams();
  const [flashes, setFlashes] = useState([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const res = await fetch(`/api/user/${params.username}/flashes`);
      if (cancelled) {
        return;
      }
      const body = await res.json();
      if (cancelled) {
        return;
      }
      setFlashes(body.result);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="dashboardContainer">
      <>
        <h1>{params.username}</h1>
        {flashes.length ? (
          flashes.map((element) => {
            return (
              <div
                key={element.id}
                style={{
                  borderStyle: "solid",
                  padding: "8px",
                  width: "512px",
                }}
              >
                <p>{element.flash}</p>
                <time>{Date(element.created_at)}</time>
              </div>
            );
          })
        ) : (
          <h2>No Flashes Posted</h2>
        )}
      </>
    </div>
  );
};

export default Dashboard;
/*(async () => {
      const res = await fetch("/api/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });
    })();*/
