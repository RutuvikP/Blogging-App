const {Router}=require('express');
const { BlogsModel } = require('../models/Blogs.model');

const blogsRoutes=Router();

blogsRoutes.get("/",async(req,res)=>{
    const {page,category,orderBy,title} = req.query
    let query={};
    if(title){
        query["title"]={$regex:title, options:"i"}
    }
    if(category){
        query.category=category
    }
    let sortobj={};
    if(orderBy=="asc"){
        sortobj["date"]=1
    }else if(orderBy=="desc"){
        sortobj["date"]=-1
    }
    try {
        let blogs=await BlogsModel.find(query).skip((5*page)-5).limit(5).sort(sortobj)
        res.send(blogs)
    } catch (error) {
        res.send({"msg":error.message})
    }
})

blogsRoutes.post("/add",async(req,res)=>{
    try {
        const blog=new BlogsModel(req.body)
        await blog.save();
        res.send({"msg":"Blog added successfully!!"})
    } catch (error) {
        res.send({"msg":error.message})
    }
})

module.exports={blogsRoutes}