function userSettings(database, type) {
  const UserSettings = database.define(
    "settings",
    {
      privateAccount: {
        type: type.BOOLEAN,
        defaultValue: false,
      },
      whoCanFriends: {
        type: type.BOOLEAN,
        defaultValue: false,
      },
      whoCanViewPosts: {
        type: type.BOOLEAN,
        defaultValue: false,
      },
    },
    { timestamps: false }
  );
  UserSettings.associate = (models) => {
    models.UserProfile.hasOne(UserSettings, {
      foreignKey: "userId",
    });
  };
  UserSettings.updateSettings = async (req, models) => {
    try {
      let userProfile = req.userProfile;
      if (req.body.isDeactive == null && req.body.isClose == null) {
        let settings = await UserSettings.update(
          {
            privateAccount: req.body.privateAccount,
            whoCanFriends: req.body.whoCanFriends,
            whoCanViewPosts: req.body.whoCanViewPosts,
          },
          { where: { userId: userProfile.id } }
        );
      } else if (req.body.isDeactive == true) {
        let profile = await models.UserProfile.update(
          { isDeactive: true },
          { where: { id: userProfile.id } }
        );
      } else {
        await models.UserProfile.update(
          { isClosed: req.body.isClose },
          { where: { id: userProfile.id } }
        );
      }
      let result = {
        error: 0,
        message: "user Settings changed",
      };
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };
  return UserSettings;
}

module.exports = userSettings;
