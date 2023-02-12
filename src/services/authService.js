const jwt = require("jsonwebtoken");

const createAccessAndRefreshToken = (foundUser) => {
  const accessToken = jwt.sign(
    { username: foundUser.username },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "15s",
    }
  );

  const refreshToken = jwt.sign(
    { username: foundUser.username },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "1d",
    }
  );
  //update refresh token to database
  const updateRefreshToken = foundUser.update({
    refresh_token: refreshToken,
  });

  return { accessToken, refreshToken };
};

module.exports = {
  createAccessAndRefreshToken,
};
