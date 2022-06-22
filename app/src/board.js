import React from 'react'
import { useState, useEffect, useContext} from 'react'
import './board.css'
import {ReactComponent as RedRed} from './lights/red-red.svg'
import {ReactComponent as RedYellow} from './lights/red-yellow.svg'
import {ReactComponent as RedBlue} from './lights/red-blue.svg'
import {ReactComponent as White} from './lights/white.svg'

import { SocketIOContext } from './context'

function Timer(props) {
  const [seconds, setSeconds] = useState(props.time);
  const [isActive, setIsActive] = useState(false);
  const socket = useContext(SocketIOContext)

  function toggle() {
    setIsActive(!isActive);
  }

  function reset() {
    setIsActive(false);
    setSeconds(props.time);
  }

  function start() {
    setIsActive(true);
  }

  useEffect(() => {
    socket.on("timer.start", () => {
        start()
    })
    socket.on("timer.reset", () => {
        reset()
    })
  },[])
  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds - 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    if (seconds <= 0) {
        setIsActive(false)
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  return (
    <div style={{
        textAlign: 'center',
        fontSize: '50px',
        color: 'white'
    }}>
        {String(Math.floor(seconds / 60)).padStart(2,'0')}:{String(seconds % 60).padStart(2,'0')}
    </div>
  );
};

function Circle(props) {
    return <div style={{
        margin:'2%',
        display:"inline-block",
        backgroundColor: props.color,
        borderRadius: "50%",
        aspectRatio: 1,
        width: '20%'

    }}></div>
}

function Board() {
    const [state, setState ] = useState({ right: 4, head: 4, left: 4})
    const socket = useContext(SocketIOContext)
    
    useEffect(() => {
      socket.on("board", (board) => {
        setState(board)
    })
    },[])


    const colors = { 
        0: "white",
        1: "red",
        2: "blue",
        3: "yellow",
        4: "black",
        // 0: <White />,
        // 1: <RedRed />,
        // 2: <RedBlue />,
        // 3: <RedYellow />,
        // 4: <White />,

    }
    return (
        <div style={{
            // display: 'inline-block',
            // verticalAlign: 'top'
        }}>
        <Timer time={60}/>
        <div style={{
            display: 'flex', 
            alignItems: 'center',
            justifyContent: 'center', 
            minHeight: '90vh'
        }}>
            
            <Circle color={colors[state.right]}/>
            <Circle color={colors[state.head]}/>
            <Circle color={colors[state.left]}/>
            {/* {colors[state.right]}
            {colors[state.head]}
            {colors[state.left]} */}
        </div>
        {/* <RedRed />
        <RedBlue />
        <RedYellow />
        <White /> */}
        </div>
    );
}

export default Board;
