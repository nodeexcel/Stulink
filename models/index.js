const User = require("./users/users");
const College = require("./college");
const Course = require("./course/courses");
const News = require("./news");
const Jobs = require("./jobs");
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
const Ratings = require("./ratings");
const Review = require("./reviews");
const Exam = require("./exam");
const Branch = require("./course/branch")
const Overview = require("./course/overview")

module.exports = {
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
