function syllabus(database, type) {
  const Syllabus = database.define(
    "syllabus",
    { syllabus: type.STRING(5000) },
    { timestamps: false }
  );
  Syllabus.associate = (models) => {
    models.Exam.hasOne(Syllabus, { foreignKey: "examId" });
    Syllabus.belongsTo(models.Exam, { foreignKey: "examId" });
  };
  Syllabus.addSyllabusData = async (req) => {
    try {
      let result;
      if (Object.keys(req.body).length == 0) {
        result = {
          error: 1,
          message: "nothing to add",
        };
      } else {
        let data = await Syllabus.create({
          syllabus: req.body.syllabus,
          examId: req.body.examId,
        });
        result = {
          error: 0,
          message: "syllabus added",
        };
      }
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };
  Syllabus.getSyllabusData = async (req) => {
    try {
      let data = await Syllabus.findOne({ where: { examId: req.body.examId } });
      let result;
      if (data == null) {
        result = {
          error: 1,
          message: "nothing to show",
        };
      } else {
        result = {
          error: 0,
          data: data,
        };
      }
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };
  return Syllabus;
}

module.exports = syllabus;
