const express=require("express");
const {userAuth}=require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User=require("../models/user");

const requestRouter=express.Router();

// Send connection request to any user
// requestRouter.post("/request/send/:status/:toUserId",       // Intern Level Send connection code
//     userAuth,// this gives the logged in user details in the req.user
//     async (req,res)=>{
//     try{
//         const fromUserId=req.user._id;
//         const toUserId=req.params.toUserId;
//         const status=req.params.status;

//         const connectionRequest=new ConnectionRequest({
//             fromUserId,
//             toUserId,
//             status
//         });
//         const data=await connectionRequest.save();
//         res.json({
//             message:"Connection Request Sent Successfully !",
//             data,
//         })
//     }catch(err){
//         res.status(400).send("ERROR :"+err.message);
//     }
// });

// Expert level code for Send connection request to any user

requestRouter.post("/request/send/:status/:toUserId",
    userAuth,// this gives the logged in user details in the req.user
    async (req,res)=>{
    try{
        const fromUserId=req.user._id;
        const toUserId=req.params.toUserId;
        const status=req.params.status;

        //if User tries to send request to himself
        if(fromUserId===toUserId);

        // Status validation , can only be interested or ignored
        const allowedStatus=["interested","ignored"];
        if(!allowedStatus.includes(status)){
            return res.status(400).json({message:"Invalid Status type !" + status})
        }
        // Check if toUserId user is present or not  in the Database.
        const toUser=await User.findById(toUserId);
        if(!toUser){
            res.status(400).json({message:"User not found"});
        }
 

        // Check if there is existing connection request (connection req is pending from A to B or , From B to A)
        // if this is the case then sender should not be allowed to send request once again.
        const existingConnectionRequest=await ConnectionRequest.findOne({
            $or:[   // This is how to write OR condition on mongoose
                {fromUserId,toUserId},// First condition
                {fromUserId:toUserId,toUserId:fromUserId} // Second condition
            ]
        });
        if(existingConnectionRequest){
            res.status(400).json({message:"Connection Request Already Exist"});
        }

        const connectionRequest=new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        });
        const data=await connectionRequest.save();
        res.json({
            message:req.user.firstName+" is "+status+" in "+toUser.firstName,
            data,
        })
    }catch(err){
        res.status(400).send("ERROR :"+err.message);
    }
});


requestRouter.post("/request/review/:status/:requestId",
    userAuth,
    async(req,res)=>{
        try{
            const loggedInUser=req.user;
            const {status,requestId}=req.params;

            // Validate the status in url ,it should be accepted or rejected only
            const allowedStatus=["rejected","accepted"];
            if(!allowedStatus.includes(status)){
                return res.status(400).json({message:"Status not allowed!"});
            }

            // Validate request ,the request should be present in our Database
            const connectionRequest= await ConnectionRequest.findOne({
                _id:requestId,  //  it will check RequestId should be valid
                toUserId:loggedInUser._id,// this will check loggedInUser =toUserId
                status:"interested" // Status should be interested only
            });
            if(!connectionRequest){
                return res.status(400).json({message:"Connection Request not found"});
            }
            connectionRequest.status=status;// it will change the status to accepted or rejected.
            const data=await connectionRequest.save();
            res.json({
                message:"Connected request "+status,
                data
            });
        }
        catch(err){
            res.status(400).send("ERROR : "+err.message);
        }
    });

module.exports=requestRouter;