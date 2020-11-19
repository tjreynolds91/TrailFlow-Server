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
// } = req.body.trail; // all info should be put inside a trail object
// try {
//   const trailList = await TrailListModel.findOne({
//     //find the list to be associated with trail
//     where: {
//         title: listTitle,
//         owner: owner,
//       },
//     });
//     if (trailList === null) {
//       //No such list? Throw error.
//       res.status(404).json({
//         message: "No list found",
//       });
//     } else {
//       let newTrail = await TrailItemModel.create({
//         //create Trail tied to list id
//         mtbID,
//         name,
//         type,
//         summary,
//         difficulty,
//         stars,
//         starVotes,
//         location,
//         url,
//         imgSqSmall,
//         imgSmall,
//         imgSmallMed,
//       });
//       res.status(200).json({
//         result: newTrail,
//         message: "Trail added to list.",
//       });
//     }
//   } catch (err) {
//     res.status(500).json({
//       result: err,
//       message: `Trail failed to be added to list. ${err}`,
//     });
//   }
// });

// /****************************
//  * UPDATE BOOK ITEM (two values available to update, listID and read.)
//  ****************************/

// trailItemController.route("/update/:id").put(async (req, res) => {
//   const listOwner = req.user.id;
//   const trailID = req.params.id;
//   const { newListTitle, read } = req.body;
//   try {
//     if (newListTitle) {
//       await BookListModel.findOne({
//         where: { title: newListTitle, owner: listOwner },
//       }).then((data) => {
//         BookItemModel.update(
//           { listID: data.id, read: read },
//           { returning: true, where: { id: bookID } }
//         )
//           .then(([rowsUpdate, [updatedBook]]) => {
//             res.status(200).json({
//               updatedBook,
//               message: "Book list updated",
//             });
//           })
//           .catch((err) => {
//             res.status(500).json({ message: `Update failed ${err}` });
//           });
//       });
//     } else {
//       BookItemModel.update(
//         { read },
//         { returning: true, where: { id: bookID } }
//       ).then(([rowsUpdate, [updatedBook]]) => {
//         res
//           .status(200)
//           .json({
//             updatedBook,
//             message: "read status updated",
//           })
//           .catch((err) => {
//             res.status(500).json({ message: `Update failed: ${err}` });
//           });
//       });
//     }
//   } catch (err) {
//     res.status(500).json({
//       result: err,
//       message: `Book failed to be updated. New list or book unfound. ${err}`,
//     });
//   }
// });

// /******************************
//  * GET SINGLE BOOK
//  ******************************/
// bookItemController.get("/singleBook/:id", async (req, res) => {
//   const bookID = req.params.id;
//   const ownerID = req.user.id;
//   try {
//     BookItemModel.findOne({ where: { id: bookID, ownerID: ownerID } }).then(
//       (data) => {
//         if (data !== null) {
//           res.status(200).json({
//             data,
//           });
//         } else {
//           res.status(404).json({
//             message: "No book found",
//           });
//         }
//       }
//     );
//   } catch (err) {
//     res.status(500).json({ err, message: "Server Error" });
//   }
// });

// /******************************
//  * GET ALL BOOKS FOR LIST
//  ******************************/

// bookItemController.get("/listBooks/:id", async (req, res) => {
//   //! The id is for a list, not a book!
//   const listID = req.params.id;
//   try {
//     BookItemModel.findAll({ where: { listID: listID } }).then((data) => {
//       if (data !== null) {
//         res.status(200).json({
//           data,
//         });
//       } else {
//         res.status(404).json({
//           message: "No list found",
//         });
//       }
//     });
//   } catch (err) {
//     res.status(500).json({ err, message: "Server Error" });
//   }
// });

module.exports = trailItemController;
