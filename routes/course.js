let express = require("express");
let router = express.Router();
let { course } = require("../controllers");

router.post("/addCourse", course.addCourseDetails);
router.get("/getCourses", course.getCourseDetails);

module.exports = router;