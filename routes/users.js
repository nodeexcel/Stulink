let express = require("express");
let router = express.Router();
const { users } = require("../controllers");
const { authForAllUser } = require("../middleware/auth");
let { multerUpload } = require("../utils");

router.post("/register", users.registration);
router.post("/login", users.login);
router.post("/addProfile", authForAllUser, multerUpload.upload.single("image"), users.addprofiledata);
router.get("/profile", authForAllUser,users.profilepage);
router.post("/addPost", authForAllUser,multerUpload.upload.single("image"), users.postData);
router.post("/addFriendRequest", authForAllUser, users.addFriendRequest);
router.get("/findFriendRequest", authForAllUser, users.findFriendRequest);
router.post("/updatepassword", authForAllUser, users.updatePassword);
router.post("/updateEducation", authForAllUser, users.updateEdu);
router.post("/privacy", authForAllUser,users.changePrivacy)
router.post("/accountSettings", authForAllUser, users.changeAccountSettings);
router.get("/members", authForAllUser, users.getAllMembers);

module.exports = router;
