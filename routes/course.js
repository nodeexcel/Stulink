let express = require("express");
let router = express.Router();
let { course } = require("../controllers");
let { multerUpload } = require("../utils");
router.post(
  "/addCourse",
  multerUpload.upload.single("image"),
  course.addCourseDetails
);

module.exports = router;
