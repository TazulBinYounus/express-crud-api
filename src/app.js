const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const morgan = require("morgan");
const Router = express.Router();

const userRouters = require("./routes/userRoutes.js");
const authRoutes = require("./routes/authRoutes.js");
const fileURLToPath = require("url");
const dotenv = require("dotenv");

// get config vars
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
// const __dirname = path.dirname(fileURLToPath(import.meta.url));

// settings
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));

// routes
// const userRouters = require("./routes/user.routes.js");
app.use(userRouters);
app.use(authRoutes);

// static files
app.use(express.static(path.join(__dirname, "public")));

// starting the server
module.exports = app;
