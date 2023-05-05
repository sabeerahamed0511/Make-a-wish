const mongoose = require("mongoose");
const wishesSchema = new mongoose.Schema({
    realName : {
        type : String
    },
    nickNameOfWisher : {
        type : String
    },
    nickNameOfReciever : {
        type : String
    },
    message : {
        type : String
    },
    personId : {
        type : mongoose.Schema.Types.ObjectId
    }

}, {timestamps : true});

const Wish = new mongoose.model("wishes", wishesSchema);
module.exports = Wish;