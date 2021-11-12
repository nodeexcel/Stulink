let express = require("express");
let router = express.Router();
let { college } = require("../controllers");

let { multerUpload } = require("../utils");
router.post(
  "/collegeData",
  multerUpload.upload.single("image"),
  college.addCollegeData
);

module.exports = router;
