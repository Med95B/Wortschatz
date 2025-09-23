import mongoose from "mongoose";

const wordSchema=new mongoose.Schema({
word:{
    type:String,
    required:true
},
translation:{
    type:String,
    required:true
},
example:{
    type:String,
    required:true
}

},
{timestamps:true}
)

const Word=mongoose.model('Word',wordSchema)

export default Word