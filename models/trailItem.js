// const { DataTypes } = require("sequelize");
// const sequelize = require("../db");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define("trailItem", {
    // const TrailItemModel = sequelize.define("trail", {
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
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    starVotes: {
      type: DataTypes.INTEGER,
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
      allowNull: false,
    },
    imgSmall: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imgSmallMed: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imgMedium: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    length: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ascent: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    decent: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    high: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    low: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    longitude: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    latitude: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    conditionStatus: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    conditionDetails: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    conditionDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};

// module.exports = TrailItemModel;
