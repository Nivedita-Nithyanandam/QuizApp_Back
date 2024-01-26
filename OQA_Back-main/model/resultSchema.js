const mongoose = require('mongoose')

const resultSchema = new mongoose.Schema({
    quizID: mongoose.Types.ObjectId,
    userID: mongoose.Types.ObjectId,
    quizName:String,
    userName:String,
    userScore: String,
    quizDate:String,
    quizTime:String
},{
    collection:'resultCollection'
})


module.exports = mongoose.model('resultCollection',resultSchema)
