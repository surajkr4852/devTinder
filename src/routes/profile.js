const express=require("express");
const {userAuth}=require("../middlewares/auth");
const profileRouter=express.Router();
const {validateEditProfileData}=require("../utils/validation")

// Get profile of loggedin User
profileRouter.get("/profile/view",userAuth,async(req,res)=>{
    try{
        const user=req.user; 
        res.send(user);
    }
    catch(err){
        res.status(400).send("ERROR : "+err.message);
    }
});

// Profile Edit of LoggedIn user
profileRouter.patch("/profile/edit",userAuth,async (req,res)=>{
    // Validation and Sanitiation
    try{
        if(!validateEditProfileData(req)){
            throw new Error("Invalid Edit Request");
        }
        const loggedInUser=req.user;

        // loggedInUser.firstName=req.body.firstName;
        // OR
        Object.keys(req.body).forEach(key=>loggedInUser[key]=req.body[key]);

        //Save to DB
        await loggedInUser.save();
        res.json({
            message:`${loggedInUser.firstName} your profile updated successfully`,
            data:loggedInUser
        });
    }catch(err){
        res.status(400).send("ERROR : "+err.message);
    }
});

// Change password
profileRouter.patch("/profile/password",async(req,res)=>{
    
})


module.exports=profileRouter;