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
  console.log({body: body});
  let result;
  try {
    result = await pool.query(
      "SELECT id FROM users WHERE username = $1 AND password = $2",
      [body.username, body.password]
    );
  } catch (e) {
    console.error({ error: e });
    res.status(500).json({ token: null });
    return;
  }
  try {
    if (result.rows.length !== 1) {
      throw new Error("User Not Found");
    }
    const token = jwt.sign({ id: result.rows[0].id }, auth.secret, {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
      expiresIn: 86400,
    });
    res.status(200).json({ id: result.rows[0].id, token: token });
  } catch (e) {
    console.error({ error: e });
    res.status(403).json({ token: null });
  }
});

app.post("/api/signup", async (req, res) => {
  const id = crypto.randomUUID();
  const body = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO users (id, username, password) VALUES ($1, $2, $3)",
      [id, body.username, body.password]
    );
    res.status(201).end();
  } catch (e) {
    console.error({ error: e });
    res.status(409).end();
  }
});

app.get("/api/latest/flashes", async (req, res) => {
  const result = (
    await pool.query("SELECT * FROM flashes ORDER BY created_at DESC LIMIT 20")
  ).rows;
  for (let element of result) {
    element.username = (
      await pool.query("SELECT username FROM users WHERE id = $1", [
        element.userid,
      ])
    ).rows[0].username;
  }
  console.log({ result: result });
  res.status(200).json({ result: result });
});

app.get("/api/user/:username/flashes", async (req, res) => {
  const username = req.params.username;
  const userId = (
    await pool.query("SELECT id FROM users WHERE username = $1", [username])
  ).rows[0].id;
  const result = await pool.query(
    "SELECT id, flash, created_at FROM flashes WHERE userid = $1 ORDER BY created_at DESC LIMIT 20",
    [userId]
  );
  res.status(200).json({ result: result.rows });
});

/*app.post("/api/verify", async (req, res) => {
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
});*/
const verify = (token) => {
  try {
    const decoded = jwt.verify(token, auth.secret);
    return { decoded: decoded };
  } catch (e) {
    return { error: e };
  }
};

app.post("/api/popflash", async (req, res) => {
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
  const flash = req.body.newFlash;
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
  const date = Date.now();
  try {
    await pool.query(
      "INSERT INTO flashes (id, userid, flash, created_at) VALUES ($1, $2, $3, $4)",
      [id, userid, flash, date]
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
