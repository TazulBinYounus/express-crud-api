const express = require("express");
const path = require("path");
const morgan = require("morgan");
const Router = express.Router();

const userRouters = require("./routes/userRoutes.js");
const fileURLToPath = require("url");

const app = express();
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

// static files
app.use(express.static(path.join(__dirname, "public")));

// starting the server
module.exports = app;