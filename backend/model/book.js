const mongoose=require("mongoose");
const BookSchema=mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Author:{
        type:String,
        required:true
    },
    
})

const Books=mongoose.model("Book",BookSchema);
module.exports=Books