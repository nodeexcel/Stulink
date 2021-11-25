const { Op } = require("sequelize");
const cloudinary = require("cloudinary");
const { res } = require("../utils");

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
      let states = [];
      let city = [];
      data = await College.findAll({attributes: ["state", "city"]});
      for(let state in data){
        states.push(data[state].state);
        city.push(data[state].city);
      }
      function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
      }
      let uniqueStates = states.filter(onlyUnique);
      let uniqueCity = city.filter(onlyUnique);
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
      result.states = uniqueStates;
      result.city = uniqueCity;
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };

  College.addImages = async (req, models) => {
    try {
      let result;
      let image = req.file.path;
      let uploadedImage = await cloudinary.v2.uploader.upload(image);
      let data = {
        image: uploadedImage.secure_url,
        about: req.body.about,
        collegeId: req.body.collegeId,
      };
      let createdGallery = await models.Gallery.create(data);
      result = {
        error: 0,
        message: "image added",
        data: createdGallery,
      };
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };

  College.getImages = async (req, models) => {
    try {
      let result;
      let images = await models.Gallery.findAll({
        where: { collegeId: req.body.collegeId },
      });
      if (images.length > 0) {
        result = {
          error: 0,
          data: images,
        };
      } else {
        result = {
          error: 1,
          message: "nothing to show",
        };
      }
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };
  return College;
}

module.exports = college;
