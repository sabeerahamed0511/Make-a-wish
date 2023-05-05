const mongoose = require("mongoose");

const personSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            required: true,
        },
        notes: {
            type: String,
            required: true,
        },
        creatorId : {
            type : mongoose.Schema.Types.ObjectId,
            required : true
        }
    }
    ,
    { timestamp: true }
);
const Person = mongoose.model("persons", personSchema);
module.exports = Person;
