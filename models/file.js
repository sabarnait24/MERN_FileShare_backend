const db = require('../db/db');
const mongoose = require('mongoose');
mongoose.set("strictQuery", false);
const validator = require("validator");

const fileschema = new mongoose.Schema({
    fileName:{
        type: String,
        required: true,
    },
    urlLink:{
        type:String,
        required:true,
    },
    format : {
        type:String,
        required:true
    },
    fileSize:{
        type: String,
        required:true,
    },
    sender:{
        type:String,
    },
    receiver:{
        type:String,
    }
})

const Fileschema=mongoose.model('fileschema',fileschema);
module.exports={
 Fileschema
}
