// TODO cool crypto shit 
import { Server } from "socket.io";
import jwt from "jsonwebtoken"
import 'dotenv/config'


const io = new Server(8081, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ["GET", "POST"]
    }
})

// const jwtCheckAuth = (socket, next) => { // TODO
//     const {token} = socket.handshake.query
//     if (token) {
//         jwt.verify(req.body.token, process.env.JWT_SECRET, (err, decoded) => {
//             if (!err) {
//                 next()
//             }
//         })
//     }
// }

// io.use(jwtCheckAuth)

console.log("started server")
const board = {left: 4, head: 4, right: 4}
io.on("connection", (socket) => {
    console.log("connected ws")
    socket.on("timer.start", (arg) => {
        io.emit("timer.start")
    })
    socket.on("timer.reset", (arg) => {
        io.emit("timer.reset")
    })
    socket.on("board.choose", (side, choice) => {
        console.log(side, choice)
        if (side === "left") {
            board["left"] = choice
        } else if (side === "head") {
            board["head"] = choice
        } else if (side === "right") {
            board["right"] = choice
        }
        io.emit("board", board)
    })
    socket.on("board.clear", () => {
        board["left"] = 4
        board["head"] = 4
        board["right"] = 4
        io.emit("board", board)
    })
    
})