let express = require("express");
let router = express.Router();
let { college } = require("../controllers");
// const college = require("../models/college");
let { multerUpload } = require("../utils");
router.post(
  "/collegeData",
  multerUpload.upload.single("image"),
  college.homePage
);
router.get("/getCollegeImage", college.getImage);
module.exports = router;
