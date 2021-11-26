function ratings(database, type) {
  const Ratings = database.define(
    "ratings",
    {
      academics: type.INTEGER,
      diversity: type.INTEGER,
      athletics: type.INTEGER,
      value: type.INTEGER,
      professors: type.INTEGER,
      campus: type.INTEGER,
      location: type.INTEGER,
      dorms: type.INTEGER,
    },
    { timestamps: false }
  );
  Ratings.associate = (models) => {
   models.College.hasOne(Ratings,{foreignKey: "collegeId"});
   Ratings.belongsTo(models.College, {foreignKey: "collegeId"});
  };
  return Ratings;
}

module.exports = ratings;
