const db = require("../db");
const { response } = require("../utils");
let addNewsData = async (req, res) => {
  try {
    let result = await db.News.addlatestNews(req);
    res.status(200).send(response(result.error, result.message, result.data));
  } catch (error) {
    res.status(500).send(response(1, error.message));
  }
};

let getNewsData = async(req,res) =>{
  try {
    let result = await db.News.getNews();
    res.status(200).send(response(result.error, result.message, result.data));
  } catch (error) {
    res.status(500).send(response(1,error.message));
  }
}

module.exports = { addNewsData,getNewsData };