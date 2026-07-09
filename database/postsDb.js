const pool = require("./pool");

exports.getAllPosts = async () => {
  const { rows } = await pool.query("SELECT * FROM posts");
  return rows;
};

exports.createPost = async ({ title, content }) => {
  await pool.query("INSERT INTO posts (title, content) VALUES ($1, $2)", [
    title,
    content,
  ]);
};
