const mongoose=require('mongoose')

const productSchema=new mongoose.Schema({
    productName:{
        type:String,
        require:[true,"ProducutId is require"],
        trim:true
    },
    price:{
        type:Number,
        require:[true,"price is require"],
        trim:true
    },
    isDeleted:{
         type:Boolean,
         default:false
    }
},{timestamps:true})

module.exports=mongoose.model('product',productSchema)