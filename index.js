const io=require("socket.io")(8900,{
    cors:{
        origin:"https://magnificent-kashata-c33ff9.netlify.app"
        // origin:"https://localhost:5173"
    },
});
let users=[]
// console.log(users)
const adduser=(userid,socketid)=>{
    !users.some((user)=>user.userid===userid) &&
    users.push({userid,socketid})
    // console.log(users)
}
const removeuser=(socketid)=>{
    users=users.filter((user)=>user.socketid !==socketid)
}

const getuser=(userid)=>{
    return users.find((user)=>user.userid === userid)
}


//for conncetion esdtablishment
io.on("connection", (socket) => {
    console.log("socket.id")
    // io.emit("welcome","this is the socket server")
    socket.on("adduser",(userid)=>{
         adduser(userid,socket.id)
         io.emit("getuser",users)
    })
    // console.log(users)
//send msg
socket.on("sendmessage",({senderid,receiverid,text})=>{
    console.log(receiverid)
    // console.log(text)
    const user=getuser(receiverid)
    // console.log(user)
    io.to(user.socketid).emit("getmessage",{
        senderid,text
    })
})


    //for the dissconnection
    socket.on("disconnect",()=>{
        console.log("a user disconnecrted")
        removeuser(socket.id)
        io.emit("getuser",users)

    })
})
