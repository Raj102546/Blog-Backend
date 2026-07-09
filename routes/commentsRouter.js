const commentsController = require("../controllers/commentsController");
const { Router } = require("express");
const verifyToken = require("../middlewares/tokenVerify");
const extractToken = require("../middlewares/extractToken");
const commentRouter = Router();

commentRouter.post(
  "/comments",
  extractToken,
  verifyToken,
  commentsController.addCommentPost,
);

module.exports = commentRouter;
