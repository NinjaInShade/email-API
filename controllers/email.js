const { validationResult } = require("express-validator");
const mailgun = require("mailgun-js");

function post_send_email(req, res, next) {
  const errors = validationResult(req);
  const body = req.body;

  const name = body.name;
  const email = body.email;
  const message = body.message;

  if (!errors.isEmpty()) {
    return res.status(400).json({ message: "Validation failed", errors: errors.array() });
  }

  const mg = new mailgun({ apiKey: process.env.API_KEY, domain: process.env.DOMAIN });

  const data = {
    from: email,
    to: "leonmichalak6@gmail.com",
    subject: name,
    text: message,
  };

  mg.messages().send(data, function (error, body) {
    if (error) {
      return res.status(500).json({ message: "Email unsuccessfully sent", errors: error, body });
    } else {
      return res.status(200).json({ message: "Email successfully sent", errors: false, body });
    }
  });
}

module.exports = {
  post_send_email,
};
