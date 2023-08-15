import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home";
import Dashboard from "./Dashboard";
import Login from "./Login";
import Signup from "./Signup";
import Post from "./Post";
import "./App.css";

/*STUFF TO WORK ON
ADD USER
DELETE POST
USER OPTIONS MENU {
  CHANGE USERNAME
  CHANGE PASSWORD
  DELETE USER
}
HTTPONLY COOKIE FOR LOGIN TOKEN
POST LIMIT HANDLING
ERROR HANDLING
*/

const App = () => {
  const [currentUser, setCurrentUser] = useState({
    token: null,
    userId: null,
    username: null,
  });
  //console.log(currentUser.token);

  return (
    <div className="bodyContainer">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Layout
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          >
            <Route index element={<Home />} />
            <Route
              path="/dashboard/:username"
              element={<Dashboard currentUser={currentUser} />}
            />
            <Route
              path="/login"
              element={
                <Login
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              }
            />
            <Route path="/signup" element={<Signup />} />
            <Route path="/post" element={<Post currentUser={currentUser} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

/*const IMAGES = require.context("../public/userPhotos", true);
const USERS = [
  { id: 1, name: "hello", pass: "qwer" },
  { id: 2, name: "world", pass: "asdf" },
  { id: 3, name: "apple", pass: "zxcv" },
  { id: 4, name: "orange", pass: "1234" },
];

const UserSelect = ({ handleSubmit, handleReset, currentUser }) => {
  const [userPass, setUserPass] = useState("");
  const [user, setUser] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [passErr, setPassErr] = useState(false);

  const handleClick = (newUser) => {
    if (newUser !== user || !openForm) {
      setUserPass("");
      setUser(newUser);
      setOpenForm(true);
      setPassErr(false);
    }
  };

  console.log({ openForm: openForm, passErr: passErr });
  return (
    <>
      {!currentUser &&
        USERS.map((user) => {
          return (
            <button key={user.id} onClick={() => handleClick(user)}>
              {user.name}
            </button>
          );
        })}
      {currentUser && <button onClick={() => handleReset()}>Sign Out</button>}
      {openForm && (
        <form className="userForm" onSubmit={(e) => e.preventDefault()}>
          <h3 htmlFor="userPass">{user.name}</h3>
          <input
            type="password"
            id="userPass"
            placeholder="Enter Password"
            value={userPass}
            onInput={(e) => setUserPass(e.target.value)}
          />
          <button
            type="submit"
            onClick={() => {
              setOpenForm(handleSubmit(user.id, userPass));
              setPassErr(openForm);
            }}
          >
            Submit
          </button>
          {passErr && <h5>Incorrect Password Entered</h5>}
        </form>
      )}
    </>
  );
};

const Gallery = ({ galleryPhotos }) => {
  return (
    <div className="galleryContainer">
      {galleryPhotos.map((img, index) => (
        <div className="galleryImg" key={index}>
          <img src={img} title={`image ${index}`} width="512" />
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const [userPhotos, setUserPhotos] = useState([]);
  const [userPhotosList, setUserPhotoList] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (user === null) {
      setUserPhotos([]);
      return;
    }
    const selectedPhotos = [];
    IMAGES.keys().forEach((image) => {
      if (
        image.substring(
          image.indexOf("user"),
          image.indexOf("/", image.indexOf("user"))
        ) === `user${user}`
      ) {
        console.log(`it worked ${image}`);
        selectedPhotos.push(image);
        setUserPhotos(selectedPhotos);
      }
    });
  }, [user]);

  useEffect(() => {
    setUserPhotoList(userPhotos.map((image) => IMAGES(image)));
    console.log(`userPhotosList just got updated: ${userPhotosList}`);
  }, [userPhotos]);

  const handleSubmit = (userId, userPass) => {
    console.log({ userPass: userPass });
    let keepOpen = true;
    USERS.forEach((element) => {
      if (element.id === userId && element.pass === userPass) {
        keepOpen = false;
        setUser(userId);
        console.log("submitted");
      }
    });
    (async () => {
      try {
        const res = await fetch("http://localhost:9000/api/checkpass");
        if (!res.ok) {
          throw new Error(
            `status: ${res.status}, statusText: ${res.statusText}`
          );
        } else {
          const body = await res.json();
          console.log({ bodyResult: body.result });
        }
      } catch (e) {
        console.error({ error: e });
      }
    })();
    return keepOpen;
  };

  const handleReset = () => {
    setUser(null);
    console.log("user is reset");
  };

  console.log(`user is ${user}`);
  console.log(`userPhotosList: ${userPhotosList}`);
  return (
    <div className="bodyContainer">
      <div className="userNav">
        <h1>PopFlash</h1>
        {!user && <h2>user select</h2>}
        <UserSelect
          handleSubmit={handleSubmit}
          handleReset={handleReset}
          currentUser={user}
        />
      </div>
      <div className="userPage">
        {user && <h2>{`user ${user}'s gallery`}</h2>}
        <Gallery galleryPhotos={userPhotosList} />
      </div>
    </div>
  );
};*/

export default App;
