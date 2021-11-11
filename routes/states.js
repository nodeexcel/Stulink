let express = require("express");
let router = express.Router();
const { states } = require("../controllers");
let { multerUpload } = require("../utils");
router.post(
  "/addStates",
  multerUpload.upload.single("image"),
  states.homePageStates
);
router.get("/getStates", states.getStatesData);
module.exports = router;
