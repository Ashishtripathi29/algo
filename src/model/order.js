const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId

let orderSchema = new mongoose.Schema({
    productId: {
        type: ObjectId,
        refs: "product",
        required: true
    },
    productName: {
        type: String,
        require: [true, 'productName is required']
    }
    ,
    quentity: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    paid: {
        type: Boolean,
        default: false
    },
    refund: {
        type: Boolean,
        default: false
    },
    placeOrder: {
        type: String,
        enum: ['pending', 'cancel', 'complete'],
        default:'pending'
    },
    cancel:{
        type:Boolean,
        default:false
    }
    ,
    Date: {
        type: Date,
        default: new Date
    }
})

module.exports = mongoose.model("order", orderSchema)