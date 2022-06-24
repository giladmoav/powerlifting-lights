import io from 'socket.io-client'
import Axios from 'axios'
import { SOCKETIO_URL } from './config'
import { createContext, useState, useEffect } from 'react'

export const SocketIOContext = createContext()
export const AuthContext = createContext()

const token = localStorage.getItem("token")
const socket = io.connect(SOCKETIO_URL, {
    auth: { token }
})
// if (token) {
//     const socket = io.connect(SOCKETIO_URL, {
//         query: { token }
//     })
// } else {
//     const socket = io.connect(SOCKETIO_URL)
// }

export const SocketProvider = ({ children }) => {
    return (
        <SocketIOContext.Provider value={socket}>
            {children}
        </SocketIOContext.Provider>
    )
}

// export const AuthProbider =({ children }) => {
//     const [logged, setLogged] = useState(false)
//     useEffect(() => {
//         const token = localStorage.getItem("token")
//         if (token) {
//             Axios.post("http://localhost:8080/login", {
//                 token: token
//             }).then((res) => {
//             if (res.data.auth) {
//                 setLogged(true)
//             }
//         })
//         }
//     }, []);
//     return (
//         <AuthContext.Provider value={{logged, setLogged}}>
//             {children}
//         </AuthContext.Provider>
//     )
// }