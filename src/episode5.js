// MiddleWares and Error Handlers

const express=require("express");

const app=express();

const {adminAuth,userAuth}=require("./middlewares/auth");

app.use("/admin",adminAuth);

app.get("/user",userAuth,(req,res)=>{
    res.send("user data sent");
});

app.get("/admin/getAllData",(req,res,next)=>{
    res.send("All data sent");
});

app.get("/admin/deleteUser",(req,res,next)=>{
    res.send("Deleted a User");
});






// app.use("/",(req,res,next)=>{
//     next();
// })
// // This will handle any kind of http methods.
// app.use("/user",(req,res,next)=>{
//     // Route Handler
//     console.log("Handling the route user 1");
//     next();
// },(req,res,next)=>{
//     // Route handler 2.
//     console.log("Handling the route user 2");
//     next();
// });

// app.use("/user",(req,res,next)=>{
//     // Route Handler
//     console.log("Handling the route user 3");
//     res.send("3rd response");
// });

app.listen(7777,()=>{
    console.log("Server is successfully listining on port 7777....");
});