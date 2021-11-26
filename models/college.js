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
    College.belongsTo(models.Course, { foreignKey: "courseId" });
    College.belongsTo(models.States, { foreignKey: "stateId" });
    College.belongsTo(models.City, { foreignKey: "cityId" });
  };

  let dataFunction = async (models, condition, variable, database) => {
    try {
      console.log();
      let data = await database.findAll({
        where: { [condition]: { [Op.in]: variable } },
        attributes: [
          "name",
          "rating",
          "image",
          "stateId",
          "cityId",
          "coursePrice",
          "address",
        ],
        include: [
          {
            model: models.States,
            attributes: ["name", "id"],
            include: [{ model: models.City, attributes: ["name", "id"] }],
          },
        ],
      });
      let result = {
        error: 0,
        data: data,
      };
      return result;
    } catch (error) {
      throw new Error(error);
    }
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
  College.findCollegeDataForHomePage = async () => {
    try {
      let result = await College.findAll({});
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };
  College.findCollegeData = async (req, models) => {
    try {
      let data;
      let result;
      if (Object.keys(req.body).length == 0) {
        data = await College.findAll({
          attributes: [
            "name",
            "rating",
            "image",
            "stateId",
            "cityId",
            "coursePrice",
            "address",
          ],
          include: [
            {
              model: models.States,
              attributes: ["name", "id"],
              include: [{ model: models.City, attributes: ["id", "name"] }],
            },
          ],
        });
        result = {
          error: 0,
          data: data,
        };
      } else if (req.body.state) {
        let database = College;
        let state = "stateId";
        let findFrom = req.body.state;
        result = await dataFunction(models, state, findFrom, database);
      } else if (req.body.city) {
        let database = College;
        let city = "cityId";
        let findFrom = req.body.city;
        result = await dataFunction(models, city, findFrom, database);
      } else if (req.body.courseRange) {
        data = await College.findAll({
          where: { coursePrice: { [Op.between]: req.body.courseRange } },
          attributes: [
            "name",
            "rating",
            "image",
            "stateId",
            "cityId",
            "coursePrice",
            "address",
          ],
          include: [
            {
              model: models.States,
              attributes: ["name", "id"],
              include: [{ model: models.City, attributes: ["name", "id"] }],
            },
          ],
        });
        result = {
          error: 0,
          data: data,
        };
      } else if (req.body.courseType) {
        // let database = models.Course;
        // let findFrom = req.body.courseType;
        // let course = "type";
        // result = await dataFunction(models, course, findFrom, database);
        // result;
        data = await models.Course.findAll({
          where: { type: { [Op.in]: req.body.courseType } },
          include: [
            {
              model: College,
              where: { courseId: { [Op.col]: "course.id" } },
              attributes: [
                "name",
                "rating",
                "image",
                "stateId",
                "cityId",
                "coursePrice",
                "address",
              ],
              include: [
                {
                  model: models.States,
                  attributes: ["name", "id"],
                  include: [{ model: models.City, attributes: ["name", "id"] }],
                },
              ],
            },
          ],
        });
        result = {
          error: 0,
          data: data,
        };
      } else {
        result = {
          message: "not found",
        };
      }
      return result;
    } catch (error) {
      console.log(error);
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
