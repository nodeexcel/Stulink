// function collegeCourse(database, type, models) {
// //   const { fn, col } = require("sequelize");
//   const CollegeCourse = database.define(
//     "collegecourse",
//     {
//       courseId: {
//         type: type.INTEGER,
//         allowNull: false,
//         references: {
//           model: "courses",
//           key: "id",
//         },
//       },
//       collegeId: {
//         type: type.INTEGER,
//         allowNull: false,
//         references: {
//           model: "colleges",
//           key: "id",
//         },
//       },
//     },
//     { timestamps: false }
//   );
//   CollegeCourse.assignCourseData = async (req) => {
//     try {
//       let assignedData = await CollegeCourse.create({
//         courseId: req.body.courseId,
//         collegeId: req.body.collegeId,
//       });
//       let result = {
//         error: 0,
//         message: "course assigned",
//         data: assignedData,
//       };
//       return result;
//     } catch (error) {
//       console.log(error);
//       throw new Error(error);
//     }
//   };
// //   CollegeCourse.courseData = async (models) => {
// //     try {
// //       let foundCourse = await CollegeCourse.findAll({
// //         attributes: {
// //           include: [[fn("COUNT", col("colleges.id")), "collegeCount"]],
// //         },
// //         include: [
// //           {
// //             model: models.College,
// //             attributes: [],
// //           },
// //         ],
// //         group: ["course.id"],
// //       });
// //       let result = {
// //         error: 0,
// //         message: "found data",
// //         data: foundCourse,
// //       };
// //       return result;
// //     } catch (error) {
// //       console.log(error);
// //       throw new Error(error);
// //     }
// //   };

//   return CollegeCourse;
// }

// module.exports = collegeCourse;


let foundCourse = await Courses.findAll({
    attributes:["name"],
    include: [
      {
        model: models.College,
        attributes: {
          include: [[fn("COUNT", col("colleges.id")), "collegeCount"]],
        },
      },
    ],
    group: ["course.id", "colleges.id"],
  });