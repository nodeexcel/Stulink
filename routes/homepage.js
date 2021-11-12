let express = require("express");
let router = express.Router();
let { homepage } = require("../controllers");

router.get("/", homepage.allData);
router.get("/getDiplomaCourse", homepage.courseDetailsForOtherPage);
router.get("/getUndergraduateCourse", homepage.courseDetailsForOtherPage);
router.get("/getPostGraduateCourse", homepage.courseDetailsForOtherPage);
router.get("/getPhdCourse", homepage.courseDetailsForOtherPage);

module.exports = router;
