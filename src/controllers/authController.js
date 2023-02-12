const authService = require("../services/authService.js");
const userService = require("../services/userService.js");
const db = require("../models");
const User = db.users;

const bcrypt = require("bcrypt");

//login
const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res
      .status(400)
      .json({ message: "username & password are required." });
  const foundUser = await User.findOne({
    where: { username: username, password: password },
  });

  if (!foundUser) return res.status(401).json({ message: "Unauthorized" });
  const { accessToken, refreshToken } =
    authService.createAccessAndRefreshToken(foundUser);
  console.log(accessToken);
  //set cookie to client's browser
  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });

  //   let users = await userService.getAll();
  res.status(200).json({ data: foundUser, accessToken: accessToken });
};

const registration = async (req, res) => {
  const { name, email, username, password } = req.body;
  if (!name || !email || !username || !password)
    return res
      .status(400)
      .json({ message: "username & password are required." });

  let requestedData = {
    name: name,
    username: username,
    email: email,
    password: bcrypt.hashSync(req.body.password, 10),
    is_active: true,
  };
  let user = await userService.create(requestedData);
  //   let users = await userService.getAll();
  res.status(200).json(user);
};

module.exports = {
  login,
  registration,
};
