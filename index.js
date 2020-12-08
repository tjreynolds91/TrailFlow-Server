require("dotenv").config();
const express = require("express");
const trailFlowApp = express();
const sequelize = require("./db");
const controllers = require("./controllers/controllerIndex");
const validateSession = require("./middleware/validate-session");
const AdminValidate = require("./middleware/adminValidation");
trailFlowApp.use(express.json());
trailFlowApp.use(require("./middleware/headers"));

/********************
 *  OPEN ROUTES
 ********************/
trailFlowApp.use("/user", controllers.User);

/***********************
 *  AUTHENTICATED ROUTES
 ***********************/
trailFlowApp.use("/list", validateSession, controllers.List);

trailFlowApp.use("/trail", validateSession, controllers.Trail);

trailFlowApp.use(
  "/admin",
  validateSession,
  AdminValidate,
  require("./controllers/adminController")
);

/*************************
 * DB Connection
 *************************/

sequelize
  .authenticate()
  .then(() => {
    sequelize.sync();
    //sequelize.sync({ force: true });
    console.log("Database connected");
  })
  .catch((err) => {
    console.log("Unable to connect", err);
  });

let User = require("./models/user");
let TrailList = require("./models/trailList");
let TrailItem = require("./models/trailItem");

User.hasMany(TrailList);
TrailList.belongsTo(User);
User.hasMany(TrailItem);
TrailItem.belongsTo(User); //this is only for future functionality. creates a column in the db table but will be unused at this time.
TrailList.hasMany(TrailItem);
TrailItem.belongsTo(TrailList);

trailFlowApp.listen(process.env.PORT, () => {
  console.log(`TrailFlow is listening on port ${process.env.PORT}`);
});
