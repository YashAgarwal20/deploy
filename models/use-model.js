const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const userSchema=new mongoose.Schema({
    username:{type:String,required:true,min:3,max:20,unique:true},
    email:{type:String,required:true,unique:true,max:50},
    password:{type:String,required:true,min:8},
    isAvatarImageSet:{type:Boolean,default:false},
    avatarImage:{type:String,default:""},
    

});

userSchema.pre("save",async function(next){
    if(!this.isModified("password"))
    {
        return next();
    }
    const hashpassword=await bcrypt.hash(this.password,10);
    this.password=hashpassword;
    next();

})

const User=new mongoose.model("User",userSchema);
module.exports=User;