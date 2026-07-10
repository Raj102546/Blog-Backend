const postsController = require("../controllers/postsController");
const { Router } = require("express");
const extractToken = require("../middlewares/extractToken");
const verifyToken = require("../middlewares/tokenVerify");
const checkRole = require("../middlewares/checkRole");
const postsRouter = Router();

postsRouter.get("/posts", postsController.getAllPosts);
postsRouter.get("/:id/post", postsController.getPost);
postsRouter.post(
  "/newPosts",
  extractToken,
  verifyToken,
  checkRole("author"),
  postsController.createPostPost,
);
postsRouter.post("/:id/editPost", postsController.editPostPost);
postsRouter.post("/:id/deletePost", postsController.deletePostPost);


module.exports = postsRouter;
