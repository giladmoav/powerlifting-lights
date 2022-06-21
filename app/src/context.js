import { createContext, useRef } from "react";
import io from "socket.io-client"

export const UserContext = createContext(null)

const SocketIOContext = createContext({})
export const SocketIOProvider = ({children}) => {
    const socket = useRef(io.connect("ws://localhost:8081"))
    return (
        <SocketIOContext.Provider value={socket}>
            {children}
        </SocketIOContext.Provider>
    )
}
export default SocketIOContext;