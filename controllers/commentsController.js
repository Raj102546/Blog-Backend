const commentsDb = require("../database/commentsDb");

exports.addCommentPost = async (req, res) => {
  const comment = req.body;
  await commentsDb.addComments({ comment });
};
