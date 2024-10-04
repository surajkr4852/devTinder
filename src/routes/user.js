const express=require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User=require("../models/user");

const userRouter=express.Router();

// Get all the pending connection requests for the logged in user
userRouter.get("/user/requests/received",userAuth,async(req,res)=>{
    try{
        const loggedInUser=req.user;
        const connectionRequests= await ConnectionRequest.find({
            toUserId:loggedInUser._id,
            status:"interested"
        }).populate("fromUserId","firstName lastName photoUrl about skills gender age"); //   2nd argument=>  ,["firstName","lastName"]
                    // OR
     // }).populate("fromUserId",["firstName","lastName"]);

        res.json({
            message:"Data fetched Successfully",
            data:connectionRequests
        });
    }catch(err){
        req.status(400).send("ERROR : "+err.message);
    }
})

// Get all connections of the logged in user
userRouter.get("/user/connections",userAuth,async(req,res)=>{
    try{
        const loggedInUser=req.user;
        const connectionRequests=await ConnectionRequest.find({
            $or:[
                {toUserId:loggedInUser._id,status:"accepted"},  // First condition
                {fromUserId:loggedInUser._id,status:"accepted"},  // second condition
            ],
            
        }).populate("fromUserId","firstName lastName gender age photoUrl about skills").populate("toUserId","firstName lastName gender age photoUrl about skills");

        const data=connectionRequests.map((row)=>{
            if(row.fromUserId._id.toString()===loggedInUser._id.toString()){
                return row.toUserId;
            }
            return row.fromUserId;
        });

        res.json({
            data
        })
    }
    catch(err){
        res.status(400).json({message:err.message});
    }
});

// Feed API
userRouter.get("/feed",userAuth,async(req,res)=>{
    try{
        const page=parseInt(req.query.page) || 1;
        let limit=parseInt(req.query.limit) ||10;   //it will be a string so convery to integer 
        limit= limit>50? 50:limit;
        const skip=(page-1)*limit;


        //User should see all the cards except
        // 1.his own card
        // 2.his connections
        // 3.ignored people
        // 4.already sent connection request

        const loggedInUser=req.user;

        // Find all connection requests (sent + received);
        const connectionRequests=await ConnectionRequest.find({
            $or:[
                {fromUserId:loggedInUser._id},
                {toUserId:loggedInUser._id}
            ]
        }).select("toUserId fromUserId");
         
        // Block above users from feed
        const hideUsersFromFeed=new Set()// Set store unique elements
        connectionRequests.forEach(req => {
            hideUsersFromFeed.add(req.toUserId.toString());
            hideUsersFromFeed.add(req.fromUserId.toString());
        });
        // console.log(hideUsersFromFeed); These are the peoples whom i want to hide from my feed

        // Find users whole _id is not present in hideUsersFromFeed array and ignore own card too
        const users=await User.find({
            $and:[
                {_id:{ $ne :loggedInUser._id}},// ignore own card also
                { _id:{ $nin: Array.from(hideUsersFromFeed)}}  // find users whole id is not present in hideUsersFromFeed array
                       // function to convert set into array}
            ]
        }).select("firstName lastName gender age photoUrl about skills").skip(skip).limit(limit);
        
        res.send(users);
    }
    catch(err){
        res.status(400).json({message:err.message});
    }
})
module.exports=userRouter;