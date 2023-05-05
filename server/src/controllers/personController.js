require("dotenv").config();
const Person = require("../models/personSchema");
const Wish = require("../models/wishesSchema");
const User = require("../models/userSchema");

const createPerson = async (req, res) => {
    try {
        let newPerson = await new Person(req.body);
        newPerson = await newPerson.save();
        res.status(201).json({ status: "Success", person: newPerson });
    } catch (err) {
        res.status(400).json({ status: "Failed", message: err.message });
    }
}

const getAllPerson = async (req, res) => {
    try {
        let user = await User.findById(req.params.id);
        if (!user) return res.status(401).json({ status: "Failed", message: "User not Found! Please check the URL!" })
        let persons = await Person.find({ creatorId: req.params.id });
        res.status(201).json({ status: "Success", persons });
    } catch (err) {
        res.status(400).json({ status: "Failed", message: err.message });
    }
}

const getSinglePerson = async (req, res) => {
    try {
        let person = await Person.findById(req.params.id);
        if (!person) return res.status(401).json({ status: "Failed", message: "User not Found! Please check the URL!" });
        res.status(201).json({ status: "Success", person });
    } catch (err) {
        res.status(400).json({ status: "Failed", message: err.message });
    }
}

const deleteSinglePerson = async (req, res) => {
    try {
        let person = await Person.findById(req.params.id);
        if (!person) return res.status(401).json({ status: "Failed", message: "User not Found!" });
        await Wish.deleteMany({ personId: person._id });
        await Person.findByIdAndDelete(req.params.id)
        res.status(201).json({ status: "Success" });
    } catch (err) {
        res.status(400).json({ status: "Failed", message: err.message });
    }
}
module.exports = { createPerson, getAllPerson, getSinglePerson, deleteSinglePerson };