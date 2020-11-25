const { DataTypes, Sequelize, BOOLEAN } = require("sequelize");
const sequelize = require("../db");
// module.exports = function (sequelize, DataTypes) {
//   return sequelize.define("user", {
const UserModel = sequelize.define("user", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // this dictates that his value can not be used more than once in this table.
  },
  passwordhash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    default: "basic",
    enum: ["Viewer", "Basic", "Admin"],
  },
  // isAdmin: {
  //   type: DataTypes.BOOLEAN,
  // },

  // accessToken: {
  //   type: DataTypes.STRING,
  // },
});
// };
module.exports = UserModel;
