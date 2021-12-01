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
router.post("/addadmissioninfo", college.addAdmissionInfo);
router.get("/getadmissioninfo", college.getAdmissionInfo);

module.exports = router;
