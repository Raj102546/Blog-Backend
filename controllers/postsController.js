const postsDb = require("../database/postsDb");
const { body, validationResult, matchedData } = require("express-validator");

const validator = [
  body("title").trim(),
  body("content"),
  body("published").isBoolean(),
];

exports.getAllPosts = async (req, res) => {
  console.log(postsDb.getAllPosts());
  res.json({ posts: await postsDb.getAllPosts() });
};
exports.getPost = async (req, res) => {
  res.json({ post: await postsDb.getPost(req.param.id) });
};
exports.createPostPost = [
  validator,
  async (req, res) => {
    try {
      const error = await validationResult(req);
      if (!error.isEmpty()) {
        res.status(401).json({ error: error.message });
      }
      const { title, content, published } = req.body;
      const authorId = req.authData.id;
      console.log(title, content, published);
      const newPost = await postsDb.createPost({ title, content, published, authorId });
      console.log("new post", newPost);
      res.json({ message: "Post Created", post: newPost });
    } catch ({ error }) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  },
];

exports.editPostPost = [
  validator,
  async (req, res) => {
    try {
      const error = await validationResult(req);
      if (!error.isEmpty()) {
        res.status(401).json({ error: error.message });
      }
      const { title, content, published } = matchedData(req);
      await postsDb.editPost(req.params.id, { title, content, published });
      res.json({ message: "Post Updated" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
];

exports.deletePostPost = async (req, res) => {
  await postsDb.deletePost(req.params.id);
  res.json({message: "Post deleted"});
};
