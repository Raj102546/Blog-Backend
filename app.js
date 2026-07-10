const express = require('express');
const cors = require("cors");
const userRouter = require('./routes/usersRouter');
require('dotenv').config();
const commentRouter = require('./routes/commentsRouter');
const postsRouter = require('./routes/postsRouter');

const app = express();

app.use(cors({
    origin : "http://localhost:5173",
}));

app.use(express.json());
app.use("/blog", userRouter);
app.use("/blog", commentRouter);
app.use("/blog", postsRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> console.log("server is running:", PORT));