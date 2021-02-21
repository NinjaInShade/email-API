const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const { body } = require("express-validator");

const { post_send_email } = require("./controllers/email");
const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(cors());

app.post(
  "/",
  body("name").notEmpty().withMessage("Cannot be empty").isLength({ max: 15 }).withMessage("Cannot exceed 15 chars").escape().trim(),
  body("email").notEmpty().withMessage("Cannot be empty").isEmail().withMessage("Must be an email").escape().trim().normalizeEmail(),
  body("message").notEmpty().withMessage("Cannot be empty").isLength({ max: 500 }).withMessage("Cannot exceed 500 chars").escape().trim(),
  post_send_email
);

app.use((req, res, next) => {
  res.status(404).json({ message: "Invalid route", errors: true });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
