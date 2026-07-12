const pool = require("./pool");

exports.getComments = async (postId) => {
  const { rows } = await pool.query(
    "SELECT comments.id, comments.content, comments.created_at, users.username FROM comments JOIN users ON comments.user_id = users.id WHERE post_id = $1",
    [postId],
  );
  return rows;
};

exports.addComments = async ({ content, postId, userId }) => {
  const { rows } = await pool.query(
    "INSERT INTO comments (content, post_id, user_id) VALUES ($1, $2, $3) RETURNING*",
    [content, postId, userId],
  );
  return rows[0];
};

exports.editComment = async (id, { content, postId, userId }) => {
  await pool.query(
    "UPDATE comments SET content = $1, post_id = $2, user_id = $3 WHERE id = $4 ",
    [content, postId, userId, id],
  );
};

exports.deleteComment = async (id) => {
  await pool.query("DELETE FROM comments WHERE id = $1", [id]);
};
