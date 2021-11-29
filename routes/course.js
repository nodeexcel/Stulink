let express = require("express");
let router = express.Router();
let { course, homepage } = require("../controllers");
let { multerUpload } = require("../utils");
router.post(
  "/addCourse",
  multerUpload.upload.single("image"),
  course.addCourseDetails
);
router.get("/allCourse", homepage.courseDetailsForOtherPage);
router.get("/getCourseByType", course.getCourseByType)
router.get("/getCourseRelatedColleges", course.getCourseRelatedColleges);
router.get("/getCourseExams", course.getCourseExams);

module.exports = router;
