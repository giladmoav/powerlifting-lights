import io from 'socket.io-client'
import { SOCKETIO_URL } from './config'
import { createContext } from 'react'

export const SocketIOContext = createContext()
const socket = io.connect(SOCKETIO_URL)

export const SocketProvider = ({ children }) => {
    return (
        <SocketIOContext.Provider value={socket}>
            {children}
        </SocketIOContext.Provider>
    )
}