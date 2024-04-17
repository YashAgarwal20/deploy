const Messages=require("../models/message-model");
const addMessage=async(req,res,next)=>{
    try {
        
        const {from,to,message}=req.body;
        const data=await Messages.create({
            message:{text:message},
            users:[from,to],
            sender:from,
        });
        
        if(data) return res.json({msg:"Message added successfully."});
        if(!data) return res.json({msg:"Failed to add message to databse"});


        
    } catch (error) {
        next(error);
    }

}

const getAllMessage=async(req,res,next)=>{
    try {
        const {from,to}=req.body;
        const messages=await Messages.find({
            users:{
                $all:[from,to],
            }
        }).sort({updatedAt:1});
     const projectedMessages=messages.map((msg)=>{
        return {
            fromSelf:msg.sender.toString()===from,
            message:msg.message.text,

        };
     });
     res.json(projectedMessages); 

    } catch (error) {
        next(error);
        
    }

}



module.exports={addMessage,getAllMessage};