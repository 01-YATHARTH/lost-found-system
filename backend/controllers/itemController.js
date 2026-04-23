const Item = require("../models/Item");

// ADD ITEM
exports.addItem = async (req, res) => {
  try {
    const item = new Item(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ALL ITEMS
exports.getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ITEM BY ID
exports.getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE ITEM
exports.updateItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE ITEM
exports.deleteItem = async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: "Item deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// SEARCH ITEM
exports.searchItems = async (req, res) => {
  try {
    const name = req.query.name;
    const items = await Item.find({
      itemName: { $regex: name, $options: "i" }
    });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};