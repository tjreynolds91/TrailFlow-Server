const userController = require("./userController");
const trailItemController = require("./trailItemController");
const trailListController = require("./trailListController");

module.exports = {
  User: userController,
  List: trailListController,
  Trail: trailItemController,
};
