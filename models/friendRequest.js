function friendRequest(database, type) {
  const { Op } = require("sequelize");
  const FriendRequest = database.define(
    "friendrequest",
    {},
    { timestamps: false }
  );
  FriendRequest.sendRequest = async (req, models) => {
    try {
      let userProfile = req.userProfile;
      let result;
      let friend = await models.UserProfile.findOne({
        where: {
          [Op.and]: [
            { username: req.body.username },
            { username: { [Op.ne]: userProfile.username } },
          ],
        },
      });
      if (friend == null) {
        result = {
          error: 1,
          message: "profile not found",
        };
      } else {
        let friendRequest = await FriendRequest.create({
          sender: userProfile.id,
          receiver: friend.id,
        });
        result = {
          error: 0,
          message: "request send",
          data: friendRequest,
        };
      }
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };

  FriendRequest.getAllRequests = async (req, models) => {
    try {
      let userProfile = req.userProfile;
      let result;
      let pendingRequests = await models.UserProfile.findAll({
          include:["sender"],
      });
      if (pendingRequests.length > 0) {
        result = {
          error: 0,
          data: pendingRequests,
        };
      } else {
        result = {
          error: 1,
          message: "no pending request",
        };
      }
      return result;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };

  FriendRequest.acceptRequest = async (req, models) => {
    try {
      let userProfile = req.userProfile;
      let result;
    } catch (error) {
      throw new Error(error);
    }
  };
  return FriendRequest;
}

module.exports = friendRequest;
