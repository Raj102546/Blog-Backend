const commentsController = require("../controllers/commentsController");
const { Router } = require("express");
const verifyToken = require("../middlewares/tokenVerify")
const commentRouter = Router();

commentRouter.post("/comments", verifyToken, commentsController.addCommentPost);

module.exports = commentRouter;
