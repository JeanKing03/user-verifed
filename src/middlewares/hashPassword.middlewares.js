const bcrypt = require("bcrypt");

async function hashPassword(req, res, next) {
  const { password } = req.body;
  if (!password)
    return res.status(404).json({ message: "You Need To Write A Password" });
  const hashPassword = await bcrypt.hash(password, 10);

  req.hashPassword = hashPassword;
  next();
}

module.exports = hashPassword;
