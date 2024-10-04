const express=require("express");
const connectDB=require("./config/database");
const app=express();
const cookieParser = require("cookie-parser");


app.use(express.json());// Built-in middleware to convert JSON into JavaScript object
app.use(cookieParser());

const authRouter=require("./routes/auth");// express.Router();
const profileRouter=require("./routes/profile");
const requestRouter=require("./routes/request");
const userRouter=require("./routes/user");

app.use("/",authRouter)// Whenever a request is coming at "/" , go to authRouter and check all the 
            // router inside it,if there is any route which is matching, the expressRouter acts as middleware here.

app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);
connectDB()
    .then(()=>{
        console.log("Database Connected successfully");
        app.listen(7777,()=>{
            console.log("Server is listening at port number 7777...!");
        })
    }).catch((err)=>{
        console.error("Database Cannot be connected");
    }
);