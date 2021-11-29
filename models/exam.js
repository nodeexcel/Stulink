function exam(database, type) {
  const Exam = database.define(
    "exam",
    {
      name: type.STRING,
      examDate: type.STRING,
      applicationDate: type.STRING,
      resultDate: type.STRING,
    },
    {
      timestamps: false,
    }
  );
  Exam.associate = (models) => {
    models.Course.hasMany(Exam, { foreignKey: "courseId" });
    Exam.belongsTo(models.Course, { foreignKey: "courseId" });
  };

  Exam.addExamData = async (req) => {
    try {
      let data = await Exam.create({
        name: req.body.name,
        examDate: req.body.examDate,
        applicationDate: req.body.applicationDate,
        resultDate: req.body.resultDate,
        courseId: req.body.courseId,
      });
      let result;
      if (data) {
        result = {
          error: 0,
          data: data,
        };
      } else {
        result = {
          error: 1,
          message: "error while adding Exam Data",
        };
      }
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };

  Exam.getAllExamsForCourse = async (req) => {
    try {
      let data = await Exam.findAll({ where: { courseId: req.body.courseId } });
      let result = {
        error: 0,
        data: data,
      };
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };
  return Exam;
}
module.exports = exam;
