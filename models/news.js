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
      name: {
        type: type.STRING,
        allowNull: false,
      },
      topic: {
        type: type.STRING,
        allowNull: false,
      },
      about: {
        type: type.STRING,
        allowNull: false,
      },
    },
    { timestamps: true, updatedAt: false }
  );
  News.addlatestNews = async (req) => {
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
  News.getNews = async () => {
    try {
      let data = await News.findAll({});
      let result = {
        error: 0,
        message: "found data",
        data: data,
      };
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };
  return News;
}

module.exports = news;
