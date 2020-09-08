const express = require("express");
const app = express.Router();

const { users } = require("../controllers");

app.get("/", (req, res) => res.send("Shopping"));
app.post("/signup", users.register);
app.post("/signin", users.login);
app.get("/", users.getAllUsers);

module.exports = app;
