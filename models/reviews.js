function review(database, type) {
  const Review = database.define(
    "review",
    {
      reviewData: type.STRING,
      review_done_by_user_id: type.INTEGER,
    },
    {
      timestamps: true,
      updatedAt: false,
    }
  );
  Review.associate = (models) => {
    models.College.hasMany(Review, { foreignKey: "collegeId" });
    Review.belongsTo(models.College, { foreignKey: "collegeId" });
  };
  return Review;
}

module.exports = review;
