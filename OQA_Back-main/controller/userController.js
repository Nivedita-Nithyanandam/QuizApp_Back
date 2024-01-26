const userCollection = require("../model/userSchema")
const bcrypt = require("bcrypt")

const userLogin = async (req,res)=>{
    try {
        const {uname,pwd} = req.body;
        var data;
        await userCollection.findOne({userName:uname})
            .then((temp)=>{
                if(temp){
                    data=temp
                }
                })
            .catch((error)=>
                console.log(error))
        if(!data)
            return res.status(403).json({success:false,msg:"Username does not exists"})
        else
        {
            if(await bcrypt.compare(pwd,data.userPwd))
            {

                return res.status(201).json({success:true,msg:data._id})
            }
            else
            {
                return res.status(402).json({success:false,msg:"Password not Matched"})
            }
        }
    } catch (error) {
        console.log(error)
        res.status(404).send()
    }
}

const userSignup = async (req,res)=>{
    try {
        const {uname,pwd} = req.body;
        var data =false;
        const salt = await bcrypt.genSalt(3)
        const hashPwd = await bcrypt.hash(pwd,salt)
        
        await userCollection.findOne({userName:uname})
            .then((res)=>{
                if(res){
                    console.log("res is " ,res)
                    data=true
                    }
                })
            .catch((error)=>
                console.log(error))
        if(data)
            return res.status(409).json({success:false,msg:"Username already exists"})
        else
            await userCollection.create({userName:uname,userPwd:hashPwd}).then((res)=>{console.log(res)}).catch((err)=>console.log(err))
        res.status(201).json({success:true,msg:"Account Created!"})
    } catch (error) {
        console.log(error)
        res.status(404).send()
    }
}

const myDetailsFetch = async (req,res)=>{
    const {loginVal} = req.params;
    var data
    try {
        await userCollection.findById({_id:loginVal})
            .then((temp)=>{
                data = temp
            }) 
        return res.status(201).json({success:true,msg:data})
    } catch (error) {
        console.log(error)
        res.status(405).json({success:false,msg:error})
    }
}
const myDetailsUpdate = async (req,res)=>{
    const {id} = req.body;
    const {newUserName} = req.body;
    const {newPwd} = req.body;
    const hashPwd = await bcrypt.hash(newPwd,3)
    console.log(id)
    var data = false;
    try {
        await userCollection.findOne({userName:newUserName})
            .then((res)=>{
                if(res.userName != newUserName){
                    data=true
                }
             })
            .catch((err))=>{
                res.status(503).json({success:false,msg:error})
            }
        if(data)
            return res.status(409).json({success:false,msg:"Username already exists"})
        else{
            await userCollection.findByIdAndUpdate({_id:id},{userName:newUserName,userPwd:hashPwd})
                .then(()=>{
                    res.status(201).json({success:true}) 
                })
        }
    } catch (error) {
        res.status(404).json({success:false,msg:error})
    }
}

module.exports = {
    userLogin,
    userSignup,
    myDetailsFetch,
    myDetailsUpdate
}

