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
    models.UserProfile.hasMany(Comments, {
      foreignKey: "userId",
    });
    models.Gallery.hasMany(Comments, {
      foreignKey: "galleryId",
    })
  };

  Comments.addComments = async (req) => {
    try {
      let result;
      let data;
      let userProfile = req.userProfile;
      let post = await models.Post.findOne({ where: { id: req.body.postId } });
      if (post !== null) {
        data = {
          postId: req.body.postId,
          userId: userProfile.id,
          comment: req.body.comment,
        };
        let createdPost = await Comments.create(data);
        if (createdPost) {
          result = {
            error: 0,
            message: "comment created",
            data: createdPost,
          };
        } else {
          result = {
            error: 1,
            message: "error occured",
          };
        }
      } else {
        result = {
          error: 1,
          mesage: "no such post found",
        };
      }
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };
  return Comments
}

module.exports = comments;