function comments(database, type) {
  const Comments = database.define(
    "comments",
    {
      comments: type.STRING,
    },
    { timestamps: false }
  );
  Comments.associate = (models) => {
    models.Post.hasMany(Comments, {
      foreignKey: "postId",
    });
  };
  Comments.addComments = async (req) => {
    try {
      let userProfile = req.userProfile;
    } catch (error) {
      throw new Error(error);
    }
  };
}
