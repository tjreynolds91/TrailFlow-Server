const { DataTypes } = require("sequelize");
const sequelize = require("../db");
// module.exports = function (sequelize, DataTypes) {
//   return sequelize.define("trailItem", {
const TrailItemModel = sequelize.define("trail", {
  mtbID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  summary: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

  difficulty: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  stars: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  starVotes: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imgSqSmall: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  imgSmall: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  imgSmallMed: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  imgMedium: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  length: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  ascent: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  decent: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  high: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  low: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  longitude: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  latitude: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  conditionStatus: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  conditionDetails: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  conditionDate: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  ridden: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});
// };

module.exports = TrailItemModel;
