const express = require("express");
const router = express.Router();
const {
  addItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
  searchItems
} = require("../controllers/itemController");

router.post("/items", addItem);
router.get("/items", getItems);
router.get("/items/search", searchItems);
router.get("/items/:id", getItemById);
router.put("/items/:id", updateItem);
router.delete("/items/:id", deleteItem);

module.exports = router;