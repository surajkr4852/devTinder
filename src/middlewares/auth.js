const adminAuth=(req,res,next)=>{
    console.log("Admin auth is getting checked!");
    const token="as";
    const isAdminAuthorized= token==="xyz";
    if(!isAdminAuthorized){
        res.status(401).send("UnAuthorized Request");
    }else{
        next();
    }
}
const userAuth=(req,res,next)=>{
    console.log("Admin auth is getting checked!");
    const token="as";
    const isAdminAuthorized= token==="xyz";
    if(!isAdminAuthorized){
        res.status(401).send("UnAuthorized Request");
    }else{
        next();
    }
}
module.exports= {
    adminAuth,
    userAuth,
};