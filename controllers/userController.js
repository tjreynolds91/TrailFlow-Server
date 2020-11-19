const { UserModel } = require("../models/modelsIndex");
const sequelize = require("../db");
const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UniqueContsraintError } = require("sequelize/lib/errors");
const validateSession = require("../middleware/validate-session");

const userController = Router();

/*************************
 * Register Route
 *************************/

userController.post("/register", async (req, res) => {
  let { email, password } = req.body;
  console.log(email, password);
  if (password.length >= 8) {
    try {
      await UserModel.create({
        email: email,
        passwordhash: bcrypt.hashSync(password, 10),
      }).then((data) => {
        const token = jwt.sign({ id: data.id }, process.env.JWT_SECRET);
        res.status(201).json({
          message: "Success: Account created! Ride on!",
          token: token,
        });
      });
    } catch (err) {
      if (err instanceof UniqueContsraintError) {
        res.status(409).json({
          message: "Account with that email already taken.",
        });
      } else {
        res.status(500).json({
          message: "Registration failed",
        });
      }
    }
  } else {
    res.status(406).json({
      message: "Password must be equal to or more than 8 characters.",
    });
  }
});

/*************************
 * Login Route
 *************************/
userController.post("/login", async (req, res) => {
  let { email, password } = req.body;
  try {
    let loginUser = await UserModel.findOne({
      where: { email: email },
    });
    if (loginUser && (await bcrypt.compare(password, loginUser.passwordhash))) {
      const token = jwt.sign({ id: loginUser.id }, process.env.JWT_SECRET);
      res.status(200).json({
        message: "Login successful",
        token: token,
      });
    } else {
      res.status(401).json({
        message: "Login Failed",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: `Error Logging In: ${err}`,
    });
  }
});

/*************************
 * Delete User Route
 *************************/
userController.delete("/deleteuser", validateSession, async (req, res) => {
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
});
/****************
 * Test Get Route
 *****************/

userController.get("/getuser", async (req, res) => {
  res.send("Did I work?");
});

module.exports = userController;
