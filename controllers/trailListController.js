const { TrailListModel } = require("../models/modelsIndex");
const sequelize = require("../db");
const { Router } = require("express");
const TrailItemModel = require("../models/trailItem");
const trailItemController = require("./trailItemController");

const trailListController = Router();

/*****************************
 * Create List
 *****************************/
trailListController.post("/newList", async (req, res) => {
  const owner = req.user.id;
  const { title } = req.body;
  try {
    let listCheck = await TrailListModel.findOne({
      where: { userId: owner, title: title }, //*one User cannot use same list title twice.
    });
    console.log(listCheck);
    if (listCheck !== null) {
      res.status(400).json({
        message: "List already exists.",
      });
    } else {
      let newList = TrailListModel.create({
        userId: owner,
        title: title,
      });
      res.status(201).json({
        result: newList,
        message: "List Created.",
      });
    }
  } catch (err) {
    {
      res.status(500).json({
        message: "Failed to create list.",
      });
    }
  }
});

/******************************
 * Display All Lists For Owner
 *****************************/
trailListController.get("/allLists", async (req, res) => {
  const trailListOwner = req.user.id;

  try {
    let allLists = await TrailListModel.findAll({
      where: { userId: trailListOwner },
    }).then((data) => {
      //if list(s) returned, display the list(s); else display message
      if (data.length > 0) {
        res.status(200).json(data);
      } else {
        res.status(404).json({ message: "No lists found." });
      }
    });
  } catch (err) {
    {
      res.status(500).json({
        message: `Failed to retrieve lists ${err}`,
      });
    }
  }
});
/******************************
 * Display Single List
 *****************************/
trailListController.get("/singleList/:id", async (req, res) => {
  const listID = req.params.id;
  const listOwner = req.user.id;

  try {
    let singleList = await TrailListModel.findOne({
      where: { id: listID, userId: listOwner },
    }).then((data) => {
      // if list returned , display the list; else display message
      if (data !== null) {
        res.status(200).json(data);
      } else {
        res.status(404).json({ message: " List not found." });
      }
    });
  } catch (err) {
    {
      res.status(500).json({
        message: `Failed to retrieve lists ${err}`,
      });
    }
  }
});
/*****************************
 * Update list
 *****************************/
trailListController.put("/update/:id", async (req, res) => {
  const listID = req.params.id;
  const listOwner = req.user.id;
  const updatedTitle = req.body.title;

  try {
    // select a list hwere id = listID and owner = listOwner
    let updateList = await TrailListModel.findOne({
      where: { id: listID, userId: listOwner },
    });
    // if updatelist and updatedTitle both exist,
    // update title to updatedTitle, and respond with status(200) and message.
    // else respond with status(404) and message.
    if (updateList && updatedTitle) {
      updateList.update({ title: updatedTitle });
      res.status(200).json({ message: "List successfully updated!" });
    } else {
      res
        .status(404)
        .json({ message: "List not found or update unsuccessful." });
    }
  } catch {
    function updateError(err) {
      res.status(500).json(`Failed to retrieve lists ${err}`);
    }
  }
});

/*****************************
 * Delete List
 *****************************/
trailListController.delete("/deleteList/:id", async (req, res) => {
  try {
    const removedList = await TrailListModel.destroy({
      where: { id: req.params.id },
    }).then((data) => {
      res.status(200).json({ message: "List successfully deleted!" });
    });
  } catch (err) {
    res.status(500).json({
      message: `Failed to Delete List. ${err}`,
    });
  }
});

module.exports = trailListController;
