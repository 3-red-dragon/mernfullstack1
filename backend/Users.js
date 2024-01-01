const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname:String,
    email : String,
    skill : String

})

module.exports = mongoose.model("devusers",userSchema)
