const { Op } = require("sequelize");
function examOverview(database, type) {
  const ExamOverview = database.define(
    "examoverview",
    {
      detail: type.STRING(1000),
      highlights: type.STRING(1000),
      registration: type.STRING(1000),
      examPattern: type.STRING(1000),
      syllabus: type.STRING(1000),
    },
    { timestamps: false }
  );

  ExamOverview.associate = (models) => {
    models.Exam.hasOne(ExamOverview, { foreignKey: "examId" });
    ExamOverview.belongsTo(models.Exam, { foreignKey: "examId" });
  };

  ExamOverview.addExamOverviewData = async (req) => {
    try {
      let result;
      if (Object.keys(req.body).length == 0) {
        result = {
          error: 1,
          message: "nothing to add",
        };
      } else {
        let data = await ExamOverview.create({
          detail: req.body.detail,
          highlights: req.body.highlights,
          registration: req.body.registration,
          examPattern: req.body.examPattern,
          syllabus: req.body.syllabus,
          examId: req.body.examId,
        });
        result = {
          error: 0,
          message: "exam overview added",
          data: data,
        };
      }
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };
  ExamOverview.getExamOverviewData = async (req, models) => {
    try {
      let data = await ExamOverview.findOne({
        where: { examId: req.body.examId },
        include: {
          model: models.Exam,
          attributes: ["courseId"],
          where: { id: req.body.examId },
          include: {
            model: models.Course,
            attributes: ["name"],
            where: { id: { [Op.col]: "exam.courseId" } },
            include: {
              model: models.College,
              attributes: ["name"],
              where: { courseId: { [Op.col]: "exam.courseId" } },
            },
          },
        },
      });
      let result;
      if (data.length < null) {
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
      //   console.log(data);
      return result;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };
  return ExamOverview;
}

module.exports = examOverview;
