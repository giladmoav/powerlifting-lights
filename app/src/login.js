import React, {useState, useContext, useEffect} from "react"
import Axios from "axios"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "./context"

function Login() {
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const navigate = useNavigate()
    // const {logged, setLogged} = useContext(AuthContext)

    Axios.defaults.withCredentials = true

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            Axios.post("http://localhost:8080/login", {
                token: token
            }).then((res) => {
                if (res.data.auth) {
                    navigate('/referee')
                }
            })
        }
    }, []);

    const login = (e) => {
        e.preventDefault()
        Axios.post("http://localhost:8080/login", {
            password: password,
            name: name
        }).then((res) => {
            console.log(res)
            if (res.data.auth) {
                localStorage.setItem("token", res.data.token)
                // setLogged(true)
                navigate("/referee")
            }
            else {
                alert(res.data.message)
            }
        })
    }

    const changeName = (e) => {
        setName(e.target.value)
    }

    const changePassword = (e) => {
        setPassword(e.target.value)
        if (e.key === "Enter") {
            login()
        }
    }

    return (
        <div className="center">
            <div>
                <h1>Login</h1>
                <form onSubmit={login}>
                    <input type="text" placeholder="name...." onChange={changeName}/>
                    <input type="text" placeholder="passwrod...." onChange={changePassword}/>
                    <input type="submit" value={"Login"}/>
                </form>
            </div>
        </div>
    )
}

export default Login