const { UserModel } = require("../models");

const adminValidation = async (req, res, next) => {
  try {
    if (req.method == "OPTIONS") {
      next();
    } else {
      const user = await UserModel.findOne({
        where: { userId: req.user.id },
      });
      if (user.role === "Admin") {
        next();
      } else {
        res.status(401).send({
          message: "Must be an Admin to perform this action!",
        });
      }
    }
  } catch (err) {
    res.status(500).json({
      message: "Must be an Admin to perform this action!",
      err,
    });
  }
};

module.exports = adminValidation;
