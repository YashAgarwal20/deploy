const express=require("express");
const router=express.Router();
const {Register,Login,Avatar,AllUsers}=require("../controllers/user-controller");

router.route("/register").post(Register);
router.route("/login").post(Login);
router.route("/setavatar/:id").post(Avatar);
router.route("/allusers/:id").get(AllUsers);
module.exports=router;