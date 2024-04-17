require("dotenv").config();
const express=require("express");
const cors=require("cors");
const app=express();
const  Socket  = require("socket.io");
 const http=require('http');
 
const userRoutes=require("./routes/userroutes");
const messageRoutes=require("./routes/messages-routes");
const connectionDb=require("./utils/connection");




app.use(cors());
app.use(express.json());
app.use("/api/auth",userRoutes);
app.use("/api/messages",messageRoutes)

const server=http.createServer(app);

connectionDb().then(
    server.listen(process.env.PORT,()=>
    {
        console.log(`server running on port ${process.env.PORT}`);
    })
).catch((err)=>{console.log(err.message)});

const io=Socket(server,{
    cors:{
        origin:"http://localhost:5173",
        credentials:true,
    },
});


global.onlineUsers = new Map();
  io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
      onlineUsers.set(userId, socket.id);
    });
  
    socket.on("send-msg", (data) => {
      const sendUserSocket = onlineUsers.get(data.to);
      if (sendUserSocket) {
        socket.to(sendUserSocket).emit("msg-receive", data.msg);
      }
    });
  });


module.exports = app;
