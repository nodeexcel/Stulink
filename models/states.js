function states(database, type) {
  const { fn, col } = require("sequelize");
  const cloudinary = require("cloudinary");
  const State = database.define(
    "state",
    {
      name: {
        type: type.STRING,
        allowNull: false,
      },
      image: {
        type: type.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
  State.associate = (models) => {
   State.hasMany(models.City, {foreignKey:"stateId"})
  }
  State.addStates = async (req) => {
    try {
      let data = req.file.path;
      let uploadedImage = await cloudinary.v2.uploader.upload(data);
      let image = {
        image: uploadedImage.secure_url,
        name: req.body.name,
      };
      let createdImage = await State.create(image);
      let result = {
        error: 0,
        message: "created",
        data: createdImage,
      };
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };
  State.getStates = async (models) => {
    try {
      let foundState = await State.findAll({
        attributes: {
          include: [[fn("COUNT", col("jobs.id")), "jobsCount"]],
        },
        include: [
          {
            model: models.Jobs,
            attributes: [],
          },
        ],
        group: ["state.id"],
      });
      let result = {
        error: 0,
        message: "found data",
        data: foundState,
      };
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };
  return State;
}

module.exports = states;
