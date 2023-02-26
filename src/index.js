const express=require("express")
const mongoose=require("mongoose")
const route=require('./routes/route')
const app=express()

app.use(express.json())

mongoose.connect("mongodb+srv://Ashish_Tripathi29:Ashish555@cluster0.bxcrqqa.mongodb.net/Algo8",{
    useNewUrlParser: true
})
.then(()=>console.log("mongodb is connected"))
.catch(err=>console.log(err.message))

app.use('/',route)


app.listen(3000 ,()=>console.log("app is running on 3000 port number"))
