function mockTest(database, type) {
  const MockTest = database.define(
    "mocktest",
    {
      mockTestDetail: {
        type: type.STRING(5000),
        allowNull: false,
      },
    },
    { timestamps: false }
  );

  MockTest.associate = (models) => {
    models.Exam.hasOne(MockTest, { foreignKey: "examId" });
    MockTest.belongsTo(models.Exam, { foreignKey: "examId" });
  };

  MockTest.addMocktestInfoData = async (req) => {
    try {
      let result;
      if (Object.keys(req.body).length == 0) {
        result = {
          error: 0,
          message: "nothing to add",
        };
      } else {
        let data = await MockTest.create({
          mockTestDetail: req.body.mockTestDetail,
          examId: req.body.examId,
        });
        result = {
          error: 0,
          message: "mock test info added",
        };
      }

      return result;
    } catch (error) {
      throw new Error(error);
    }
  };

  MockTest.getmocktestinfoData = async (req) => {
    try {
      let data = await MockTest.findOne({ where: { examId: req.body.examId } });
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
  return MockTest;
}

module.exports = mockTest;
