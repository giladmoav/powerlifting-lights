import Express from "express"
import bcrypt from "bcrypt"
import 'dotenv/config'
import cors from "cors"
import './wshandler.js'
import bodyParser from "body-parser"
import jwt from "jsonwebtoken"


const app = Express()
app.use(Express.json())
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
}))
app.use(bodyParser.urlencoded({ extended: true }))

const PASSWORD = await bcrypt.hash("ABCD", 10)

app.get('/logout', (req, res) => {
})

app.post('/login', async (req, res) => {
    if (req.body.token) {
      jwt.verify(req.body.token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          res.json({auth: false, message: "Problem with Login"})
        } else {
          res.json({auth: true, name: decoded.name})
        }
      })
    } else {
      try {
        if(await bcrypt.compare(req.body.password, PASSWORD)) {
          const token = jwt.sign(req.body.name, process.env.JWT_SECRET)
          res.json({auth: true, name: req.body.name, token: token})
        } else {
          res.json({auth: false, message: "Wrong password"})
        }
      } catch {
        res.status(500).json({auth: false, message: "Problem with Login"})
      }
  }})


app.listen(8080, () => console.log("server is running"))