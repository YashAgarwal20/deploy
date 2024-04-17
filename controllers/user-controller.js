const User=require("../models/use-model");
const bcrypt=require("bcrypt");
const Register=async(req,res,next)=>
{
    try {
        const {username,email,password}=req.body;
        
    const isusernameExist=await User.findOne({username});
    if(isusernameExist)
    {
        return res.json({message:"User already exixst",status:false});
    }
    const isemailExist=await User.findOne({email});
    if(isemailExist)
    {
        return res.json({message:"Email already exixst",status:false});
    }

    const user=await User.create({username,email,password})
    delete user.password;
    return res.json({status:true,user});
    } catch (error) {
        next(error);
    }
    

}

const Login=async(req,res,next)=>
{
    try {
        const {username,password}=req.body;
    const isusernameExist=await User.findOne({username});
    if(!isusernameExist)
    {
        return res.json({message:"Username doesnot exists",status:false});
    }

    const ispassword=await bcrypt.compare(password,isusernameExist.password);
    if(!ispassword)
    {
        res.json({message:"Invalid credentials",status:false});
    }
    const user=await User.findOne({username});
    delete user.password;
    return res.json({status:true,user});
    } catch (error) {
        next(error);
    }


}
const Avatar=async(req,res,next)=>
{
    try {
        const userId=req.params.id;
        const avatarImage=req.body.image;
        const userData=await User.findByIdAndUpdate(userId,{
            isAvatarImageSet:true,
            avatarImage,
        });
    
        return res.json({
            isSet:true,
            image:avatarImage,
        });
        
    } catch (error) {
        next(error);
    }


}

const AllUsers=async(req,res,next)=>
{
    try {
        const users=await User.find({_id:{$ne:req.params.id}}).select([
            "email","username","avatarImage","_id",
        ]);
        return res.json(users);
        
    } catch (error) {
        next(error);
    }
}
module.exports={Register,Login,Avatar,AllUsers};