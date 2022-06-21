// TODO cool crypto shit 
import { Server } from "socket.io";
import 'dotenv/config'


const io = new Server(8081, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ["GET", "POST"]
    }
})

let board = {left: 4, head: 4, right: 4}
console.log("started server")
io.on("connection", (socket) => {
    console.log("connected ws")
    socket.on("timer.start", (arg) => {
        io.emit("timer.start")
    })
    socket.on("timer.reset", (arg) => {
        io.emit("timer.reset")
    })
    socket.on("board.choose", (side, choice) => {
        console.log("choose" + side + choice)
        if (side === "left"){
            board = {...board, left: choice}
        } else if (side === "right") {
            board = {...board, right: choice}
        } else if (side === "head") {
            board = {...board, head: choice}
        }
        io.emit("board", board)
    })
    socket.on("board.clear", (arg) => {
        board = {left: 4, head: 4, right: 4}
        io.emit("board", board)
    })
})