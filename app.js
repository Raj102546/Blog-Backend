const express = require('express');
const cors = require("cors");
require('dotenv').config()
const app = express();

app.use(cors({
    origin : "http://localhost:5173/",
}))
app.use(express.json());

app.get('/blog', (req, res) => {
    res.send("hwqhdwuhd");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> console.log("server is running:", PORT));