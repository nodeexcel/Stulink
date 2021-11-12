function college(database, type) {
  // const fs = require("fs");
  const { Op } = require("sequelize");
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
      state: {
        type: type.STRING,
        allowNull: false,
      },
      city: {
        type: type.STRING,
        allowNull: false,
      },
      coursePrice: {
        type: type.STRING,
        allowNull: false,
      },
      address: {
        type: type.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );

  College.associate = (models) => {
    models.Course.hasMany(College, { foreignKey: "courseId" });
  };

  College.addCollege = async (req) => {
    try {
      let data = req.file.path;
      let uploadedImage = await cloudinary.v2.uploader.upload(data);
      let image = {
        image: uploadedImage.secure_url,
        name: req.body.name,
        rating: req.body.rating,
        address: req.body.address,
        courseId: req.body.courseId,
        coursePrice: req.body.courseprice,
        state: req.body.state,
        city: req.body.city,
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
  College.findCollegeData = async (req) => {
    try {
      let data = await College.findAll({});
      let result = {
        error: 0,
        message: "found data",
        data: data,
      };
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };
  return College;
}

module.exports = college;
