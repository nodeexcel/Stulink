const { Op } = require("sequelize");
const cloudinary = require("cloudinary");
const {res} = require("../utils");

function college(database, type) {
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
      let image = req.file.path;
      let uploadedImage = await cloudinary.v2.uploader.upload(image);
      let data = {
        image: uploadedImage.secure_url,
        name: req.body.name,
        rating: req.body.rating,
        address: req.body.address,
        courseId: req.body.courseId,
        coursePrice: req.body.courseprice,
        state: req.body.state,
        city: req.body.city,
      };
      let createdData = await College.create(data);
      let result = {
        error: 0,
        message: "college data added",
        data: createdData,
      };
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };
  College.findCollegeData = async (req) => {
    try {
      let data;
      let result;
      try {
        data = await College.findAll({
          attributes: ["name", "rating", "image", "state", "city"],
          where: { name: req.body.name },
        });
        result = res(data);
      } catch (error) {
        try {
          data = await College.findAll({
            attributes: ["name", "rating", "image", "state", "city"],
            where: { state: req.body.state },
          });
          result = res(data);
        } catch (error) {
          try {
            data = await College.findAll({
              attributes: ["name", "rating", "image", "state", "city"],
              where: {
                [Op.and]: [{ state: req.body.state }, { city: req.body.city }],
              },
            });
            result = res(data);
          } catch (error) {
            try {
              data = await College.findAll({
                attributes: ["name", "rating", "image", "state", "city"],
              });
              result = await res(data);
            } catch (error) {
              result = {
                error: 1,
                message: "no colleges found",
              };
            }
          }
        }
      }
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };
  return College;
}

module.exports = college;
