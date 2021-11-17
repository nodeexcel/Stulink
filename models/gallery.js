function gallery(database, type) {
  const cloudinary = require("cloudinary");
  const Gallery = database.define(
    "gallery",
    {
      image: type.STRING,
      about: type.STRING,
    },
    { timestamps: true, updatedAt: false }
  );
  Gallery.associate = (models) => {
    models.UserProfile.hasMany(Gallery, { foriegnKey: "userId" });
  };

  Gallery.addGallery = async (req, res) => {
    try {
      let result;
      let userProfile = req.userProfile;
      let image = req.file.path;
      let uploadedImage = await cloudinary.v2.uploader.upload(image);
      let data = {
        image: uploadedImage.secure_url,
        data: req.body.data,
        userId: userProfile.id,
      };
      let createdGallery = await Gallery.create(data);
      if (data) {
        result = {
          error: 0,
          data: createdGallery,
        };
      } else {
        result = {
          error: 1,
          message: "gallery not created",
        };
      }
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };

  Gallery.getGallery = async (req) => {
    try {
      let result;
      let userProfile = req.userProfile;
      let foundGallery = await Gallery.findAll({
        where: { userId: userProfile.id },
      });
      if (foundGallery.length > 0) {
        result = {
          error: 0,
          data: foundGallery,
        };
      } else {
        result = {
          error: 1,
          message: "no gallery to show",
        };
      }
    } catch (error) {
      throw new Error(error);
    }
  };
  return Gallery;
}

module.exports = gallery;
