const postsDb = require("../database/postsDb");

exports.getAllPosts = async (req, res) => {
  console.log(postsDb.getAllPosts())
  res.json({ posts: await postsDb.getAllPosts() });
};
exports.createPostPost = async (req, res) => {
  const { title, content } = req.body;
  console.log(title)
  const newPost = await postsDb.createPost({ title, content });
  console.log(newPost)
  res.json({message: "Post Created", post: newPost});
};
