const authService = require("../services/authService.js");
const userService = require("../services/userService.js");
const db = require("../models");
const User = db.users;
const jwt = require("jsonwebtoken");

//login
const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.status(401).json({ message: "Unauthorized1" });
  const refreshToken = cookies.jwt;
  const foundUser = await User.findOne({
    where: { refresh_token: refreshToken },
  });

  if (!foundUser) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err || user.username != foundUser.username) return sendStatus(403);
    const accessToken = jwt.sign(
      { username: foundUser.username },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    console.log(accessToken);
    res.status(200).json({ accessToken: accessToken });
  });

  //set cookie to client's browser

  //   let users = await userService.getAll();
  res.status(200).json({ data: foundUser, accessToken: accessToken });
};

module.exports = {
  handleRefreshToken,
};
