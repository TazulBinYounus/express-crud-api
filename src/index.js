const app = require("./app.js");
const appConfig = require("./config/appConfig");

app.listen(appConfig.port);
console.log(`server on port ${appConfig.port}`);
