const express = require("express");
const app = express.Router();
const { cart } = require("../controllers");
const middleware = require("../config/middleware");

app.get("/", cart.get_list);
app.get("/:id", cart.get_by_id);
app.post("/", middleware.userAuth, cart.create);
app.put("/:id", middleware.userAuth, cart.update_by_id);
app.delete("/:id", middleware.userAuth, cart.delete_by_id);

module.exports = app;
