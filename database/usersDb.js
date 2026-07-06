const pool = require("./pool");
const bcrypt = require("bcrypt");

exports.getUsers = async () => {
  const { rows } = await pool.query("SELECT * FROM users");
  return rows;
};

exports.getUser = async (id) => {
  const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return rows[0];
};

exports.signUp = async (data) => {
  try {
    const { firstName, lastName, username, email, password, role } = data;
    const hashed = await bcrypt.hash(password, 10);
    await pool.query(
      "INSERT INTO users (first_name, last_name, username, email, password, role) VALUES ($1, $2, $3, $4, $5, $6)",
      [firstName, lastName, username, email, hashed, role],
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
};

exports.editUser = async (id, data) => {
  const { firstName, lastName, username, email, role } = data;
  await pool.query(
    "UPDATE users SET first_name = $1, last_name = $2, username = $3, email = $4, role = $5 WHERE id = $6",
    [firstName, lastName, username, email, role, id],
  );
};
