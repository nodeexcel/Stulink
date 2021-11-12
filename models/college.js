function college(database, type) {
  // const fs = require("fs");
  const cloudinary = require("cloudinary");
  const College = database.define(
    "colleges",
    {
      image: {
        type: type.STRING,
        allowNull: false,
      },
      rating: {
        type: type.INTEGER,
      },
      name: {
        type: type.STRING,
        unique: true,
      },
      place: {
        type: type.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );

  College.associate = (models) => {
    models.Course.hasMany(College, {foreignKey: "courseId" });
  };

  College.addtrending = async (req) => {
    try {
      let data = req.file.path;
      let uploadedImage = await cloudinary.v2.uploader.upload(data);
      let image = {
        image: uploadedImage.secure_url,
        name: req.body.name,
        rating: req.body.rating,
        place: req.body.place,
        courseId: req.body.courseId,
      };
      let createdImage = await College.create(image);
      let result = {
        error: 0,
        message: "created",
        data: createdImage,
      };
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };
  return College;
}

module.exports = college;
