const mongoose=require("mongoose");

const connectDB=async()=>{
    await mongoose.connect(
        "mongodb+srv://suraj:xPblIKqjvnkQ0TW4@namastenode.f3rcv.mongodb.net/devTinder"
    );// connecting to cluster,there are many db inside that cluster
};
module.exports=connectDB;
