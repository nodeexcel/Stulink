let express = require("express");
let router = express.Router();
let { search } = require("../controllers");

router.get("/searchHere",search.searchedCollegeData );

module.exports = router;