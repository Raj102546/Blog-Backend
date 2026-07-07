const jwt = require("jsonwebtoken");
const commentsDb = require("../database/commentsDb");

exports.addCommentPost = async (req, res) => {
  jwt.verify(req.token, process.env.PRIVATE_KEY, (error, authData) => {
    if (error) {
      res.status(401).json({ error: error });
    }
    res.json({
      message: "comment added",
      authData,
    });
  });
};
