const usersDb = require("../database/usersDb");
const { body, validationResult, matchedData } = require("express-validator");

const validator = [
  body("firstName").trim().notEmpty().isAlpha(),
  body("lastName").trim().notEmpty().isAlpha(),
  body("username").trim().notEmpty().isAlphanumeric(),
  body("email").trim().isEmail().normalizeEmail(),
  body("password"),
  body("confirmPass").custom((value, {req})=>{
    if(value !== req.body.password){
      throw new Error("Password do not match, please enter it again!")
    }
    return true;
  }),
  body("role").isIn(['user', 'author']).withMessage("Invalid role"),
];

exports.getAllUser = async (req, res) => {
  res.json({ users: await usersDb.getUsers() });
};

exports.signUpPost = [
  validator,
  async (req, res) => {
    try{
      const error = validationResult(req);
      if(!error.isEmpty()){
          console.log(error);
          return res.sendStatus(400);
      }
      const { firstName, lastName, username, email, password, role } = req.body;
      console.log(req.body);
      await usersDb.signUp({
        firstName,
        lastName,
        username,
        email,
        password,
        role,
      });
      res.json({message: "Account has been created successfully!"});
    }catch(error){
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  },
];
