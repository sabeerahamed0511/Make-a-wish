const Wish = require("../models/wishesSchema");
const Person = require("../models/personSchema");
const controller = {};

controller.getWishes = async (req, res) => {
    try {
        let person = await Person.findById(req.params.id);
        if(!person) return res.status(401).json({status : "Failed", message : "User not found!"});
        let wishes = await Wish.find({personId : req.params.id});
        res.status(200).json({status : "Success", wishes});
    } catch (err) {
        res.status(400).json({status : "Failed", message : err.message});
    }
}

controller.addWish = async (req, res) => {
    try {
        let newWish = await new Wish(req.body);
        newWish = await newWish.save();
        res.status(201).json({status : "Success"});
    } catch (err) {
        res.status(400).json({status : "Failed", message : err.message});
    }
}

controller.deleteWishes = async (req, res) => {
    try {
        let wish = await Wish.findById(req.params.id);
        if(!wish) return res.status(401).json({status : "Failed", message : "wish not found!"});
        await Wish.findByIdAndDelete(req.params.id);
        res.status(200).json({status : "Success"});
    } catch (err) {
        res.status(400).json({status : "Failed", message : err.message});
    }
}

module.exports = controller;