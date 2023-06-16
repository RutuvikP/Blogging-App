const {Router}=require('express');
const { BlogsModel } = require('../models/Blogs.model');

const blogsRoutes=Router();

// get request
blogsRoutes.get("/",async(req,res)=>{
    const {page,category,orderBy,title} = req.query
    let query={};
    if(title){
        query["title"]={$regex:title, $options:"i"}
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

// post request
blogsRoutes.post("/add",async(req,res)=>{
    try {
        const blog=new BlogsModel(req.body)
        await blog.save();
        res.send({"msg":"Blog added successfully!!"})
    } catch (error) {
        res.send({"msg":error.message})
    }
})
// patch request
blogsRoutes.patch("/update/:id",async(req,res)=>{
    const {id}=req.params
    const blog=await BlogsModel.findOne({_id:id})
    req.body.authorID=blog.authorID
    if(blog){
        await BlogsModel.findByIdAndUpdate({_id:id},req.body)
        res.send({"msg":"Blog Updated Successfully!!"})
    }else{
        res.send({"msg":"Blog Not Found!!"})
    }
})

// delete
blogsRoutes.delete("/delete/:id",async(req,res)=>{
    const {id}=req.params
    const blog=await BlogsModel.findOne({_id:id})
    if(blog){
        await BlogsModel.findByIdAndDelete({_id:id})
        res.send({"msg":"Blog Deleted Successfully!!"})
    }else{
        res.send({"msg":"Blog Not Found!!"})
    }
})
module.exports={blogsRoutes}