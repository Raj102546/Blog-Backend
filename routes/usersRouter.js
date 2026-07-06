const {Router} = require("express");
const userController = require("../controllers/usersController");
const userRouter = Router();

userRouter.post("/sign-up", userController.signUpPost);