const express = require("express");
const router = express.Router();

router.post("/", function (req, res, next) {
  if (!req.session.tokens) {
    res.redirect("/");
  }
  console.log(req.body);

  res.redirect("back");
});

module.exports = router;
