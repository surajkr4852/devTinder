const express=require("express");
const authRouter=express.Router();
const {validateSignUpData}=require("../utils/validation");
const User=require("../models/user");
const bcrypt=require("bcrypt");
const validator=require("validator");

// Saving data into database.
authRouter.post("/signup",async (req,res)=>{ 
    try{
        //Validation of data.
        validateSignUpData(req);

        //Encrypt the password and then store
        const {password,firstName,lastName,emailId}=req.body;
        const passwordHash=await bcrypt.hash(password,10);// Encrypting password.

        // Creating a new instance of the User Model
        const user=new User({
            firstName,
            lastName,
            emailId,
            password:passwordHash,
        });
    
        //Saving the user
        await user.save()
        res.send("User Added successfully");
    }catch(err){
        res.status(400).send("ERROR : "+ err.message);
    }
});

// Login API
authRouter.post("/login",async (req,res)=>{
    try{
        const {emailId,password}=req.body;
        // Check if email syntax is valid
        if(!validator.isEmail(emailId)){
            throw new Error("Invalid Credentials");
        }

        // First check if any user is present with that email.
        const user=await User.findOne({emailId:emailId});
        if(!user){
            throw new Error("Invalid Credentials");
        }

        // Check if password matches in DB
        const isPasswordValid=await user.validatePassword(password);
        if(isPasswordValid){
            //Create a JWT Token here, as email and password is validated.
            const token=await user.getJWT();// same=>    jwt.sign({_id:user._id},"Dev@$123",{expiresIn:"7d",});

            //Add the token to cookie and send the response to the user.
            res.cookie("token",token,{
                expires:new Date(Date.now()+ 8*3600000)
            });

            res.send("Login Successful!!!"+user.firstName+" logged in!");
        }else{
            throw new Error("Invalid Credentials");
        }
    }
    catch(err){
        res.status(400).send("ERROR : "+err.message);
    }
});

// Logout API
authRouter.post("/logout",async(req,res)=>{ // No need of authentication
    res.cookie("token",null,{   // set the cookie token to null
        expires:new Date(Date.now()),  // Expire the cookie right there(now).
    }).send("Logout Successful!");
})

module.exports=authRouter;