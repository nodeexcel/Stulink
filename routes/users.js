let express = require("express");
let router = express.Router();
const {users} = require("../controllers");

router.post("/register", users.registration);

module.exports = router;