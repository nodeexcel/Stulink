let express = require("express");
let router = express.Router();
let { homepage } = require("../controllers");

router.get("/", homepage.allData);

module.exports = router;