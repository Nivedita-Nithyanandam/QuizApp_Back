// let quizData = require('quizData')
const quizCollection = require('../model/quizSchema')
const questionCollection = require('../model/questionSchema')
const mongoose = require('mongoose');


const getAllQuiz = async (req,res)=>{
    try {
        const data = await quizCollection.find({isQuiz:true})
        if(!data){
            return res.status(500).json({success:false})
        }
        res.status(200).json(data)
        
    } catch (error) {
        res.status(200).json({success:true})
    }

    // res.status(200).json({data:data}) 
}
const createQuiz =  async (req,res)=>{
    try {
        var newId = new mongoose.Types.ObjectId();
        let {quizJson,questionJson} = req.body;
        
        let qcount = quizJson.quesCount;
        quizJson = {...quizJson, _id:newId};
        quizCollection.create(quizJson)
        for(let i =0;i<qcount;i++)
        {
            questionJson[i] = {...questionJson[i], quizID:newId};
            questionCollection.create(questionJson[i]);

        }
        res.status(200).json({success:true})
    } catch (error) {
        res.status(200).json({success:true})
    }
    
}
const getQuestions = async (req,res)=>{
    try { 
        
        const {id} = req.params;
        const tempQuiz = await quizCollection.find({_id:id,isQuiz:true})
        const requiredQuizID = tempQuiz[0]._id
        const Question = await quizCollection.find({isQuiz:false,quizID:requiredQuizID})
        res.status(200).json(Question)
    } catch (error) {
        res.status(404).send(error)
    }
}
const deleteQuiz = async (req,res)=>{
    let id = new mongoose.Types.ObjectId(req.params);
    let msg =[]
    try {
        await quizCollection.deleteOne({isQuiz:true,_id:id}).then((res)=>msg.push(res)).catch((err)=>msg.push(err))
        await questionCollection.deleteMany({isQuiz:false,quizID:id}).then((res)=>msg.push(res)).catch((err)=>msg.push(err))
        res.status(200).json({success:true,msg:msg})
    } catch (error) {
        console.log(error)
        res.status(404).json({success:false,msg:msg})
    }
}

const getQuizAndQues = async (req,res)=>{
    let id = new mongoose.Types.ObjectId(req.params);
    let msg = []
    try {
        const quizData = await quizCollection.find({isQuiz:true,_id:id}).then((res)=>msg.push(res)).catch((err)=>msg.push(err))
        const quesData = await questionCollection.find({isQuiz:false,quizID:id}).then((res)=>msg.push(res)).catch((err)=>msg.push(err))
        res.status(200).json({success:true,msg:msg})
    } catch (error) {
        console.log(error)
        res.status(404).json({success:false,msg:msg})
    }
}

const updateQuizAndQues = async (req,res)=>{
    let {id} = req.params;
    let msg= []
    try {
        let {quizJson,questionJson} = req.body;
        let qcount = quizJson.quesCount;

        await quizCollection.deleteOne({isQuiz:true,_id:id}).then((res)=>msg.push(res)).catch((err)=>msg.push(err))
        await questionCollection.deleteMany({isQuiz:false,quizID:id}).then((res)=>msg.push(res)).catch((err)=>msg.push(err))

        quizJson = {...quizJson, _id:id};
        await quizCollection.create(quizJson).then((res)=>msg.push(res)).catch((err)=>msg.push(err));
        for(let i =0;i<qcount;i++)
        {
            
            questionJson[i] = {...questionJson[i], quizID:id};
            console.log(questionJson[i])
            
            await questionCollection.create(questionJson[i]).then((res)=>msg.push(res)).catch((err)=>msg.push(err));
        }
        console.log("msg:",msg)
        res.status(200).json({success:true,msg:msg})
        
    } catch (error) {
        console.log(error)
        res.status(404).json({success:false,msg:msg})
    }
}


const getOptionSolution = async (req,res)=>{
    let id = new mongoose.Types.ObjectId(req.params);
    let msg = []
    let data = []
    try {
        await questionCollection.find({isQuiz:false,quizID:id}).then((res)=>msg=(res)).catch((err)=>msg=(err))
        for(let i =0;i<msg.length;i++)
        {
           data.push(msg[i].optionSolution)
        }

        res.status(201).json(data)
    } catch (error) {
        res.status(404).json({success:false,error:error,msg:msg})
    }
}
module.exports = {
    getAllQuiz,
    createQuiz,
    getQuestions,
    deleteQuiz,
    getQuizAndQues,
    updateQuizAndQues,
    getOptionSolution

}