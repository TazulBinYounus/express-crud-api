module.exports = {
  host: "localhost",
  user: "root",
  password: "",
  port: 3306,
  database: "invoice-express-new",
  dialect: "mysql",

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
