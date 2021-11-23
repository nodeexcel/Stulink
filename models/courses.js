function courses(database, type) {
  const { fn, col } = require("sequelize");
  const cloudinary = require("cloudinary");
  const Courses = database.define(
    "course",
    {
      image: {
        type: type.STRING,
        allowNull: false,
      },
      name: {
        type: type.STRING,
        allowNull: false,
        unique: true,
      },
      type: {
        type: type.STRING,
        allowNull: false,
      },
      category: {
        type: type.STRING,
        allowNull: false,
      },
      branch: type.STRING,
    },
    { timestamps: false }
  );

  Courses.addCourse = async (req) => {
    try {
      let result;
      let data = req.file.path;
      let uploadedImage = await cloudinary.v2.uploader.upload(data);
      let createdCourse = await Courses.create({
        image: uploadedImage.secure_url,
        name: req.body.name,
        type: req.body.type,
        category: req.body.category,
      });
      if (createdCourse !== null) {
        result = {
          error: 0,
          message: "created",
          data: createdCourse,
        };
      } else {
        result = {
          error: 1,
          message: "not created",
        };
      }
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };
  Courses.getAllCourse = async (req) => {
    try {
      let result;
      let foundCourses = await Courses.findAll({ attributes: ["name","type"] });
      if (foundCourses.length > 0) {
        result = {
          error: 0,
          message: "found data",
          data: foundCourses,
        };
      } else {
        result = {
          error: 0,
          message: "can't find the data",
        };
      }
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };

  Courses.courseDataCount = async (models) => {
    try { 
      let foundCourse = await Courses.findAll({
        attributes: {
          include: [[fn("COUNT", col("colleges.id")), "collegeCount"]],
        },
        include: [
          {
            model: models.College,
            attributes: [],
          },
        ],
        group: ["course.id"],
      });
      let result = {
        error: 0,
        message: "found data",
        data: foundCourse,
      };
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };
  return Courses;
}

module.exports = courses;
