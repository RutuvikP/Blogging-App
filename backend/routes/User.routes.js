const {Router}=require('express');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const { UserModel } = require('../models/User.model');

const userRoutes=Router();

userRoutes.get("/",(req,res)=>{
    res.send("User Route Backend")
})

userRoutes.post("/register",(req,res)=>{
    const {username,avatar,email,password} = req.body
    try {
        bcrypt.hash(password,5,async(err,hash)=>{
            const user=new UserModel({username,avatar,email,password:hash})
            await user.save();
            res.status(200).send({"msg":"New User Registered!!"})
        })
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

userRoutes.post("/login",async(req,res)=>{
    const {email,password}=req.body
    const user=await UserModel.findOne({email})
    if(user){
        bcrypt.compare(password,user.password,(err,result)=>{
            if(result){
                const token=jwt.sign({authorID:user._id},"key")
                res.send({"msg":"Login Successfull!!", "token":token, "user":user});
            }else{
                res.send({"msg":"Wrong Credentials!!"})
            }
        })
    }else{
        res.send({"msg":"User Not Found!!"})
    }
})

module.exports={userRoutes}