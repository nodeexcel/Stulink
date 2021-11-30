function registrationInfo(database, type) {
  const RegistrationInfo = database.define(
    "registrationinfo",
    {
      eligibility: type.STRING(2000),
      documents: type.STRING(2000),
      registrationFee: type.STRING(1000),
      form_correction: type.STRING(2000),
    },
    { timestamps: false }
  );
  RegistrationInfo.associate = (models) => {
    models.Exam.hasOne(RegistrationInfo, { foreignKey: "examId" });
    RegistrationInfo.belongsTo(models.Exam, { foreignKey: "examId" });
  };
  RegistrationInfo.addRegistrationInfoData = async (req) => {
    try {
      let data = await RegistrationInfo.create({
        eligibility: req.body.eligibility,
        documents: req.body.documents,
        registrationFee: req.body.registrationFee,
        form_correction: req.body.form_correction,
        examId: req.body.examId,
      });
      let result = {
        error: 0,
        message: "registration info added",
      };
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };
  RegistrationInfo.getRegistrationInfoData = async (req, models) => {
    try {
      let data = await RegistrationInfo.findOne({
        where: { examId: req.body.examId },
        include: {
          model: models.Exam,
          attributes: ["name"],
          include: {
            model: models.ApplicationGuidelines,
            attributes: ["registrationDetail"]
          },
        },
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
  return RegistrationInfo;
}

module.exports = registrationInfo;
