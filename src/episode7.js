const express=require("express");
const connectDB=require("./config/database");
const app=express();
const User=require("./models/user");

app.use(express.json());// Built-in middleware to convert JSON into JavaScript object

app.post("/signup",async (req,res)=>{ // Saving data into database.
    // Creating a new instance of the User Model
    const user=new User(req.body);
    try{
        await user.save()
        res.send("User data is saved successfully");
    }catch(err){
        console.log("Error saving to database");
    }
})

//Get user by email
app.get("/user",async (req,res)=>{
    try{
        const users=await User.find({emailId:req.body.emailId});
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

connectDB()
    .then(()=>{
        console.log("DB connection successfull");
        app.listen(7777,()=>{
            console.log("Server is listening at port number 7777...!");
        })
    }).catch((err)=>{
        console.error("Cannot cannot be connected");
    })