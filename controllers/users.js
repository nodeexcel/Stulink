const db = require("../db");
const { Op } = require("sequelize");
const { response } = require("../utils");
let registration = async (req, res) => {
  try {
    let result = await db.User.registration(req, db);
    res.status(200).send(response(result.error, result.message, result.data));
  } catch (error) {
    res.status(500).send(response(1, error.message));
  }
};

let login = async (req, res) => {
  try {
    let result = await db.User.login(req, db);
    res.status(200).send(response(result.error, result.message, result.data));
  } catch (error) {
    res.status(500).send(response(1, error.message));
  }
};

let addprofiledata = async (req, res) => {
  try {
    let result = await db.UserProfile.addedData(req, db);
    res.status(200).send(response(result.error, result.message, result.data));
  } catch (error) {
    console.log(error);
    res.status(500).send(response(1, error.message));
  }
};

let profilepage = async (req, res) => {
  try {
    let profileData = await findProfile(req, res);
    let trendingTopic = await findTopic(req, res);
    let recommendedProfile = await allProfile(req, res);
    let postData = await findPost(req, res);
    res.json({ profileData, postData, trendingTopic, recommendedProfile });
  } catch (error) {
    res.status(500).send(response(1, error.message));
  }
};

let allProfile = async (req, res) => {
  try {
    let user = req.user;
    let result = await db.UserProfile.findAll({
      attributes: ["image", "username", "email", "university"],
      where: { userId: { [Op.ne]: user.user_id } },
    });
    if (result.length > 0) {
      return result;
    } else {
      return "no profiles to show";
    }
  } catch (error) {
    throw new Error(error);
  }
};

let findProfile = async (req, res) => {
  try {
    let result = await db.UserProfile.getProfile(req, db);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

let findPost = async (req, res) => {
  try {
    let userProfile = req.userProfile;
    let result = await db.Post.findAll({ where: { userId: userProfile.id } });
    if (result.length > 0) {
      return result;
    } else {
      return "no posts found";
    }
  } catch (error) {
    throw new Error(error);
  }
};

let findTopic = async (req, res) => {
  try {
    let user = req.user;
    let userProfile = await db.UserProfile.findOne({
      where: { userId: user.user_id },
    });
    let result = await db.Topic.findAll({
      attributes: ["name", "details"],
      where: { userId: { [Op.ne]: userProfile.id } },
    });
    if (result.length > 0) {
      return result;
    } else {
      return "no trending topic to show";
    }
  } catch (error) {
    throw new Error(error);
  }
};

let postData = async (req, res) => {
  try {
    let result = await db.Post.addPost(req, db);
    res.status(200).send(response(result.error, result.message, result.data));
  } catch (error) {
    res.status(500).send(response(1, error.message));
  }
};

let addFriendRequest = async (req, res) => {
  try {
    let result = await db.FriendRequest.sendRequest(req, db);
    res.status(200).send(response(result.error, result.message, result.data));
  } catch (error) {
    res.status(500).send(response(1, error.message));
  }
};

let findFriendRequest = async (req, res) => {
  try {
    let result = await db.FriendRequest.getAllRequests(req, db);
    res.status(200).send(response(result.error, result.message, result.data));
  } catch (error) {
    res.status(500).send(response(1, error.message));
  }
};

let updatePassword = async (req, res) => {
  try {
    let result = await db.User.updatedPassword(req);
    res.status(200).send(response(result.error, result.message, result.data));
  } catch (error) {
    res.status(500).send(response(1, error.message));
  }
};

let updateEdu = async (req, res) => {
  try {
    let result = await db.UserProfile.updateEducation(req);
    res.status(200).send(response(result.error, result.message, result.data));
  } catch (error) {
    res.status(500).send(response(1, error.message));
  }
};

let changePrivacy = async(req, res) =>{
  try {
    let result = await db.UserPrivacy.updatePrivacy(req);
    res.status(200).send(response(result.error, result.message, result.data));
  } catch (error) {
    res.status(500).send(response(1, error.message));
  }
}

let changeAccountSettings = async(req, res) =>{
  try {
    let result = await db.UserSettings.updateSettings(req,db);
    res.status(200).send(response(result.error, result.message, result.data));
  } catch (error) {
    res.status(500).send(response(1, error.message));
  }
}
module.exports = {
  registration,
  login,
  profilepage,
  addprofiledata,
  postData,
  addFriendRequest,
  findFriendRequest,
  updatePassword,
  updateEdu,
  changePrivacy,
  changeAccountSettings
};
