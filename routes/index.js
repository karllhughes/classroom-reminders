const express = require("express");
const router = express.Router();
const googleApi = require("../helpers/google-api");

router.get("/", function (req, res, next) {
  if (req.query.code) {
    googleApi.getToken(req.query.code).then((tokens) => {
      req.session.tokens = tokens;
      req.session.save(() => {
        res.redirect("/assignments");
      });
    });
  } else {
    res.render("index", {
      loginUrl: googleApi.loginUrl(),
    });
  }
});

module.exports = router;
