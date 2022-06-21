
import io from "socket.io-client"
import React, {useState, useEffect, useContext} from "react"
import { UserContext } from './context'
import Axios from "axios"
import { Navigate } from "react-router-dom"
const socket = io.connect("ws://localhost:8081")

function Referee(){
    const [side, setSide] = useState("")
    const [timerState, setTimer] = useState(true)
    const { login, setLogin } = useContext(UserContext)
    const sendChoice = (choice) => {
        console.log(choice)
        if (side == ""){
            alert("you should choose side")
        }
        socket.emit("board.choose",side, choice)
    }
    const clear = () => {
        socket.emit("board.clear")
    }
    const timer = () => {
        if (timerState){
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
        setLogin(false)
    }
    const Judge = () => {
        if (side == "left" || side == "right"){
        return (
            <div>
                <button onClick={() => sendChoice(0)}> WHITE </button>
                <button onClick={() => sendChoice(1)}> RED </button>
                <button onClick={() => sendChoice(2)}> BLUE </button>
                <button onClick={() => sendChoice(3)}> YELLOW </button>
            </div>
        )} else if (side == "head") {
        return (
            <div>
                <button onClick={() => sendChoice(0)}> WHITE </button>
                <button onClick={() => sendChoice(1)}> RED </button>
                <button onClick={() => sendChoice(2)}> BLUE </button>
                <button onClick={() => sendChoice(3)}> YELLOW </button>
                <button onClick={timer}> TIMER </button>
                <button onClick={clear}> CLEAR </button>
            </div>
        )}
    }
    console.log(login)
    if (login) {
    return(
    <div className="center">
        <div style={{color: 'white'}} onChange={changeValue}>
            <input type="radio" value="right" name="side" /> Left
            <input type="radio" value="head" name="side" /> Head
            <input type="radio" value="left" name="side" /> Right
        </div>
        <Judge />
        <button onClick={() => logOut()} > logout</button>
    </div>
    )} else {
        return(<Navigate to="/login" replace={true} />)
    }
}

export default Referee;