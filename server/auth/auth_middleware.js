require("dotenv").config({path: '../.env'});
const jwt = require("jsonwebtoken");

function apiKeyMiddleware(req, res, next) {
  console.info("checking api key...");

  const apiKey = req.headers['api-key']
  if (apiKey && apiKey !== process.env.REACT_APP_API_KEY) {
    console.info("api key doesnt match/api key doesnt exist");
    return res.status(401).send({Error: 'api key not valid'});
  } else {
    console.info("api-key verified")
    next();
  }
}

function jwtMiddleware(req, res, next) {
  //todo: middleware to check jwt against secret key in .env file
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    console.info("no jwt in header")
    return res.sendStatus(401); //no token is present
  } else {
    jwt.verify(token, process.env.JWT_SECKEY, (err, user) => {
      if (err) {
        console.info(`jwt coudn't be verified.`)
        return res.sendStatus(403); //token couldn't be verified
      }

      req.user = user; //attaching the payload to req object
      console.info(`jwt is verified!`)
      next();
    });
  }
}

module.exports = { apiKeyMiddleware, jwtMiddleware };
