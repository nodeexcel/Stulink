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
    },
    { timestamps: false }
  );
  Job.associate = (models) => {
    models.States.hasMany(Job, {
      foreignKey: "stateId",
    });
  };
  Job.addJobs = async (req) => {
    try {
      let jobs = await Job.create({
        name: req.body.name,
        description: req.body.description,
        stateId: req.body.stateId,
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
  return Job;
}

module.exports = jobs;
