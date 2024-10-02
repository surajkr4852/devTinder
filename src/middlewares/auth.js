const jwt=require("jsonwebtoken");
const User=require("../models/user");

const userAuth = async (req,res,next)=>{
    try{
        // Read the token from req.cookies
        const {token}=req.cookies;
        if(!token){
            throw new Error("Token is not Valid!!!!");
        }
        //Validate the token
        const decodedObj=await jwt.verify(token,"Dev@$123");
        const {_id}=decodedObj;

        // Find the User
        const user= await User.findById(_id);
        if(!user){
            throw new Error("User not Found..!");
        }
        req.user=user;// Attaching user data to req object, to access it inside req handler function
        next();
    }catch(err){
        res.status(400).send("ERROR : "+err.message);
    }
}
module.exports={userAuth};