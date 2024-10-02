const express=require("express");
const connectDB=require("./config/database");
const app=express();
const User=require("./models/user");
const validateSignUpData=require("./utils/validation");
const bcrypt=require("bcrypt");
const validator=require("validator");
const cookieParser = require("cookie-parser");
const jwt=require("jsonwebtoken");
const {userAuth}=require("../src/middlewares/auth");


app.use(express.json());// Built-in middleware to convert JSON into JavaScript object
app.use(cookieParser());

// Saving data into database.
app.post("/signup",async (req,res)=>{ 
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
app.post("/login",async (req,res)=>{
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
            res.cookie("token",token);

            res.send("Login Successful!!!");
        }else{
            throw new Error("Invalid Credentials");
        }
    }
    catch(err){
        res.status(400).send("ERROR : "+err.message);
    }
});

//Get profile of loggedin User
app.get("/profile",userAuth,async(req,res)=>{
    try{
        const user=req.user; 
        res.send(user);
    }
    catch(err){
        res.status(400).send("ERROR : "+err.message);
    }
});

// Send connection request 
app.post("/sendConnectionRequest",userAuth,async (req,res)=>{
    const user=req.user;

    //Sending connection request
    console.log("User is Sending connection request...");

    res.send(user.firstName+" Sent the connection Request!");
});

connectDB()
    .then(()=>{
        console.log("DB connection successfully");
        app.listen(7777,()=>{
            console.log("Server is listening at port number 7777...!");
        })
    }).catch((err)=>{
        console.error("Cannot be connected");
    }
);