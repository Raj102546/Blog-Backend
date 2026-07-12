const express = require('express');
const cors = require("cors");
const userRouter = require('./routes/usersRouter');
require('dotenv').config();
const commentRouter = require('./routes/commentsRouter');
const postsRouter = require('./routes/postsRouter');

const app = express();

app.use(cors({
    origin : process.env.FRONTEND_URL || "http://localhost:5173",
}));

app.use(express.json());
app.use("/", userRouter);
app.use("/", commentRouter);
app.use("/", postsRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> console.log("server is running:", PORT));