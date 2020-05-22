const express = require("express");
const router = express.Router();
const PNF = require("google-libphonenumber").PhoneNumberFormat;
const phoneUtil = require("google-libphonenumber").PhoneNumberUtil.getInstance();
const nexmoApi = require("../helpers/nexmo-api");

router.post("/", function (req, res, next) {
  if (!req.session.tokens) {
    res.redirect("/");
  }
  const { telephones, messages } = req.body;
  Promise.all(
    telephones.map((telephone, key) => {
      if (telephone) {
        const formattedPhoneNumber = phoneUtil.format(
          phoneUtil.parseAndKeepRawInput(telephone, "US"),
          PNF.E164
        );
        return nexmoApi.sendSms(formattedPhoneNumber, messages[key]);
      }
    })
  ).then((results) => {
    res.redirect("/assignments");
  });
});

module.exports = router;
