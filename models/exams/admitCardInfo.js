function admitcardInfo(database, type) {
  const AdmitCardInfo = database.define(
    "admitcardinfo",
    {
      dates: type.STRING(1000),
      steps: type.STRING(1000),
      highlights: type.STRING(1000),
      importantpoints: type.STRING(1000),
      details: type.STRING(1000),
    },
    { timestamps: false }
  );
  AdmitCardInfo.associate = (models) => {
    models.Exam.hasOne(AdmitCardInfo, { foreignKey: "examId" });
    AdmitCardInfo.belongsTo(models.Exam, { foreignKey: "examId" });
  };

  AdmitCardInfo.addAdmitcardInfoData = async (req) => {
    try {
      let result;
      if (Object.keys(req.body).length == 0) {
        result = {
          error: 1,
          message: "nothing to add",
        };
      } else {
        let data = await AdmitCardInfo.create({
          dates: req.body.dates,
          steps: req.body.steps,
          highlights: req.body.highlights,
          importantpoints: req.body.importantpoints,
          details: req.body.details,
          examId: req.body.examId,
        });
        result = {
          error: 0,
          message: "admit card info added",
        };
      }
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };
  AdmitCardInfo.getAdmitcardInfoData = async (req) => {
    try {
      let data = await AdmitCardInfo.findOne({
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
  return AdmitCardInfo;
}

module.exports = admitcardInfo;
