const express = require("express");
const router = express.Router();
const nexmoApi = require("../helpers/nexmo-api");

router.post("/", function (req, res, next) {
  if (!req.session.tokens) {
    res.redirect("/");
  }
  const { telephones, messages } = req.body;
  Promise.all(
    telephones.map((telephone, key) => {
      if (telephone) {
        return nexmoApi.sendSms(telephone, messages[key]);
      }
    })
  ).then((results) => {
    res.redirect("/assignments");
  });
});

module.exports = router;
