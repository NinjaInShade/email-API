const express = require("express");
require("dotenv").config();

const app = express();

app.post("/", (req, res, next) => {
  res.send("Hello World!");
});

app.use((req, res, next) => {
  res.send("Invalid route");
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
