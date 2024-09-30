// over here i will define what a user inside the database is .

const mongoose=require("mongoose");

const userSchema= mongoose.Schema({
    // pass all the the parameters that define a user
    firstName:{
        type:String
    },
    lastName:String,
    emailId:String,
    password:String,
    age:Number,
    gender:String
});

// To use our schema definition, we need to convert our schema into a Model we can work with. 

module.exports=mongoose.model("User",userSchema);
;