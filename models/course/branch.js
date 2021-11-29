function branch(database, type) {
  const Branch = database.define(
    "branch",
    {
      branchName: type.STRING,
      elibilityCriteria: type.STRING,
      regularOrNot: type.STRING,
      courseLength: type.STRING,
      medianIncome: type.STRING,
    },
    {
      timestamps: false,
    }
  );
  Branch.associate = (models) => {
    models.Course.hasMany(Branch, { foreignKey: "courseId" });
    Branch.belongsTo(models.Course, { foreignKey: "courseId" });
  };

  Branch.addBranch = async (req) => {
    try {
      let data = await Branch.create({
        branchName: req.body.branchName,
        elibilityCriteria: req.body.elibilityCriteria,
        regularOrNot: req.body.regularOrNot,
        courseLength: req.body.courseLength,
        medianIncome: req.body.medianIncome,
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
          message: "error while adding Branch",
        };
      }
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };

  Branch.getTopCourseBranch = async (req) => {
    try {
      let data = await Branch.findAll({ where: { courseId: req.body.courseId } });
    //   console.log(data);
      let result;
      if (data.length > 0) {
        result = {
          error: 0,
          data: data,
        };
      } else {
        result = {
          error: 0,
          message: "nothing to show",
        };
      }
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };
  return Branch;
}

module.exports = branch;
