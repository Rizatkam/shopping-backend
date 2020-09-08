const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 4000;
const routes = require("./routes");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("public"));
app.use("/api/users", routes.users);
app.use("/api/shopping", routes.cart);

app.listen(port, () =>
  console.log(`BackEnd Project Listening at
http://localhost:${port}`)
);
