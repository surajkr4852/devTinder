const express=require("express");
const {userAuth}=require("../middlewares/auth");

const requestRouter=express.Router();

// Send connection request 
requestRouter.post("/sendConnectionRequest",userAuth,async (req,res)=>{
    const user=req.user;

    //Sending connection request
    console.log("User is Sending connection request...");

    res.send(user.firstName+" Sent the connection Request!");
});

module.exports=requestRouter;