const express=require("express");
const connectDB=require("./config/database");   //Database connection
const app=express();
const User=require("./models/user");

app.post("/signup",async (req,res)=>{
    const user=new User({
        firstName: "Suraj",
        lastName: "Kumar",
        emailId: "suraj@gmail.com",
        password: "6twt7v",
        age: 25,
        gender: "Male"}
    );// creating a new instance of User Model

    await user.save();
    res.send("User Added Successfully");
});

app.get("/user",(req,res)=>{
    res.send("working fine");
})

connectDB()
    .then(()=>{
        console.log("DB Connection established...");
        app.listen(7777,()=>{
            console.log("Server is running at port numver 7777...!");
        });
    })
    .catch(err=>{
        console.error("Database cannot be connected..");
});