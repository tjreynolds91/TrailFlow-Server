const { UserModel } = require("../models/modelsIndex");
const sequelize = require("../db");
const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const { UniqueContsraintError } = require("sequelize/lib/errors");
const validateSession = require("../middleware/validate-session");
const adminValidation = require("../middleware/adminValidation");

const adminController = Router();

/*************************
 * Delete User as an Admin Route
 *************************/
adminController.delete(
  "/admindeleteuser",
  validateSession,
  adminValidation,
  async (req, res) => {
    try {
      const removedUser = await UserModel.destroy({
        where: { id: req.user.id },
      }).then((data) => {
        res.status(200).json({
          message: "User successfully deleted!",
        });
      });
    } catch (err) {
      res.status(500).json({
        message: `Failed to Delete User`,
      });
    }
  }
);

module.exports = adminController;
