const User = require("../models/User");

const createServices = async (body) => {
  return await User.create(body);
};
const getAllServices = async () => {
  return await User.findAll();
};
const getOneServices = async (id) => {
  return await User.findByPk(id);
};
const updateServices = async (body, id) => {
  return await User.update(body, { where: { id }, returning: true });
};
const removeServices = async (id) => {
  return await User.destroy({ where: { id } });
};

const isVerifiedServices = async (id) => {
  return await User.update({ isVerified: true }, { where: { id } });
};

module.exports = {
  createServices,
  getAllServices,
  getOneServices,
  updateServices,
  removeServices,
  isVerifiedServices,
};
