function jobs(database, type) {
  const Job = database.define(
    "job",
    {
      name: {
        type: type.STRING,
        allowNull: false,
      },
      description: {
        type: type.STRING,
        allowNull: false,
      },
      qualification: type.STRING,
      designation: type.STRING,
    },
    { timestamps: false }
  );
  Job.associate = (models) => {
    models.States.hasMany(Job, { foreignKey: "stateId" });
    Job.belongsTo(models.States, { foreignKey: "stateId" });
  };
  Job.addJobs = async (req) => {
    try {
      let jobs = await Job.create({
        name: req.body.name,
        description: req.body.description,
        stateId: req.body.stateId,
        qualification: req.body.qualification,
        designation: req.body.designation,
      });
      let result = {
        error: 0,
        message: "created",
        data: jobs,
      };
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };

  Job.getAllJobs = async (req, models) => {
    try {
      let data = await Job.findAll({include:{
        model: models.States,
        attributes: ["name"],
      }});
      let result;
      if (data.length > 0) {
        result = {
          error: 0,
          data: data,
        };
      } else {
        result = {
          error: 1,
          message: "nothing to show",
        };
      }
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };
  return Job;
}

module.exports = jobs;
