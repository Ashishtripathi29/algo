const { findOneAndUpdate } = require("../model/order")
const orderSchema = require("../model/order")
const productSchema = require("../model/product")
const {str,num,email,pass,usName,objId}=require("../validation/validation")

// ========================================== create order ==================================


const createOrder = async (req, res) => {
    try {
        if (req.Designation != "supervisor") return res.status(400).send({ status: "failed", message: "only supervisor  can order" })
        let reqData = req.body
        let {productId,quentity,paid}=reqData
        for (let el of ['productId', 'quentity']) {
            if (!reqData[el]) return res.status(400).send({ status: "failed", message: `${el} is required` })
        }
        if(!objId(productId)) return res.status(400).send({status:"failed",message:"please enter valide projectId"})
        if(!num(quentity)) return res.status(400).send({status:"failed",message:"please enter the number in quentity section"})
        let productData=await productSchema.findById(productId)
        if(!productData) return res.status(400).send({status:"failed",message:"not found product with this id"})

        reqData.productName=productData.productName
        reqData.totalPrice=quentity*productData.price 

        if(paid) {
            if(paid!=true && paid!=false) return res.status(400).send({status:"failed",message:"paid is only can be true or false"})
        }

        let createdOrder=await orderSchema.create(reqData)

        res.status(201).send({status:"failed",message:"order is created",order:createdOrder})

    } catch (err) {
        res.status(500).send({
            status: "failed",
            message: err.message
        })
    }
}


// ========================================= get all order =========================================

const getAllOrder = async (req, res) => {
    try {
        if (req.Designation != "supervisor") return res.status(400).send({ status: "failed", message: "only supervisor  can order" })
       let allOrder=await orderSchema.find()

        res.status(201).send({status:"failed",order:allOrder})

    } catch (err) {
        res.status(500).send({
            status: "failed",
            message: err.message
        })
    }
}

// ================================================== update order ======================================

const updateOrder=async (req,res)=>{
    try {
        if (req.Designation != "supervisor") return res.status(400).send({ status: "failed", message: "only supervisor  can order" })
        let reqData=req.body
        const {quentity,paid,refund,placeOrder,orderId,cancel}=reqData
        if(!orderId) return res.status(400).send({status:"failed",message:"please enter orderId"})
        if(!objId(orderId)) return res.status(400).send({status:"failed",message:"please enter valid orderId"})
        const order=await orderSchema.findById(orderId)
        if(!order) return res.status(400).send({status:"failed",message:"not found any order"})
        
        const productData=await productSchema.findById(order.productId)
         let totalPrice
        if(quentity){
            if(!num(quentity)) return res.status(400).send({status:"failed",message:"quentity should be number"})
           totalPrice=productData.price * quentity
        }
        if(paid){
            if(paid!==true && paid!=false) return res.status(400).send({status:"failed",message:"paid should be tru or false"})
        }
        if(refund){
            if(refund!==true && refund!=false) return res.status(400).send({status:"failed",message:"refund should be tru or false"})
        }
        if(placeOrder){
            if(placeOrder!==true && placeOrder!=false) return res.status(400).send({status:"failed",message:"placeOrder should be true or false"})
        }
        if(cancel){
            if(cancel!==true && cancel!=false) return res.status(400).send({status:"failed",message:"cancel should be true or false"})
        }
        
        let updatedData=await orderSchema.findOneAndUpdate({_id:orderId},{quentity,totalPrice,paid,refund,placeOrder,cancel},{new:true})
        
        res.status(200).send({status:"success",message:"update successful",updatedData})
        
    } catch (err) {
        res.status(500).send({status:"failed",message:err.message})
        
    }
}

module.exports={createOrder,getAllOrder,updateOrder}