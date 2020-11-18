require("dotenv").config();
const express = require("express");
const trailFlowApp = express();
const sequelize = require("./db");
const controllers = require("./controllers/controllerIndex");

trailFlowApp.use(express.json());
trailFlowApp.use(require("./middleware/headers"));

/********************
 *  OPEN ROUTES
 ********************/
trailFlowApp.use("/user", controllers.User);

/***********************
 *  AUTHENTICATED ROUTES
 ***********************/
trailFlowApp.use(
  "/list",
  require("./middleware/validate-session"),
  controllers.List
);

trailFlowApp.use(
  "/trail",
  require("./middleware/validate-session"),
  controllers.Trail
);

sequelize
  .authenticate()
  .then(() => {
    sequelize.sync();
    // sequelize.sync({ force: true });
    console.log("Database connected");
  })
  .catch((err) => {
    console.log("Unable to connect", err);
  });

trailFlowApp.listen(process.env.PORT, () => {
  console.log(`TrailFlow is listening on port ${process.env.PORT}`);
});
