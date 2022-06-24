// TODO cool crypto shit 
import { Server } from "socket.io";
import jwt from "jsonwebtoken"
import 'dotenv/config'


const board = {left: 4, head: 4, right: 4}
const authorizedUsers = []

const io = new Server(8081, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ["GET", "POST"]
    }
})

const jwtCheckAuth = (socket, next) => { // jwt authintication on handshake
    const {token} = socket.handshake.auth
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (!err) {
                authorizedUsers.push(socket.id)
                next()
            }
        })
    }
    next()
}

const checkAuthorized = (socket_id) => {
    return authorizedUsers.includes(socket_id)
}

io.use(jwtCheckAuth)

console.log("started server")
io.on("connection", (socket) => {
    console.log("connected ws")
    socket.on("timer.start", (arg) => {
        if (checkAuthorized(socket.id)) {
            io.emit("timer.start")
        }
    })
    socket.on("timer.reset", (arg) => {
        if (checkAuthorized(socket.id)) {
            io.emit("timer.reset")
        }
    })
    socket.on("board.choose", (side, choice) => {
        if (checkAuthorized(socket.id)) {
            if (side === "left") {
                board.left = choice
            } else if (side === "head") {
                board.head = choice
            } else if (side === "right") {
                board.right = choice
            }
            io.emit("board", board)
        }
    })
    socket.on("board.clear", () => {
        if (checkAuthorized(socket.id)) {
            board.left = 4
            board.head = 4
            board.right = 4
            io.emit("board", board)
        }
    })
    
    socket.conn.on("close", (reason) => {
        const index = authorizedUsers.indexOf(socket.id)
        if (index>-1){
            authorizedUsers.splice(index,1)
        }
    })
    
})