const User = require("./users/users");
const College = require("./college/college");
const Course = require("./course/courses");
const News = require("./news");
const Jobs = require("./jobs/jobs");
const States = require("./states");
const UserProfile = require("./users/userProfile");
const Post = require("./posts");
const Topic = require("./topic");
const Token = require("./token");
const Friend = require("./friends");
const Comment = require("./comments");
const Gallery = require("./gallery");
const FriendRequest = require("./friendRequest");
const UserPrivacy = require("./users/userPrivacy");
const UserSettings = require("./users/usersettings");
const City = require("./city");
const Ratings = require("./college/ratings");
const Review = require("./reviews");
const Exam = require("./exams/exam");
const Branch = require("./course/branch");
const Overview = require("./course/overview");
const JobDetail = require("./jobs/jobDetails");
const ExamOverview = require("./exams/examOverview");
const ApplicationGuidelines = require("./exams/applicationGuidlines");
const RegistrationInfo = require("./exams/registrationInfo");
const Syllabus = require("./exams/syllabus");
const MockTest = require("./exams/mockTest");
const AdmitCardInfo = require("./exams/admitCardInfo");
const RankPredictor = require("./exams/rankPredictor");
const CutOffInfo = require("./exams/cutOff");
const AdmissionInfo = require("./college/admissionInfo");

module.exports = {
  AdmissionInfo,
  CutOffInfo,
  RankPredictor,
  AdmitCardInfo,
  MockTest,
  Syllabus,
  RegistrationInfo,
  ApplicationGuidelines,
  ExamOverview,
  JobDetail,
  Overview,
  Branch,
  Exam,
  Review,
  Ratings,
  City,
  User,
  College,
  Course,
  News,
  Jobs,
  States,
  UserProfile,
  Post,
  Topic,
  Token,
  Friend,
  Comment,
  Gallery,
  FriendRequest,
  UserPrivacy,
  UserSettings,
};
