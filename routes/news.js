let express = require("express");
let router = express.Router();
let { news } = require("../controllers");
let { multerUpload } = require("../utils");

router.post(
  "/newsData",
  multerUpload.upload.single("image"),
  news.addNewsData
);
router.get("/newspage", news.getNewsData);

module.exports = router;
