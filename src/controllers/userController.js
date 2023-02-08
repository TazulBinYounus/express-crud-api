const db = require("../models");

//create main model

const User = db.users;

//get user
const getAllUser = async (req, res) => {
  let users = await User.findAll();
  res.status(200).send(users);
};

//get by id
const getUserById = async (req, res) => {
  let id = req.params.id;
  let users = await User.findOne({ where: { id: id } });
  res.status(200).send(users);
};

//create user
const createUser = async (req, res) => {
  console.log(req.body);
  let requestedData = {
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    is_active: true,
  };
  let user = await User.create(requestedData);
  res.status(200).send(user);
};

//update user
const updateUser = async (req, res) => {
  let id = req.params.id;
  const user = await User.update(req.body, { where: { id: id } });
  res.status(200).send(user);
};

//delete user
const deleteUser = async (req, res) => {
  let id = req.params.id;
  await User.destroy({ where: { id: id } });
  res.status(200).send("User has been deleted!");
};

module.exports = {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
