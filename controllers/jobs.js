const db = require("../db");
const { response } = require("../utils");
let addJobsData = async (req, res) => {
  try {
    let result = await db.Jobs.addJobs(req);
    res.status(200).send(response(result.error, result.message, result.data));
  } catch (error) {
    res.status(500).send(response(1, error.message));
  }
};

let getJobs = async (req, res) => {
  try {
    let result = await db.Jobs.getAllJobs(req, db);
    res.status(200).send(response(result.error, result.message, result.data));
  } catch (error) {
    res.status(500).send(response(1, error.message));
  }
};

let addJobDetail = async (req, res) => {
  try {
    let result = await db.JobDetail.addJobDataDetail(req, db);
    res.status(200).send(response(result.error, result.message, result.data));
  } catch (error) {
    res.status(500).send(response(1, error.message));
  }
};
let getJobDetail = async (req, res) => {
  try {
    let result = await db.JobDetail.getJobDataDetail(req, db);
    res.status(200).send(response(result.error, result.message, result.data));
  } catch (error) {
    res.status(500).send(response(1, error.message));
  }
};

module.exports = { addJobsData, getJobs, addJobDetail,getJobDetail };
