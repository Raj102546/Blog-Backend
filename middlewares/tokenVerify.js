const jwt = require("jsonwebtoken");

function verifyToken(req, res, next){
    jwt.verify(req.token, process.env.PRIVATE_KEY, (error, authData)=>{
        if(error){
            return res.status(401).json({ error: error.message });
        }
        req.authData = authData;
        next();
    })
}

module.exports = verifyToken;