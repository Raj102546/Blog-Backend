const postsController = require("../controllers/postsController");
const { Router } = require("express");
const extractToken = require("../middlewares/extractToken");
const verifyToken = require("../middlewares/tokenVerify");
const checkRole = require("../middlewares/checkRole");
const postsRouter = Router();

postsRouter.get("/posts", postsController.getAllPosts);
postsRouter.post(
  "/newPosts",
  extractToken,
  verifyToken,
  checkRole("author"),
  postsController.createPostPost,
);

module.exports = postsRouter;
