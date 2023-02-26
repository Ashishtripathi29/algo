const mongoose=require("mongoose")
const ObjectId=mongoose.Types.ObjectId

let orderSchema=new mongoose.Schema({
    productId:{
        type:ObjectId,
        refs:"product",
    }
})