import React, { useEffect, useState } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";

const Post = ({ currentUser }) => {
  const navigate = useNavigate();
  const isLoggedIn = !!currentUser.token;
  const [newFlash, setNewFlash] = useState("");

  const handlePost = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/popflash", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${currentUser.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newFlash }),
    });
    const body = await res.json();
    console.log({ newFlash: body.id });
    navigate(`/dashboard/${currentUser.username}`);
  };

  return (
    <div className="postContainer">
      {isLoggedIn ? (
        <>
          <h1>Create a Flash</h1>
          <h4>Posting as {currentUser.username}</h4>
          <form className="postForm" onSubmit={handlePost}>
            <textarea
              type="text"
              id="newFlashInput"
              placeholder="Enter your Flash"
              onChange={(e) => setNewFlash(e.target.value)}
              style={{ width: "600px", height: "150px", resize: "none" }}
              maxLength={500}
            />
            <label htmlFor="newFlashInput">{newFlash.length + "/500"}</label>
            <button type="submit">Post</button>
          </form>
        </>
      ) : (
        <h1>Must be Logged in to Post a Flash</h1>
      )}
    </div>
  );
};

export default Post;
