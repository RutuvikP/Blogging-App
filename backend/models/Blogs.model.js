const mongoose=require('mongoose')

const blogsSchema=mongoose.Schema({
    username:{type:String,required:true},
    avatar:{type:String,required:true},
    title:{type:String,required:true},
    content:{type:String,required:true},
    category:{type:String,required:true},
    date:{type:String,required:true},
    likes:{type:Number,required:true, default:0},
    comments:{type:Array,required:true, default:[]},
    authorID:{type:String,required:true}
},{
    versionKey:false
})

const BlogsModel=mongoose.model('blog',blogsSchema);

module.exports={BlogsModel}