const express = require("express");
const router = express.Router();
const googleApi = require("../helpers/google-api");

router.get("/", function (req, res, next) {
  if (!req.session.tokens) {
    res.redirect("/");
  }

  googleApi.getCourses(req.session.tokens).then(async (courses) => {
    Promise.all(
      courses.map(async (course) => {
        course.assignments = await googleApi.getCourseWork(
          req.session.tokens,
          course.id
        );
        return course;
      })
    ).then((courses) => {
      res.render("assignments", { courses });
    });
  });
});

router.get("/:assignmentId", function (req, res, next) {
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
