let express = require("express");
let router = express.Router();
const { jobs } = require("../controllers");

router.post("/addJobsData", jobs.homePageJobs);

module.exports = router;
