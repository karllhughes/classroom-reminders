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
        course.assignments = await googleApi.getCourseWorks(
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

router.get("/:id", function (req, res, next) {
  if (!req.session.tokens) {
    res.redirect("/");
  }

  const ids = req.params.id.split(":");
  const courseId = ids[0];
  const assignmentId = ids[1];

  Promise.all([
    googleApi.getCourse(req.session.tokens, courseId),
    googleApi.getCourseRoster(req.session.tokens, courseId),
    googleApi.getCourseWork(req.session.tokens, courseId, assignmentId),
    googleApi.getStudentSubmissions(req.session.tokens, courseId, assignmentId),
  ]).then(([course, students, courseWork, submissions]) => {
    // Match submissions to students
    if (
      students &&
      students.length > 0 &&
      submissions &&
      submissions.length > 0
    ) {
      students.map((student) => {
        student.submission = submissions.find(
          (submission) => submission.userId === student.userId
        );
        if (student.submission && student.submission.state === "TURNED_IN") {
          student.turnedIn = true;
        }
        return student;
      });
    }

    res.render("assignment-messages", {
      course,
      students,
      courseWork,
      submissions,
    });
  });
});

module.exports = router;
