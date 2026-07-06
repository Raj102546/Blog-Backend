const pool = require("./pool");

exports.getComments = async () => {
  const { rows } = await pool.query("SELECT * FROM comments");
  return rows;
};

exports.addComments = async (content) => {
  await pool.query("INSERT INTO comments (content) VALUES ($1)", [content]);
};
