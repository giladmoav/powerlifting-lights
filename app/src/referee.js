
import React, { useState, useContext, useEffect } from "react"
import Axios from "axios"
import { useNavigate } from "react-router-dom"
import { SocketIOContext, AuthContext } from "./context"

function Referee() {
    const [side, setSide] = useState("")
    const [timerState, setTimer] = useState(true)
    const socket = useContext(SocketIOContext)
    // const {logged, setLogged} = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            navigate('/login')
        } else {
            Axios.post("http://localhost:8080/login", {
                token: token
            }).then((res) => {
                if (!res.data.auth) {
                    navigate('/login')
                }
            })
        }
    }, []);

    const sendChoice = (choice) => {
        if (side === "") {
            alert("you should choose side")
        }
        socket.emit("board.choose", side, choice)
    }

    const clear = () => {
        socket.emit("board.clear")
    }

    const timer = () => {
        if (timerState) {
            socket.emit('timer.start')
        } else {
            socket.emit('timer.reset')
        }
        setTimer(!timerState)
    }

    const changeValue = (e) => {
        setSide(e.target.value)
    }

    const logOut = () => {
        Axios.get("http://localhost:8080/logout")
    }

    const Judge = () => {
        if (side === "left" || side === "right") {
            return (
                <div>
                    <button onClick={() => sendChoice(0)}> WHITE </button>
                    <button onClick={() => sendChoice(1)}> RED </button>
                    <button onClick={() => sendChoice(2)}> BLUE </button>
                    <button onClick={() => sendChoice(3)}> YELLOW </button>
                </div>
            )
        } else if (side === "head") {
            return (
                <div>
                    <button onClick={() => sendChoice(0)}> WHITE </button>
                    <button onClick={() => sendChoice(1)}> RED </button>
                    <button onClick={() => sendChoice(2)}> BLUE </button>
                    <button onClick={() => sendChoice(3)}> YELLOW </button>
                    <button onClick={timer}> TIMER </button>
                    <button onClick={clear}> CLEAR </button>
                </div>
            )
        }
    }

    return (
        <div className="center">
            <div style={{ color: 'white' }} onChange={changeValue}>
                <input type="radio" value="right" name="side" /> Left
                <input type="radio" value="head" name="side" /> Head
                <input type="radio" value="left" name="side" /> Right
            </div>
            <Judge />
            <button onClick={() => logOut()} > logout</button>
        </div>
        )
}

export default Referee;