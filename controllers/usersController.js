const usersDb = require("../database/usersDb");
const { body, validationResult, matchedData } = require("express-validator");

const validator = [
  body("firstName").trim().isAlpha(),
  body("lastName"),
  body("username"),
  body("email"),
  body("password"),
  body("role"),
];

exports.getAllUser = async (req, res) => {
  res.json({ users: await usersDb.getUsers() });
};

exports.signUpPost = [
  validator,
  async (req, res) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        console.log(error);
        return res.sendStatus(400);
    }
    const { firstName, lastName, username, email, password, role } = req.body;
    await usersDb.signUp({
      firstName,
      lastName,
      username,
      email,
      password,
      role,
    });
    res.redirect("/");
  },
];
