const mongoose=require("mongoose");
const URI = process.env.MONGO_URL;
const connectionDb=async()=>
{
    const connection=await mongoose.connect(URI);
    console.log("database connection success");

}
module.exports=connectionDb;