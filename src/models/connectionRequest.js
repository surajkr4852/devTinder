const mongoose=require("mongoose");
const connectionRequestSchema=new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,

        ref:"User", // reference to the User collection
                    //you say that  fromUserId is a reference to the user collection,
                    // This says that this fromUserId is the id of from the user collection
        required:true,
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    status:{
        type:String,
        enum:{
            values:["ignored","interested","accepted","rejected"],
            message:`{VALUE} is incorrect status type`
        },
        required:true
    }
},{
    timestamps:true,
});
connectionRequestSchema.pre("save",function(next){
    const connectionRequest=this;
    // Check if the fromUserId is same as toUserId.
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("Cannot send connection request to yourself! ");
    }
    next();// never forget to call this next(),because this function is like middleware
})

// Compound index
connectionRequestSchema.index({fromUserId:1})

const ConnectionRequestModel= new mongoose.model("ConnectionRequestModel",connectionRequestSchema);

module.exports=ConnectionRequestModel;