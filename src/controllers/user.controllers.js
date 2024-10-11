const catchError = require("../utils/catchError");
const {
  getAllServices,
  createServices,
  getOneServices,
  removeServices,
  updateServices,
  isVerifiedServices,
  getUserByEmail,
} = require("../services/user.services");
const {
  getUserByCode,
  removeCodeServices,
} = require("../services/emailCode.services");

const getAll = catchError(async (req, res) => {
  const results = await getAllServices();
  return res.json(results);
});

const create = catchError(async (req, res, next) => {
  const result = await createServices({
    ...req.body,
    password: req.hashPassword,
  });
  req.result = result;
  next();
});

const getOne = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await getOneServices(id);
  if (!result) return res.sendStatus(404);
  return res.json(result);
});

const remove = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await removeServices(id);
  if (!result) return res.sendStatus(404);
  return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
  const { id } = req.params;
  const fieldToDelete = ["password", "email", "isVerified"];
  fieldToDelete.forEach((field) => {
    delete req.body[field];
  });

  const result = await updateServices(req.body, id);
  if (result[0] === 0) return res.sendStatus(404);
  return res.json(result[1][0]);
});

const login = catchError(async (req, res) => {
  const user = req.userLogged;
  const token = req.token;
  return res.json({ user, token });
});

const logged = catchError(async (req, res) => {
  return res.json(req.user);
});

const userVerified = catchError(async (req, res) => {
  const { code } = req.params;
  if (!code) return res.sendStatus(401);

  const record = await getUserByCode(code);
  const { result, user } = record;
  if (!user) return res.sendStatus(401);

  await isVerifiedServices(user.id);
  await removeCodeServices(result);
  return res.json({ message: "User Verified!" });
});

const forgotPassword = catchError(async (req, res, next) => {
  const { frontBaseUrl, email } = req.body;
  const user = await getUserByEmail(email);
  if (!user) return res.sendStatus(401);
  const { id, firstName } = user;
  const box = { frontBaseUrl, email, id, firstName };
  req.box = box;
  next();
});

const resetPassword = catchError(async (req, res) => {
  const { code } = req.params;

  const record = await getUserByCode(code);
  const { result, user } = record;
  if (!result || !user) return res.sendStatus(401);
  const { id } = user;

  await updateServices({ password: req.hashPassword }, id);
  await removeCodeServices(result);
  return res.json({ message: "Password Updated" });
});

module.exports = {
  getAll,
  create,
  getOne,
  remove,
  update,
  login,
  logged,
  userVerified,
  forgotPassword,
  resetPassword,
};
