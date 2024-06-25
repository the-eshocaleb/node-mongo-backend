const Item = require('../models/item.js');

const createItem = async(req, res) => {
    const item = new Item(req.body);
    try { 

        await item.save();
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({error: "Error creating item!"});
    }
}

const getItems = async(req, res) => {
    try {
        const items = await Item.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({error: "Error getting all items!"});
    }
}

const getItem = async(req, res) => {
    const id = req.params.id;
    try {
        const item = await Item.findById(id);
        if (!item) {
            return res.status(404).json({error: "Item not found!"});
        }
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({error: "Error getting item!"});
    }
}

const updateItem = async(req, res) => {
    const id = req.params.id;
    try {
        const item = await Item.findById(id);
        if (!item) {
            return res.status(404).json({error: "Item not found!"});
        }

        const updateItem = await Item.findOneAndUpdate(
            { _id: id },
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updateItem);

    } catch (error) {
        res.status(400).json({error: "Item not found!"});
    }
}
    
const deleteItem = async(req, res) => {
    const id = req.params.id;
    try {
        const item = await Item.findById(id);
        if (!item) {
            return res.status(404).json({error: "Item not found!"});
        }
        await Item.findOneAndDelete({ _id: id });
        res.status(200).json({message: "Item deleted successfully!"});
    }
    catch (error) {
        res.status(400).json({error: "Item not found!"});
    }
}

module.exports = { createItem, getItems, getItem, updateItem, deleteItem };