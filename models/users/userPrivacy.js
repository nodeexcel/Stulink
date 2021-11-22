function userprivacy(database, type) {
  const UserPrivacy = database.define(
    "privacy",
    {
      searchEnginePrivacy: {
        type: type.BOOLEAN,
        defaultValue: false,
      },
      sitesAndAdsPrivacy: {
        type: type.BOOLEAN,
        defaultValue: false,
      },
      stulinkPartnersPrivacy: {
        type: type.BOOLEAN,
        defaultValue: false,
      },
    },
    { timestamps: false }
  );
  UserPrivacy.associate = (models) => {
    models.UserProfile.hasOne(UserPrivacy, {
      foreignKey: "userId",
    });
  };
  UserPrivacy.updatePrivacy = async (req) => {
    try {
      let userProfile = req.userProfile;
      let updatedData = await UserPrivacy.update(
        {
          searchEnginePrivacy: req.body.searchEnginePrivacy,
          sitesAndAdsPrivacy: req.body.sitesAndAdsPrivacy,
          stulinkPartnersPrivacy: req.body.stulinkPartnersPrivacy,
        },
        { where: { userId: userProfile.id } }
      );
      let result = {
        error: 0,
        message: "privacy updated",
      };
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };
  return UserPrivacy;
}

module.exports = userprivacy;
