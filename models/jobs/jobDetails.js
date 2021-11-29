function jobDetail(database, type) {
  const JobDetail = database.define(
    "jobdetail",
    {
      importantDate: type.STRING,
      applicationFee: type.STRING,
      ageLimit: type.STRING,
      qualification: type.STRING(1000),
      vacancyDetails: type.STRING(1000),
      howToApply: type.STRING(1000),
    },
    { timestamps: false }
  );

  JobDetail.associate = (models) => {
    models.Jobs.hasMany(JobDetail, { foreignKey: "jobId" });
    JobDetail.belongsTo(models.Jobs, { foreignKey: "jobId" });
  };

  JobDetail.addJobDataDetail = async (req) => {
    try {
      let data = await JobDetail.create({
        importantDate: req.body.importantDate,
        applicationFee: req.body.applicationFee,
        ageLimit: req.body.ageLimit,
        qualification: req.body.qualification,
        vacancyDetails: req.body.vacancyDetails,
        howToApply: req.body.howToApply,
        jobId: req.body.jobId,
      });
      let result;
      if (data) {
        result = {
          error: 0,
          message: "added Jobs details",
        };
      } else {
        result = {
          error: 1,
          message: "error while adding jobs details",
        };
      }
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };

  JobDetail.getJobDataDetail = async (req) => {
    try {
      let data = await JobDetail.findAll({ where: { jobId: req.body.jobId } });
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

  return JobDetail;
}

module.exports = jobDetail;
