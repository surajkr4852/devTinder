const express=require("express");
const connectDB=require("./config/database");
const app=express();
const User=require("./models/user");
const validateSignUpData=require("./utils/validation");
const bcrypt=require("bcrypt");

app.use(express.json());// Built-in middleware to convert JSON into JavaScript object

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
})

//Get user by email
app.get("/user",async (req,res)=>{
    const userEmail=req.body.emailId;
    try{
        const users=await User.find({emailId:userEmail});// Returns Array of objects(Users).
        if(users.length===0){
            res.status(404).send("User Not Found....!");
        }else{
            res.send(users);
        }
        
    }catch(err){
        res.status(400).send("Something went wrong...!");
    }
});

//Feed API(shows all users from database) -GET /feed 
app.get("/feed",async (req,res)=>{
    try{
        const users= await User.find({});
        res.send(users);
    }catch(err){
        res.status(400).send("Something went wrong...!")
    }
})

//Delete a user from database.
app.delete("/user",async(req,res)=>{
    const userId=req.body.userId;
    try{
        await User.findByIdAndDelete(userId);// same as ({_id:userId});
        res.send("User deleted Successfully");
    }catch(err){
        res.status(400).send("Something went wrong....!");
    }
})

//Update data of a user.
app.patch("/user/:userId",async(req,res)=>{
    const userId=req.params?.userId;
    const data=req.body;

    try{
        const ALLOWED_UPDATES=["about","gender","age","skills","photoUrl"];

        const isUpdateAllowed=Object.keys(data).every((k)=>
            ALLOWED_UPDATES.includes(k)
        );
        if(!isUpdateAllowed){
            throw new Error("Update not allowed");
        }
        if(data?.skills.length>10){
            throw new Error("Skills cannot be more than 10");
        }
        await User.findByIdAndUpdate({_id:userId},data,{runValidators:true});
        res.send("User updated Successfully");
    }catch(err){
        res.status(400).send("Update failed "+err.message);
    }
})

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