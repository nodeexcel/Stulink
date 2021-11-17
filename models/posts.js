function post(database, type) {
  const cloudinary = require("cloudinary");
  const Post = database.define(
    "post",
    {
      post: type.STRING,
      image: type.STRING,
    },
    { timestamps: true, updatedAt: false }
  );
  Post.associate = (models) => {
    models.UserProfile.hasMany(Post, {
      foreignKey: "userId",
    });
  };

  Post.addPost = async (req, models) => {
    try {
      let result;
      let userProfile = req.userProfile;
      let image;
      let uploadedImage;
      let data;
      try {
        image = req.file.path;
        uploadedImage = await cloudinary.v2.uploader.upload(image);
        data = {
          image: uploadedImage,
          userId: userProfile.id,
          post: req.body.post,
        };
      } catch (error) {
        image = null;
        data = {
          image: null,
          userId: userProfile.id,
          post: req.body.post,
        };
      }
      let createdPost = await Post.create(data);
      if (createdPost) {
        result = {
          error: 0,
          message: "post created",
          data: createdPost,
        };
      } else {
        result = {
          error: 1,
          message: "error while creating post",
        };
      }
      return result;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };

  Post.getPost = async (req) => {
    try {
      let user = req.userProfile;
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };
  return Post;
}

module.exports = post;
