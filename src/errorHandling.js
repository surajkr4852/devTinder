const express=require("express");

const app=express();

app.get("/user",(req,res)=>{
    //Logic of DB call and get user data.
    throw new Error("error");
    res.send("user data sent");
});

// if there is error in any route , it will handle it.
app.use("/",(err,req,res,next)=>{
    if(err){
        
        res.status(500).send("Something Went Wrong !");
    }
})

app.listen(7777,()=>{
    console.log("Server is listening on part no 7777...!");
})