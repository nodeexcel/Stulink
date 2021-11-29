function overview(database, type) {
  const Overview = database.define(
    "overview",
    {
      detail: type.STRING(4000),
      eligibilityCriteria: type.STRING(4000),
      admissionProcess: type.STRING(4000),
    },
    {
      timestamps: false,
    }
  );
  Overview.associate = (models) => {
    models.Course.hasMany(Overview, { foreignKey: "courseId" });
    Overview.belongsTo(models.Course, { foreignKey: "courseId" });
  };

  Overview.courseOverview = async (req) => {
    try {
      let data = await Overview.create({
        detail: req.body.detail,
        eligibilityCriteria: req.body.eligibilityCriteria,
        admissionProcess: req.body.admissionProcess,
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
          message: "error while adding data",
        };
      }
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };

  Overview.getOverview = async (req, models) => {
    try {
      let data = await Overview.findAll({
        where: { courseId: req.body.courseId },
        include: {
          model: models.Course,
          attributes: ["name"],
          where: { id: req.body.courseId },
          include: [
            {
              model: models.Branch,
              attributes: ["branchName"],
              where: { courseId: req.body.courseId },
            },
            {
              model: models.Exam,
              attributes: ["name"],
            //   where: { courseId: req.body.courseId },
            },
          ],
        },
      });
      let result;
      if (data.length > 0) {
        result = {
          error: 0,
          data: data,
        };
      } else {
        result = {
          error: 1,
          message: "nothing found",
        };
      }
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };
  return Overview;
}

module.exports = overview;
