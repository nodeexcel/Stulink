let express = require("express");
let router = express.Router();
let { news } = require("../controllers");
const { authForAllUser } = require("../middleware/auth");
let { multerUpload } = require("../utils");

router.post(
  "/newsData",
  multerUpload.upload.single("image"),
  authForAllUser,
  news.addNewsData
);
router.get("/newspage", authForAllUser, news.getNewsData);
router.get("/newsById", authForAllUser, news.newsById);

module.exports = router;
