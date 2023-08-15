import React, { useEffect, useState } from "react";
import "./App.css";

const Home = () => {
  const [flashes, setFlashes] = useState([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const res = await fetch(`/api/latest/flashes`);
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
    <div className="homeContainer">
      <h1>Latest Flashes</h1>
      {flashes.length ? (
        flashes.map((element) => {
          return (
            <div
              key={element.id}
              style={{
                borderStyle: "solid",
                padding: "8px",
                width: "512px",
                overflowWrap: "break-word",
              }}
            >
              <h4>{element.username}</h4>
              <p>{element.flash}</p>
              <time>{Date(element.created_at)}</time>
            </div>
          );
        })
      ) : (
        <h2>No More Flashes to View</h2>
      )}
    </div>
  );
};

export default Home;
