let express = require("express");
let router = express.Router();
let { exam } = require("../controllers");

router.post("/addExams", exam.addExams);
router.post("/addExamOverview", exam.addExamOverview);
router.get("/getExamOverview", exam.getExamOverview);
router.post("/addApplicationInformation", exam.addApplicationInformation);
router.get("/getApplicationInformation", exam.getApplicationInfo);
router.post("/addRegistrationInfo", exam.addRegistrationInfo);
router.get("/getRegistrationInfo", exam.getRegistrationInfo);
router.post("/addSyllabus", exam.addSyllabus);
router.get("/getSyllabus", exam.getSyllabus);
router.post("/addMocktestInfo", exam.addMocktestInfo);
router.get("/getmocktestinfo", exam.getmocktestinfo)
router.post("/addAdmitcardInfo", exam.addAdmitcardInfo)
router.get("/getAdmitcardInfo", exam.getAdmitcardInfo)
router.post("/addRankPredictorInfo", exam.addRankPredictor);
router.get("/getRankPredictorInfo", exam.getRankPredictor)
router.post("/addcuttoffinfo", exam.addcuttoffinfo);
router.get("/getcuttoffinfo", exam.getcuttoffinfo)
// router.post("/")

module.exports = router;
