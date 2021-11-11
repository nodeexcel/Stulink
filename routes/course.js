let express = require("express");
let router = express.Router();
let { course } = require("../controllers");

router.post("/addCourse", course.addCourseDetails);
router.get("/getAllCourse", course.getCourseDetails);
router.get("/getDiplomaCourse", course.getCourseDetails);
router.get("/getUndergraduateCourse", course.getCourseDetails);
router.get("/getPostGraduateCourse", course.getCourseDetails);
router.get("/getPhdCourse", course.getCourseDetails);

module.exports = router;
