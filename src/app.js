const express=require("express");

const app=express();

app.use("/",(req,res)=>{ // Req handler function
    res.send("Hello from the DashBoard!");
});
app.use("/test",(req,res)=>{ // Req handler function
    res.send("Hello from the server!");
});

app.use("/hello",(req,res)=>{ // Req handler function
    res.send("Hello Hello Hello...");
});
app.listen(7777,()=>{
    console.log("Server is Successfully listening on port 7777...");
});

// sudo npm install -g nodemon // -g installed at global level will be installed at system level,not project level
                                        // will work for all projects present
                                        // nodemon src/app.js
                                        // it will automatically update the server , when i will make changes