function applicationGuidelines(database, type) {
  const ApplicationGuidelines = database.define(
    "applicationguidelines",
    {
      detail: type.STRING(2000),
      applicationForm: type.STRING(2000),
      registrationDetail: type.STRING(2000),
      applicationFee_offline: type.STRING(2000),
      applicationFee_online: type.STRING(2000),
    },
    { timestamps: false }
  );
  ApplicationGuidelines.associate = (models) => {
    models.Exam.hasOne(ApplicationGuidelines, { foreignKey: "examId" });
    ApplicationGuidelines.belongsTo(models.Exam, { foreignKey: "examId" });
  };
  ApplicationGuidelines.addApplication = async (req) => {
    try {
      let data = await ApplicationGuidelines.create({
        detail: req.body.detail,
        applicationForm: req.body.applicationForm,
        registrationDetail: req.body.registrationDetail,
        applicationFee_offline: req.body.applicationFee_offline,
        applicationFee_online: req.body.applicationFee_online,
        examId: req.body.examId,
      });
      let result = {
        error: 0,
        message: "appplication guidelines added",
      };
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };
  ApplicationGuidelines.getApplicationInfoData = async (req) => {
    try {
      let data = await ApplicationGuidelines.findOne({
        where: { examId: req.body.examId },
      });
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
  return ApplicationGuidelines;
}

module.exports = applicationGuidelines;
