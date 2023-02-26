const express=require("express")
const {userCreate,login}=require("../controller/userController")
const {authantication}=require("../middleware/mid")
const {createProduct,getAllProduct,updateProduct,deleteProduct} =require("../controller/productController")
const route=express.Router()


route.post("/user",userCreate)
route.post("/user/login",login)
route.post("/demo",authantication)

route.post("/product",authantication,createProduct)
route.get("/product",authantication,getAllProduct)
route.put("/product",authantication,updateProduct)
route.delete("/product",authantication,deleteProduct)

module.exports=route