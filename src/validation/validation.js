const mongoose=require("mongoose")
const str=(st)=>{
    return /[A-Za-z]/.test(st)
}
const num=(n)=>{
    return /[0-9]/.test(n)
}
const usName=(name)=>{
    return /^[A-Za-z][A-Za-z0-9_]{5,29}$/.test(name)
}
const email=(em)=>{
    return  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(em)
}
const pass=(pass)=>{
    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(pass)
}
const objId=(id)=>{
    return mongoose.isValidObjectId(id)
}


module.exports={str,num,email,pass,usName,objId}