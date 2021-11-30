let express = require("express");
let router = express.Router();
let { exam } = require("../controllers");

router.post("/addExams", exam.addExams);
router.post("/addExamOverview", exam.addExamOverview);
router.get("/getExamOverview", exam.getExamOverview);
router.post("/addApplicationInformation", exam.addApplicationInformation);
router.get("/getApplicationInformation", exam.getApplicationInfo)
module.exports = router;