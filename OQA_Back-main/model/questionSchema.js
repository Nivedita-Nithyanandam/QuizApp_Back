const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
    quizID:mongoose.Types.ObjectId,
    questionID:String,
    isQuiz:Boolean,
    questionText:String,
    optionA:String,
    optionB:String,
    optionC:String,
    optionD:String,
    optionSolution:String,
},{
    collection:'quizCollection'
})


module.exports = mongoose.model('questionCollection',questionSchema)