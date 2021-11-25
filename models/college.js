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
      // state: {
      //   type: type.STRING,
      //   allowNull: false,
      // },
      // city: {
      //   type: type.STRING,
      //   allowNull: false,
      // },
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
  College.findCollegeData = async (req, models) => {
    try {
      let data;
      let result;
      // console.log(req.body);
      if (Object.keys(req.body).length == 0) {
        data = await College.findAll({
          attributes: ["name", "rating", "image", "stateId", "cityId"],
          include: [{ model: models.States, attributes: ["name"], include:[{model: models.City, attributes: ["id","name"]}] }],
        });
        result = {
          error: 0,
          data: data,
        };
      } else if(req.body.state){
        data = await College.findAll({
          where: {stateId:{[Op.in]:req.body.state}},
          attributes: ["name", "rating", "image", "stateId", "cityId"],
          include: [{ model: models.States, attributes: ["name"], include:[{model: models.City, attributes: ["name", "id"]}] }],
        });
        result = {
          error: 0,
          data: data,
        };
      }else {
        result = {
          message: "not found",
        };
      }
      // let states = [];
      // let city = [];
      // data = await College.findAll({attributes: ["state", "city"]});
      // for(let state in data){
      //   states.push(data[state].state);
      //   city.push(data[state].city);
      // }
      // function onlyUnique(value, index, self) {
      //   return self.indexOf(value) === index;
      // }
      // let uniqueStates = states.filter(onlyUnique);
      // let uniqueCity = city.filter(onlyUnique);
      // try {
      //   data = await College.findAll({
      //     attributes: ["name", "rating", "image", "state", "city"],
      //     where: { name: req.body.name },
      //   });
      //   result = res(data);
      // } catch (error) {
      // try {
      //   data = await College.findAll({
      //     attributes: ["name", "rating", "image", "state", "city"],
      //     where: {
      //       [Op.and]: [
      //         { state: { [Op.in]: req.body.state } },
      //         { city: { [Op.in]: req.body.city } },
      //         { coursePrice: { [Op.in]: req.body.coursePrice } },
      //       ],
      //     },
      //   });
      //   if (data.length > 0) {
      //     result = res(data);
      //   } else {
      //     result = {
      //       error: 0,
      //       message: "nothing found",
      //     };
      //   }
      // } catch (error) {
      //   try {
      //     console.log(78787);
      //     data = await College.findAll({
      //       attributes: ["name", "rating", "image", "state", "city"],
      //       where: { state: { [Op.in]: req.body.state } },
      //       include: [{ models: models.Course, where: { type: "graduate" } }],
      //     });
      //     console.log(data);
      //     if (data.length > 0) {
      //       result = res(data);
      //     } else {
      //       result = {
      //         error: 1,
      //         message: "nothing found",
      //       };
      //     }
      //   } catch (error) {
      //     try {
      //       console.log(565656);
      //       data = await College.findAll({
      //         attributes: ["name", "rating", "image", "state", "city"],
      //         include: [
      //           { model: models.Course, where: { type: "undergraduate" } },
      //         ],
      //       });
      //       result = await res(data);
      //     } catch (error) {
      //       console.log(error);
      //       result = {
      //         error: 1,
      //         message: "no colleges found",
      //       };
      //     }
      //   }
      // }
      // result.states = uniqueStates;
      // result.city = uniqueCity;
      // console.log(result);
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
