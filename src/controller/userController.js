const userSchema=require("../model/userModel")
const {usName,pass,str}=require("../validation/validation")

const jwt=require("jsonwebtoken")




//========================================= create user =====================================

const userCreate=async (req,res)=>{
   try {
    let reqData=req.body
    if(Object.keys(reqData).length==0) return res.status(404).send({status:"failed",message:"data not found in body"})
    const {name,password,Designation,Username}=reqData
    for(let el of ["name","password","Designation","Username"]){
        if(!reqData[el]) return  res.status(404).send({status:"failed",message:`${el} is required`})
    }
    
    if(!str(name)) return res.status(400).send({
        status:"failed",
        message:"name should be in string"
    })

    if(!(Designation =="admin" || Designation=="supervisor")) return res.status(400).send({
        status:"failed",
        message:"name should be only 'admin' or 'supervisor'"
    })

    if(!usName(Username)) return res.status(400).send({
        status:"failed",
        message:"username should be in string"
    })

    if(!pass(password)) return res.status(400).send({
        status:"failed",
        message:"password should be in string"
    })

    if(await userSchema.findOne({Username})) return res.status(400).send({
        status:"failed",
        message:"Username should be unique"
    })
   let data=await userSchema.create(reqData)

    res.status(201).send({status:"success",data:{name:data.name,Username:data.Username,password:data.password,Designation:data.Designation}})
    

   } catch (err) {
    res.status(500).send({
        status:"failed",
        message:err.message
    })
    
   }
    
}


// =============================================== login ===================================


const login=async (req,res)=>{
    try {
        const {Username,password}=req.body
        if(!Username) return res.status(400).send({status:"failed",message:"Username should be enter"})
        if(!password) return res.status(400).send({status:"failed",message:"password should be enter"})

        let data=await userSchema.findOne(req.body)
        if(!data) return res.status(404).send({status:"failed",message:"user not found with this username and password"})

        let token=jwt.sign({
            name:data.name,
            Designation: data.Designation
        },"ashishTripathi")
        res.header("token",token)
        console.log(token)
        res.status(200).send({
            status:"success",
            data:`${token}`
        })
        
    } catch (err) {
        res.status(500).send({status:"failed",message:err.message})
    }
}

module.exports={userCreate,login}