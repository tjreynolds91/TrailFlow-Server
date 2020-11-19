const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../db");
// module.exports = function (sequelize, DataTypes) {
//   return sequelize.define("user", {
const UserModel = sequelize.define("user", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: { msg: "Email address already in use!" },
  },
  passwordhash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
// };
module.exports = UserModel;
