let express = require("express");
let router = express.Router();
let { search } = require("../controllers");
const { authForAllUser } = require("../middleware/auth");

router.get("/searchHere", search.searchedCollegeData);
// authForAllUser

module.exports = router;
