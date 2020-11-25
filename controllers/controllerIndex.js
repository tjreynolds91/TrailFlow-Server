const userController = require("./userController");
const trailItemController = require("./trailItemController");
const trailListController = require("./trailListController");
const adminController = require("./adminController");

module.exports = {
  Admin: adminController,
  User: userController,
  List: trailListController,
  Trail: trailItemController,
};
