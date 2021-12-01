let express = require("express");
let router = express.Router();
const { jobs } = require("../controllers");

router.post("/addJobsData", jobs.addJobsData);
router.get("/getJobs", jobs.getJobs);
router.post("/addJobDetail", jobs.addJobDetail);
router.get("/getJobDetail", jobs.getJobDetail)
module.exports = router;
