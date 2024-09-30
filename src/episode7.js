const express=require("express");
const connectDB=require("./config/database");
const app=express();
const User=require("./models/user");

app.use(express.json());// Built-in middleware to convert JSON into JavaScript object

app.post("/signup",async (req,res)=>{
    // Creating a new instance of the User Model
    const user=new User(req.body);
    try{
        await user.save()
        res.send("User data is saved successfully");
    }catch(err){
        console.log("Error saving to database");
    }
})

connectDB()
    .then(()=>{
        console.log("DB connection successfull");
        app.listen(7777,()=>{
            console.log("Server is listening at port number 7777...!");
        })
    }).catch((err)=>{
        console.error("Cannot cannot be connected");
    })