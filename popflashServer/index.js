const crypto = require("crypto");
const express = require("express");
const jwt = require("jsonwebtoken");
const pool = require("./db");
const auth = require("./authconfig");
//const test = require("crypto").randomBytes(64).toString("hex");
//console.log(test);

const app = express();

app.use(express.json());

app.post("/api/login", async (req, res) => {
  const body = req.body;
  const result = await pool.query(
    `SELECT * FROM users WHERE username = $1 AND password = $2`,
    [body.username, body.password]
  );
  console.log({ resultrows0: result.rows[0] });
  try {
    const token = jwt.sign({ id: result.rows[0].id }, auth.secret, {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
      expiresIn: 86400,
    });
    console.log({ token: token });
    res.status(200).json({ token: token });
  } catch (e) {
    console.error({ error: e });
    res.status(403).json({ token: null });
  }
});

const verify = (token) => {
  try {
    const decoded = jwt.verify(token, auth.secret);
    return { decoded: decoded };
  } catch (e) {
    return { error: e };
  }
};

app.post("/api/verify", async (req, res) => {
  const token = req.body.token;
  console.log({ sentToken: token });
  try {
    const decoded = jwt.verify(token, auth.secret);
    console.log({ decoded: decoded });
    res.status(200).end();
  } catch (e) {
    console.error({ error: e });
    res.status(401).end();
  }
});

app.post("/api/flash", async (req, res) => {
  const authHeader = req.get("Authorization").split(" ");
  if (authHeader.length !== 2 || authHeader[0] !== "Bearer") {
    res.status(401).end();
    return;
  }
  const decoded = verify(authHeader[1]);
  if (decoded.error) {
    res.status(401).end();
    return;
  }
  const flash = req.body.flash;
  if (typeof flash !== "string") {
    console.error("Flash not a string");
    res.status(400).end();
    return;
  }
  if (flash.trim() === "") {
    res.status(400).end();
    return;
  }
  const id = crypto.randomUUID();
  const userid = decoded.decoded.id;
  try {
    await pool.query(
      "INSERT INTO flashes (id, userid, flash, created_at) VALUES ($1, $2, $3, $4)",
      [id, userid, flash, Date.now()]
    );
    res.status(201).json({ id: id });
  } catch (e) {
    console.error({ error: e });
    res.status(500).end();
  }
});

app.listen(5000, () => {
  console.log("server listening on port 5000");
});
