const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        require:[true,"name is require"],
        trim:true
    },
    Username:{
        type:String,
        require:[true,"Username is require"],
        unique:[true,"Username should be unique"],
        trim:true
    },
    password:{
        type:String,
        require:[true,"Username is require"],
        trim:true
    },
    Designation:{
        type:String,
        trim:true,
        enum:['admin','supervisor'],
        require:[true,"Designation is require"]
    }
},{timestamps:true})

module.exports=mongoose.model('user',userSchema)