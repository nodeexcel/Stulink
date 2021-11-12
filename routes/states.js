let express = require("express");
let router = express.Router();
const { states } = require("../controllers");
let { multerUpload } = require("../utils");

router.post(
  "/addStates",
  multerUpload.upload.single("image"),
  states.addStatesData
);

module.exports = router;
