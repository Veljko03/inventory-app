const express = require("express");
const index = require("./routes/indexRoute");
require("dotenv").config();
const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  if (req.method === "POST" && req.query._method === "DELETE") {
    req.method = "DELETE";
  }
  next();
});
app.use(index);

const PORT = 3000;
app.listen(PORT, () => console.log(`Express app listening on port - ${PORT}!`));
