const jwt = require("jsonwebtoken");
const commentsDb = require("../database/commentsDb");
const { body, validationResult, matchedData } = require("express-validator");

const validator = [body("content")];

exports.getComments = async (req, res) => {
  res.json({ comments: await commentsDb.getComments(req.params.id) });
};

exports.addCommentPost = [
  validator,
  async (req, res) => {
    try {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        return res.status(401).json({ error: error.message });
      }
      const { content, postId } = req.body;
      const userId = req.authData.id;
      const newComment = await commentsDb.addComments({ content, postId, userId });
      console.log(newComment)
      res.json({
        message: "comment added",
        comment: newComment,
      });
    } catch (error) {
      return res.json({ error: error.message });
    }
  },
];

exports.editCommentPost = [
  validator,
  async (req, res) => {
    try{
      const error = validationResult(req);
      if (!error.isEmpty()) {
        res.status(401).json({ error: error.message });
      } 
      const {content} = matchedData(req);
      await commentsDb.editComment(req.params.id, {content});
      res.json({message: "Comment Updated"})
    }catch(error){
      res.json({ error: error.message });
    }
 }
] 

exports.deleteCommentPost = async(req, res) => {
  const {commentId} = req.body;
  await commentsDb.deleteComment(commentId);
  console.log(commentId)
  res.json({message : "Comment deleted"})
}
