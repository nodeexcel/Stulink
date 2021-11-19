function news(database, type) {
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
      category: type.STRING,
      related_links: type.STRING,
    },
    { timestamps: true, updatedAt: false }
  );

  News.associate = (models) => {
    models.UserProfile.hasMany(News, {
      foriegnKey: "profileId",
    });
  };

  News.addlatestNews = async (req) => {
    try {
      let result;
      let data = req.file.path;
      let uploadedImage = await cloudinary.v2.uploader.upload(data);
      let image = {
        image: uploadedImage.secure_url,
        name: req.body.name,
        topic: req.body.topic,
        about: req.body.about,
        category: req.body.category,
        related_links: req.body.links,
      };
      let createdImage = await News.create(image);
      if (createdImage) {
        result = {
          error: 0,
          message: "created",
          data: createdImage,
        };
      } else {
        result = {
          error: 1,
          message: "not created",
        };
      }
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };

  News.getNews = async () => {
    try {
      let result;
      let data = await News.findAll({});
      if (data.length > 0) {
        result = {
          error: 0,
          message: "found data",
          data: data,
        };
      } else {
        result = {
          error: 1,
          message: "no data found",
        };
      }
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };

  News.getNewsById = async (req) => {
    try {
      let news = await News.findOne({ where: { id: req.body.id } });
      let result;
      if (news !== null) {
        result = {
          error: 0,
          data: news,
        };
      } else {
        result = {
          error: 1,
          message: "no news to show",
        };
      }
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };
  return News;
}

module.exports = news;
