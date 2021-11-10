function courses(database, type) {
  const Courses = database.define(
    "course",
    {
      name: type.STRING,
    },
    { timestamps: false }
  );
  Courses.addCourse = async (req) => {
    try {
      let result;
      let createdCourse = await Courses.create({ name: req.body.name });
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
  Courses.getCourse = async (req) => {
    try {
      let result;
      let row = [];
      let foundCourses = await Courses.findAll({attributes: ['name']});
      if(foundCourses % 6)
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
  return Courses;
}

module.exports = courses;
