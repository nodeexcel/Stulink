// const db = require("../db");
// const { response } = require("../utils");

// let assignCourseToCollege = async (req, res) => {
//   try {
//     let result = await db.CollegeCourse.assignCourseData(req);
//     res.status(200).send(response(result.error, result.message, result.data));
//   } catch (error) {
//     res.status(500).send(response(1, error.message));
//   }
// };
// // let getCount = async (req, res) => {
// //   try {
// //     let result = await db.CollegeCourse.courseData(db);
// //     res.status(200).send(response(result.error, result.message, result.data));
// //   } catch (error) {
// //     res.status(500).send(response(1, error.message));
// //   }
// // };

// module.exports = { assignCourseToCollege, }
//     // getCount };
