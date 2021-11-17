function friends(database, type) {
  const Friend = database.define("friend", {
    userprofileId: {
      type: type.INTEGER,
      references: {
        model: "userprofiles",
        key: "id",
      },
    },
  }, {timestamps: false});

  Friend.associate = (models) => {
    models.UserProfile.belongsToMany(models.UserProfile, {
      as: "friendConfirmed",
      through: Friend
    });
  };
  return Friend;
}

module.exports = friends;
