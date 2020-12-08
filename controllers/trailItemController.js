const { TrailItemModel, TrailListModel } = require("../models");
const sequelize = require("../db");
const { Router } = require("express");

const trailItemController = Router();

/**************************
 * CREATE BOOK LIST ITEM
 **************************/

trailItemController.post("/addTrail", async (req, res) => {
  const owner = req.user.id; //user who owns the list
  const { title } = req.body;
  const {
    //values mapped onto my table.
    //use the names for setting up my fetch.
    // listTitle, //need to know variable name for a modal fetch call
    mtbID,
    name,
    type,
    summary,
    difficulty,
    stars,
    starVotes,
    location,
    url,
    imgSqSmall,
    imgSmall,
    imgSmallMed,
    ridden,
  } = req.body.trail; //all information should be put inside a trail object
  try {
    const trailList = await TrailListModel.findOne({
      //find the list to be associated with book
      where: {
        title: title,
        userId: owner,
      },
    });
    if (trailList !== null) {
      let newTrail = await TrailItemModel.create({
        //create trail tied to list id

        mtbID,
        name,
        type,
        summary,
        difficulty,
        stars,
        starVotes,
        location,
        url,
        imgSqSmall,
        imgSmall,
        imgSmallMed,
        ridden,
        userId: owner,
        trailListId: trailList.id,
      });
      res.status(200).json({
        result: newTrail,
        message: "Trail added to list.",
      });
    } else {
      //No such list? Throw error.
      res.status(404).json({
        message: "No list found",
      });
    }
  } catch (err) {
    res.status(500).json({
      result: err,
      message: `Trail failed to be added to list. ${err}`,
    });
    console.log(err);
  }
});

/****************************
 * UPDATE Trail ITEM (two values available to update, listID and ridden.)
 ****************************/

trailItemController.route("/update/:id").put(async (req, res) => {
  const listOwner = req.user.id;
  const trailID = req.params.id;
  const { listTitle, ridden } = req.body;
  try {
    if (listTitle) {
      await TrailListModel.findOne({
        where: { title: listTitle, userId: listOwner },
      }).then((data) => {
        TrailItemModel.update(
          { trailListId: data.id, ridden: ridden },
          { returning: true, where: { id: trailID } }
        )
          .then(([rowsUpdate, [updatedTrail]]) => {
            res.status(200).json({
              updatedTrail,
              message: "Trail list updated",
            });
          })
          .catch((err) => {
            res.status(500).json({ message: `Update failed ${err}` });
          });
      });
    } else {
      TrailItemModel.update(
        { ridden },
        { returning: true, where: { id: trailID } }
      ).then(([rowsUpdate, [updatedTrail]]) => {
        res
          .status(200)
          .json({
            updatedTrail,
            message: "Riden status updated",
          })
          .catch((err) => {
            res.status(500).json({ message: `Update failed: ${err}` });
          });
      });
    }
  } catch (err) {
    res.status(500).json({
      result: err,
      message: `Trail failed to be updated. New list or trail unfound. ${err}`,
    });
  }
});

/******************************
 * GET SINGLE Trail
 ******************************/
trailItemController.get("/singleTrail/:id", async (req, res) => {
  const trailID = req.params.id;
  const ownerID = req.user.id;
  try {
    TrailItemModel.findOne({ where: { id: trailID, userId: ownerID } }).then(
      (data) => {
        if (data !== null) {
          res.status(200).json({
            data,
          });
        } else {
          res.status(404).json({
            message: "No trail found",
          });
        }
      }
    );
  } catch (err) {
    res.status(500).json({ err, message: "Server Error" });
  }
});

/******************************
 * GET ALL Trails FOR LIST
 ******************************/

trailItemController.get("/listTrails/:id", async (req, res) => {
  //! The id is for a list, not a trail!
  const trailListId = req.params.id;
  try {
    TrailItemModel.findAll({ where: { trailListId: trailListId } }).then(
      (data) => {
        if (data !== null) {
          res.status(200).json({
            data,
          });
        } else {
          res.status(404).json({
            message: "No list found",
          });
        }
      }
    );
  } catch (err) {
    res.status(500).json({ err, message: "Server Error" });
  }
});

/******************************
 * DELETE A TRAIL
 ******************************/
trailItemController.delete("/deleteTrail/:id", async (req, res) => {
  try {
    const removedItem = await TrailItemModel.destroy({
      where: { id: req.params.id },
    }).then((data) => {
      res
        .status(200)
        .json({ message: "Trail successfully deleted from list!" });
    });
  } catch (err) {
    res.status(500).json({
      message: `Failed to Delete trail from list! ${err}`,
    });
  }
});

module.exports = trailItemController;
