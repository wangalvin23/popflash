import React, { useEffect, useState } from "react";
import "./App.css";

const Post = ({ currentUser }) => {
  const isLoggedIn = !!currentUser.token;

  const handlePost = async (e) => {
    e.preventDefault();
    console.log("flash posted");
  };

  return (
    <div className="postContainer">
      {isLoggedIn ? (
        <>
          <h1>Create a Flash</h1>
          <h4>Posting as {currentUser.username}</h4>
          <form className="postForm" onSubmit={handlePost}>
            <input type="text" id="newFlash" placeholder="Enter your Flash" />
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
