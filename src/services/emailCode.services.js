const EmailCode = require("../models/EmailCode");
const User = require("../models/User");

const createServices = async (body) => {
  return await EmailCode.create(body);
};

const getUserByCode = async (code) => {
  const result = await EmailCode.findOne({ where: { code } });
  const user = await User.findByPk(result.userId);
  return { result, user };
};

const removeCodeServices = async (row) => {
  const { id } = row;
  return EmailCode.destroy({ where: { id } });
};

module.exports = { createServices, getUserByCode, removeCodeServices };
