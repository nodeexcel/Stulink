function cutOffInfo(database, type) {
  const CutOffInfo = database.define(
    "cuttoffinfo",
    {
      cutOff: type.STRING(1000),
      expectedCutoff: type.STRING(1000),
      factors: type.STRING(1000),
      expectedCutoffDate: type.STRING(1000),
      tipsForCutoff: type.STRING(1000),
    },
    { timestamps: false }
  );
  CutOffInfo.associate = (models) => {
    models.Exam.hasOne(CutOffInfo, { foreignKey: "examId" });
    CutOffInfo.belongsTo(models.Exam, { foreignKey: "examId" });
  };

  CutOffInfo.addCutOffInfoData = async (req) => {
    try {
      let result;
      if (Object.keys(req.body).length == 0) {
        result = {
          error: 1,
          message: "nothing to add",
        };
      } else {
        let data = await CutOffInfo.create({
          cutOff: req.body.cutOff,
          expectedCutoff: req.body.expectedCutoff,
          factors: req.body.factors,
          expectedCutoffDate: req.body.expectedCutoffDate,
          tipsFroCutoff: req.body.tipsFroCutoff,
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
  CutOffInfo.getCutOffInfoData = async (req) => {
    try {
      let data = await CutOffInfo.findOne({
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
  return CutOffInfo;
}

module.exports = cutOffInfo;
