const authService = require("../services/authService.js");
const userService = require("../services/userService.js");
const db = require("../models");
const User = db.users;
const jwt = require("jsonwebtoken");

//get user
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
  const accessToken = jwt.sign(
    { username: username },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "1d",
    }
  );

  const refreshToken = jwt.sign(
    { username: username },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "1d",
    }
  );
  //store refresh token to database
  const updateRefreshToken = foundUser.update({
    refresh_token: refreshToken,
  });

  //set cookie to client's browser
  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });
  //   let users = await userService.getAll();
  res.status(200).json({ data: foundUser, accessToken: accessToken });
};

module.exports = {
  login,
};
