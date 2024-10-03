const mongoose=require("mongoose");
const connectionRequestSchema=new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
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