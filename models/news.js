function news(database, type) {
  // const fs = require("fs");
  const cloudinary = require("cloudinary");
  const News = database.define(
    "news",
    {
      image: {
        type: type.STRING,
        allowNull: false,
      },
        //   date: {
        //     type: type.INTEGER,
        //   },
      name: {
        type: type.STRING,
        allowNull: false,
        //   unique: true,
      },
      topic: {
        type: type.STRING,
        allowNull: false,
      },
      about: {
        type: type.STRING,
        allowNull: false,
      },
    },{ timestamps: true, updatedAt: false }
  );
  News.latestNews = async (req) => {
    try {
      let data = req.file.path;
      let uploadedImage = await cloudinary.v2.uploader.upload(data);
      let image = {
        image: uploadedImage.secure_url,
        name: req.body.name,
        topic: req.body.topic,
        about: req.body.about,
      };
      let createdImage = await News.create(image);
    //   console.log(createdImage.createdAt);
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
  return News;
}

module.exports = news;
