const quizCollection = require('../model/quizSchema')
const questionCollection = require('../model/questionSchema')
const userCollection = require("../model/userSchema")
const resultCollection = require("../model/resultSchema")
const mongoose = require('mongoose');

const saveScore = async (req,res)=>{
    const {id} = req.params;
    const quizID = id;
    const userID = req.body.userID;
    const userScore = req.body.userScore;
    const quizTime = req.body.quizTime;
    console.log(quizTime)
    const date =  new Date()

    var today = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
    var quizName;
    var userName;

    try {
        await quizCollection.findOne({_id:quizID}).then((data)=>quizName=data.quizTitle).catch((err)=>console.log(err))
        await userCollection.findOne({_id:userID}).then((data)=>userName=data.userName).catch((err)=>console.log(err))
        await resultCollection.create({userID:userID,quizID:quizID,userScore:userScore,quizName:quizName,userName:userName,quizDate:today,quizTime:quizTime})

        res.status(201).json({success:true})
    } catch (error) {
        res.status(404).json({success:false,msg:error})
    }

}
const yourScores= async (req,res)=>{
    const userID = req.body.userID;
    if(userID!="1")
        try {
            await resultCollection.find({userID:userID}).then((data)=>
            res.status(201).json({success:true,msg:data})).catch((err)=>console.log(err))
        } catch (error) {
            res.status(404).json({success:false,msg:error})
        }
    else{
        try {
            await resultCollection.find().then((data)=>
            res.status(201).json({success:true,msg:data})).catch((err)=>console.log(err))
        } catch (error) {
            res.status(404).json({success:false,msg:error})
        }
    }
}


module.exports = {
    saveScore,
    yourScores
}
