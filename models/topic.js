function topic(database, type) {
  const Topic = database.define(
    "topic",
    {
      name: type.STRING,
      details: type.STRING,
    },
    { timestamps: false }
  );
  Topic.associate = (models) => {
    models.UserProfile.hasMany(Topic, {
      foreignKey: "userId",
    });
  };

  Topic.getTopic = async (req, res) => {
    try {
      let result = await Topic.findAll({ attributes: ["name"] });
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };

  Topic.getTrendingTopic = async (req, res) => {
    try {
      let result = await Topic.findAll({});
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };
  return Topic;
}

module.exports = topic;
