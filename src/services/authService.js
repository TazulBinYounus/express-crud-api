const jwt = require("jsonwebtoken");

const createAccessAndRefreshToken = (foundUser) => {
  const accessToken = jwt.sign(
    { username: foundUser.username },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "1d",
    }
  );

  const refreshToken = jwt.sign(
    { username: foundUser.username },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "1d",
    }
  );
  //store refresh token to database
  const updateRefreshToken = foundUser.update({
    refresh_token: refreshToken,
  });

  return { accessToken, updateRefreshToken };
};

module.exports = {
  createAccessAndRefreshToken,
};
