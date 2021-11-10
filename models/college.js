function college(database, type) {
  const fs = require("fs");
  const cloudinary = require("cloudinary");
  const College = database.define(
    "colleges",
    {
      image: {
        type: type.STRING,
        allowNull: false,
      },
      rating: {
        type: type.INTEGER,
      },
      name: {
        type: type.STRING,
        unique: true,
      },
      place: {
        type: type.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
  College.trending = async (req) => {
    try {
      // let img = fs.readFileSync(req.file.path);
      // let encoded_image = img.toString("base64");
      let data = req.file.path;
      let uploadedImage = await cloudinary.v2.uploader.upload(data);
      let image = {
        // image: Buffer.from(encoded_image, "base64"),
        image: uploadedImage.secure_url,
        name: req.body.name,
        rating: req.body.rating,
        place: req.body.place,
      };
      let createdImage = await College.create(image);
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
//   College.getImage = async (req) => {
//     try {
//       let image = await College.findOne({ where: { id: req.body.imageId } });
//       let result;
//       if (image !== null) {
//         result = {
//           error: 0,
//           message: "image found",
//           data: image,
//         };
//       } else {
//         result = {
//           error: 0,
//           message: "image not found",
//         };
//       }
//       return result;
//     } catch (error) {
//       throw new Error(error);
//     }
//   };
  return College;
}

module.exports = college;
