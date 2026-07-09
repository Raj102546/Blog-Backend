const jwt = require("jsonwebtoken");
const commentsDb = require("../database/commentsDb");

exports.addCommentPost = async (req, res) => {
  res.json({
    message: "comment added",
    authData: req.authData,
  });
};
