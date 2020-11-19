const { DataTypes } = require("sequelize");
const sequelize = require("../db");
// module.exports = function (sequelize, DataTypes) {
//   return sequelize.define("trailList", {
const TrailListModel = sequelize.define("trailList", {
  listID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
// };
module.exports = TrailListModel;
