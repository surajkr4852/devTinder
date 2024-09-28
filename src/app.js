const express=require("express");

const app=express();

//This will only handle HTTP GET api call to user
app.get("/user",(req,res)=>{
    res.send({firstName:"Suraj",lastName:"Kumar"});
});

//This will only handle POST api call to user
app.post("/user",(req,res)=>{
    console.log("Save data to the database");
    res.send("data successfully saved");
});

app.delete("/user",(req,res)=>{
    res.send("User deleted");
});
// This will handle all API request to test
app.use("/test",(req,res)=>{ // Req handler function
    res.send("Hello from the server!");
});
app.listen(7777,()=>{
    console.log("Server is Successfully listening on port 7777..."); 
});



