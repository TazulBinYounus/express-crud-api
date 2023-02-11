const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    console.log(err);
    console.log(decoded);
    if (err) return res.sendStatus(403); // invalid token
    res.setHeader("Content-Type", "text/html");
    res.username = decoded.username;
    next();
  });

  next();
};

module.exports = verifyToken;
