function userprofile(database, type) {
  const { Op,col } = require("sequelize");
  const cloudinary = require("cloudinary");
  const UserProfile = database.define(
    "userprofile",
    {
      image: {
        type: type.STRING,
      },
      email: {
        type: type.STRING,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      username: {
        type: type.STRING,
        unique: true,
      },
      state: type.STRING,
      university: type.STRING,
      date_of_birth: type.STRING,
      bio: type.STRING,
    },
    { timestamps: false }
  );

  UserProfile.associate = (models) => {
    models.User.hasOne(UserProfile, {
      foreignKey: "userId",
    });
  };

  UserProfile.addedData = async (req, models) => {
    try {
      let result;
      let user = req.user;
      let image = req.file.path;
      let uploadedImage = await cloudinary.v2.uploader.upload(image);
      let userData = await models.User.findOne({ where: { id: user.user_id } });
      let email;
      if (userData.email == null) {
        email = req.body.email;
      } else {
        email = userData.email;
      }
      let data = {
        image: uploadedImage.secure_url,
        email: email,
        username: userData.username,
        state: req.body.state,
        university: req.body.university,
        date_of_birth: req.body.dob,
        bio: req.body.bio,
        userId: userData.id,
      };
      let createdProfile = await UserProfile.create(data);
      if (createdProfile) {
        result = {
          error: 0,
          message: "userprofile created",
          data: createdProfile,
        };
      } else {
        result = {
          error: 1,
          message: "creation failed",
        };
      }
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };

  UserProfile.getProfile = async (req, models) => {
    try {
      let user = req.user;
      let result = await UserProfile.findOne({
        where: { userId: user.user_id },
        include: [
          {
            model: models.Topic,
            attributes: ["name"],
            where: { userId: { [Op.col]: "userprofile.id" } },
          },
        ],
      });
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };
  return UserProfile;
}

module.exports = userprofile;
