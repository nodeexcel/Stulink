function rankPredictor(database, type) {
  const RankPredictor = database.define(
    "rankpredictor",
    {
      steps: type.STRING(1000),
      process: type.STRING(1000),
      details: type.STRING(1000),
    },
    { timestamps: false }
  );
  RankPredictor.associate = (models) => {
    models.Exam.hasOne(RankPredictor, { foreignKey: "examId" });
    RankPredictor.belongsTo(models.Exam, { foreignKey: "examId" });
  };
  RankPredictor.addRankPredictorInfo = async (req) => {
    try {
      let result;
      if (Object.keys(req.body).length == 0) {
        result = {
          error: 1,
          message: "nothing to show",
        };
      } else {
        let data = await RankPredictor.create({
          steps: req.body.steps,
          process: req.body.process,
          details: req.body.details,
          examId: req.body.examId,
        });
        result = {
          error: 0,
          message: "rank predictor info added",
        };
      }
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };
  RankPredictor.getRankPredictorInfo = async (req) => {
    try {
      let data = await RankPredictor.findOne({
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
  return RankPredictor;
}

module.exports = rankPredictor;
