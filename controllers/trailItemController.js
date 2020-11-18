const { TrailItemModel, TrailListModel } = require("../models/modelsIndex");
const sequelize = require("../db");
const { Router } = require("express");

const trailItemController = Router();
// const owner = req.user.id; // user who owns the list
// const {
//   mtbID,
//   name,
//   type,
//   summary,
//   difficulty,
//   stars,
//   starVotes,
//   location,
//   url,
//   imgSqSmall,
//   imgSmall,
//   imgSmallMed,
// } = req.body.trail; // all info should be put inside a book object
// try {
//   const trailList = await TrailListModel.findOne({
//     //find the list to be ass
//   });
// }

module.exports = trailItemController;
