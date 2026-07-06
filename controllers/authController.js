const jwt = require("jsonwebtoken");
const usersDb = require("../database/usersDb");
const bcrypt = require("bcrypt");

exports.userLoginPost = async (req, res) => {
  const { username, password } = req.body;
  const user = await usersDb.getUserByUsername(username);
  if (!user) {
    return res.sendStatus(401);
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.sendStatus(401);
  }
  const payload = {
    id: user.id,
    role: user.role,
  };
  jwt.sign(payload, process.env.PRIVATE_KEY, (error, token) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json({ token });
  });
};
