let express = require("express");
let router = express.Router();
let { search } = require("../controllers");
const { authForAllUser } = require("../middleware/auth");

router.get("/searchHere", authForAllUser, search.searchedCollegeData);

module.exports = router;
