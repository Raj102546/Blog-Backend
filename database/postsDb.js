const pool = require("./pool");

exports.getAllPosts = async () => {
  const { rows } = await pool.query("SELECT * FROM posts");
  return rows;
};

exports.getPost = async (id) => {
  const { rows } = await pool.query("SELECT * FROM posts WHERE id = $1", [id]);
  return rows[0];
};

exports.createPost = async ({ title, content, published, authorId }) => {
  const { rows } = await pool.query(
    "INSERT INTO posts (title, content, published, author_id) VALUES ($1, $2, $3, $4) RETURNING*",
    [title, content, published, authorId],
  );
  return rows[0];
};

exports.editPost = async (id, { title, content, published }) => {
  await pool.query(
    "UPDATE posts SET title = $1, content = $2, published = $3 WHERE id = $4",
    [title, content, published, id],
  );
};

exports.deletePost = async (id) => {
  await pool.query("DELETE FROM posts WHERE id = $1", [id]);
};
