require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
});

// let User = require("./models/user")(sequelize, require("sequelize"));
// let TrailList = require("./models/trailList")(sequelize, require("sequelize"));
// let TrailItem = require("./models/trailItem")(sequelize, require("sequelize"));

// TrailList.belongsTo(User);
// TrailItem.belongsTo(User); //this is only for future functionality. creates a column in the db table but will be unused at this time.
// TrailItem.belongsTo(TrailList);

module.exports = sequelize;
