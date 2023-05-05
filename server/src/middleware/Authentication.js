require("dotenv").config();
const jwt = require("jsonwebtoken");

const Authentication = async (req, res, next) => {
    if(req.headers.authorization) {
        let token = req.headers.authorization.split(" ");
        let payLoad = await jwt.verify(token[1], process.env.SECRET); 
        req.payLoad = payLoad;
    } else {
        return res.status(401).json({status : "Failed", message : "Unauthorized"})
    }
    next();
}

module.exports = Authentication;