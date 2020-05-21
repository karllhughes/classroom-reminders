const express = require("express");
const router = express.Router();
const googleApi = require("../helpers/google-api");

router.get("/", function (req, res, next) {
  if (!req.session.tokens) {
    res.redirect("/");
  }

  console.log(JSON.stringify(req.session.tokens));
  googleApi.getCourses(req.session.tokens).then((courses) => {
    res.render("courses", { courses });
  });
});

router.get("/:courseId", function (req, res, next) {
  if (!req.session.tokens) {
    res.redirect("/");
  }

  Promise.all([
    googleApi.getCourse(req.session.tokens, req.params.courseId),
    googleApi.getCourseRoster(req.session.tokens, req.params.courseId),
    googleApi.getLatestCourseWork(req.session.tokens, req.params.courseId),
  ]).then(([course, roster, courseWork]) => {
    console.log(course);
    console.log(roster);
    console.log(courseWork);
  });
});

module.exports = router;
