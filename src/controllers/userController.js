const userService = require("../services/userService.js");

//get user
const getAllUser = async (req, res) => {
  console.log(req.user);
  let users = await userService.getAll();
  res.status(200).send(users);
};

//get by id
const getUserById = async (req, res) => {
  let id = req.params.id;
  const user = await userService.findById(id);
  res.status(200).send(user);
};

//create user
const createUser = async (req, res) => {
  let requestedData = {
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    is_active: true,
  };
  let user = await userService.create(requestedData);
  res.status(200).send(user);
};

//update user
const updateUser = async (req, res) => {
  let id = req.params.id;
  const user = await userService.update(id, req.body);
  console.log(user);
  if (user) {
    const updatedUser = await userService.findById(id);
    res.status(200).send(updatedUser);
  } else {
    // alert("asd");
    console.log("something went wrong!");
    res.status(200).send("something went wrong!");
  }
};

//delete user
const deleteUser = async (req, res) => {
  let id = req.params.id;
  await userService.destroy(id);
  res.status(200).send("User has been deleted!");
};

module.exports = {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
