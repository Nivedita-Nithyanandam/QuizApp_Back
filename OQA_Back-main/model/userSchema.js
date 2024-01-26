const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    userName:String,
    userPwd:String,
},
{
    collection:'userCollection'
})

module.exports = mongoose.model('userCollection',userSchema)

