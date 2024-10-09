const Jwt = require("jsonwebtoken");

const sessionJWT = (req, res, next) => {
  const user = req.userLogged;
  const token = Jwt.sign({ user }, process.env.TOKEN_SECRET, {
    expiresIn: "1d",
  });
  req.token = token;
  next();
};

module.exports = sessionJWT;
