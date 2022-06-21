import React, {useState, useEffect, useContext} from "react"
import Axios from "axios"
import { UserContext } from './context'
import { useNavigate } from "react-router-dom"

function Login() {
    const [password, setPassword] = useState("")
    const {loginState, setLogin} = useContext(UserContext)
    let navigate = useNavigate()

    Axios.defaults.withCredentials = true

    const login = () => {
        console.log(password)
        Axios.post("http://localhost:8080/login", {
            password: password
        }).then((res) => {
            console.log(res)
            if (res.data.message) {
                console.log(res.data.message)
                alert("oof")
            }
            else {
            setLogin(true)
            navigate("/referee")
            }
        })
    }

    const changePassword = (e) => {
        console.log(e.target.value)
        setPassword(e.target.value)
        if (e.key === "Enter") {
            login()
        }
    }

    return (
        <div className="center">
            <div>
                <h1>Login</h1>
                <input type="text" placeholder="passwrod...." onKeyUp={changePassword}/>
                <button onClick={login}> Login </button>
            </div>
        </div>
    )
}

export default Login