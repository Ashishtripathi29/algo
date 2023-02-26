const express=require("express")
const {userCreate,login}=require("../controller/userController")
const {authantication}=require("../middleware/mid")
const {createProduct,getAllProduct,updateProduct,deleteProduct} =require("../controller/productController")
const {createOrder,getAllOrder,updateOrder}=require("../controller/orderController")
const route=express.Router()


route.post("/user",userCreate)
route.post("/user/login",login)
route.post("/demo",authantication)

route.post("/product",authantication,createProduct)
route.get("/product",authantication,getAllProduct)
route.put("/product",authantication,updateProduct)
route.delete("/product",authantication,deleteProduct)


route.post("/order",authantication,createOrder)
route.get("/order",authantication,getAllOrder)
route.put("/order",authantication,updateOrder)
// route.get("/order",authantication,getAllOrder)

module.exports=route