// TODO cool crypto shit 
import { Server } from "socket.io";
import 'dotenv/config'


const io = new Server(8081, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ["GET", "POST"]
    }
})

console.log("started server")
io.on("connection", (socket) => {
    console.log("connected ws")
    socket.on("timer.start", (arg) => {
        io.emit("timer.start")
    })
    socket.on("timer.reset", (arg) => {
        io.emit("timer.reset")
    })
    socket.on("right", (arg) => {
        io.emit("right", arg)
    })
    socket.on("head", (arg) => {
        io.emit("head", arg)
    })
    socket.on("left", (arg) => {
        io.emit("left", arg)
    })
    socket.on("board.clear", (arg) => {
        io.emit("board.clear", arg)
    })
})