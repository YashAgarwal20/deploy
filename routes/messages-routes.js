const express=require("express");
const router=express.Router();
const {addMessage,getAllMessage}=require("../controllers/message-controller");

router.route("/addmessage").post(addMessage);
router.route("/getmsg").post(getAllMessage);

module.exports=router;