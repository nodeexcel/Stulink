function courses(database, type) {
  const { fn, col } = require("sequelize");
  const Courses = database.define(
    "course",
    {
      name: {
        type: type.STRING,
        allowNull: false,
        unique: true,
      },
      type: {
        type: type.STRING,
        allowNull: false,
      },
      category:{
        type: type.STRING,
        allowNull:false,
      }
    },
    { timestamps: false }
  );

  Courses.addCourse = async (req) => {
    try {
      let result;
      let createdCourse = await Courses.create({
        name: req.body.name,
        type: req.body.type,
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
      let foundCourses = await Courses.findAll({ attributes: ["name"] });
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
  Courses.getDiplomaCourse = async (req) => {
    try {
      let result;
      let foundCourses = await Courses.findAll({
        attributes: ["name"],
        where: { type: "diploma" },
      });
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
  Courses.getUndergraduateCourse = async (req) => {
    try {
      let result;
      let foundCourses = await Courses.findAll({
        attributes: ["name"],
        where: { type: "undergraduate" },
      });
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
  Courses.getPostGraduateCourse = async (req) => {
    try {
      let result;
      let foundCourses = await Courses.findAll({
        attributes: ["name"],
        where: { type: "postgraduate" },
      });
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
  Courses.getPhdCourse = async (req) => {
    try {
      let result;
      let foundCourses = await Courses.findAll({
        attributes: ["name"],
        where: { type: "phd" },
      });
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
  Courses.courseData = async (models) => {
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
