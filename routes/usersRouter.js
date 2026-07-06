const {Router} = require("express");
const userController = require("../controllers/usersController");
const authController = require("../controllers/authController");
const userRouter = Router();

userRouter.post("/sign-up", userController.signUpPost);
userRouter.post("/login", authController.userLoginPost);

module.exports = userRouter;