// over here i will define what a user inside the database is .

const mongoose=require("mongoose");
const validator = require('validator');
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

const userSchema= mongoose.Schema(
    {
    // pass all the the parameters that define a user
    firstName:{
        type:String,
        required:true,
        minLength:4,
        maxLength:50
    },
    lastName:{
        type:String,
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        lowercase: true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email address "+value);
            }
        }
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter a strong password...!");
            }
        }
    },
    age:{
        type:Number,
        min:18,
        max:60,
    },
    gender:{
        type:String,
        validate(value){ // Custom Validation
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender data is not valid");
            }
        },
    },
    photoUrl:{
        type:String,
        default:"https://www.pngitem.com/pimgs/m/272-2720656_user-profile-dummy-hd-png-download.png",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid photo URL "+value);
            }
        }
    },
    about:{
        type:String,
        default:"This is a default about of the user!",
    },
    skills:{
        type:[String]
    }
    },
    {
        timestamps: true
    }
);

//Every user will have their own JWT token.
userSchema.methods.getJWT=async function (){// this function will not work with arrow function
    const user=this;// "this " is referencing to the current instance

    const token=await jwt.sign({_id:user._id},"Dev@$123",{
        expiresIn:"1d",
    });
    return token;
}

userSchema.methods.validatePassword= async function(passwordInputByUser){
    const user=this;
    const passwordHash=this.password;
    const isPasswordValid=await bcrypt.compare(passwordInputByUser,passwordHash);
    return isPasswordValid;
}
// To use our schema definition, we need to convert our schema into a Model we can work with. 

module.exports=mongoose.model("User",userSchema);