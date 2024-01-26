const express = require('express')
const cors = require("cors");
const app = express();
const body_parser = require("body-parser");
const quizRouter = require('./route/quizRouter')
const userRouter = require('./route/userRouter')
const resultRouter = require('./route/resultRouter')
const connectDB = require('./data/dbConnect')
require('dotenv').config()


app.use(body_parser.json())
app.use(body_parser.urlencoded({extended:true}));
app.use(cors()); 

app.use('/play',quizRouter)
app.use('',userRouter)
app.use('',resultRouter)


app.get('/',(req,res)=>{
    res.send("Welcome to Quizzmi backend!")
})

const serverStart = async ()=>{
    try {
        await connectDB(process.env.MONGO_URI);
        console.log("Connected to Database")
        app.listen(5001,()=>{
            console.log("Server started on 5001")
        })
        
    } catch (error) {
        console.log(error)
    }

}

serverStart()
