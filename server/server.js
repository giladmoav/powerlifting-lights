import Express from "express"
import bcrypt from "bcrypt"
import 'dotenv/config'
import cors from "cors"
import './wshandler.js'
import session from "express-session"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"


const app = Express()
app.use(Express.json())
app.use(cors({
    origin: ["http://192.168.1.134:3000"],
    methods: ["GET", "POST"],
    credentials: true
}))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))

const users = []
const PASSWORD = await bcrypt.hash("ABCD", 10)

app.use(
    session({
        secret: "1234",
        saveUninitialized: true,
        resave: false,
        cookie: {
            httpOnly: true,
            maxAge: 36000000,
        }
    })
)

app.get('/logout', (req, res) => {
    if (req.session.loggedIn){
      req.session.loggedIn = 0
    }
})

app.post('/login', async (req, res) => {
    if (req.session.loggedIn && req.session.loggedIn === 1){
      console.log(123)
        res.send('already logged!')
        return;
    } else if (!req.body.password) {
      console.log(423)
      res.status(400).send({ message: 'Problem with login'})
      return;
    }
    try {
      if(await bcrypt.compare(req.body.password, PASSWORD)) {
      console.log(173)
        req.session.loggedIn = 1
        res.send('logged!')
      } else {
      console.log(823)
        res.send({ message: 'Problem with login'})
      }
    } catch {
      console.log(923)
      res.status(500).send({ message: 'Problem with login'})
    }
  })


// mongoose.connect(process.env.DATABASE_ACCESS, () => console.log("DB connected"))
app.listen(8080, () => console.log("server is running"))