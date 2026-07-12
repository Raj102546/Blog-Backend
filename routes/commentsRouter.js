const commentsController = require("../controllers/commentsController");
const { Router } = require("express");
const verifyToken = require("../middlewares/tokenVerify");
const extractToken = require("../middlewares/extractToken");
const commentRouter = Router();

commentRouter.get("/posts/:id/comments", commentsController.getComments);
commentRouter.post(
  "/posts/:id/newComments",
  extractToken,
  verifyToken,
  commentsController.addCommentPost,
);
commentRouter.post("/:id/editComment", commentsController.editCommentPost);
commentRouter.delete("/posts/:id/deleteComment", commentsController.deleteCommentPost);

module.exports = commentRouter;
