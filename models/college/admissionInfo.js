function addmissionInfo(database, type) {
  const AdmissionInfo = database.define(
    "admissioninfo",
    {},
    { timestamps: false }
  );
  AdmissionInfo.associate = (models) => {
    models.College.hasMany(AdmissionInfo, { foreignKey: "collegeId" });
    AdmissionInfo.belongsTo(models.College, { foreignKey: "collegeId" });
  };

  

  return AdmissionInfo;
}

module.exports = addmissionInfo;
