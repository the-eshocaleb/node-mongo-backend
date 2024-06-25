const { Router } = require('express');
const { createItem, getItems, getItem, updateItem, deleteItem } = require('../service/item.service.js');

const router = Router();

// Routes

// create route
router.post("/", createItem);

// get all items route
router.get("/", getItems);

// get single item route
router.get("/:id", getItem);

// update item route
router.put("/:id", updateItem);

// delete item route
router.delete("/:id", deleteItem);

module.exports = router;
