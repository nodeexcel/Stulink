let express = require("express");
let router = express.Router();
let { college } = require("../controllers");
let { multerUpload } = require("../utils");

router.post(
  "/collegeData",
  multerUpload.upload.single("image"),
  college.addCollegeData
);
router.post("/addCollegeGallery", multerUpload.upload.single("image"), college.addCollegeGallery);
router.get("/getCollegeImages", college.getCollegeImages);
router.get("/getCollegeById", college.getCollegesDataById);
router.get("/getCollegeNews", college.getCollegeNews);

module.exports = router;
