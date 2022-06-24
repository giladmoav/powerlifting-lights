import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { SocketProvider, AuthProbider } from './context';
import Board from './board';
import Referee from './referee';
import Login from './login'

function App(){
    return (
    <AuthProbider>
    <SocketProvider>
    <BrowserRouter>
    <Routes>
        <Route path="/view" element={ <Board/> }/>
        <Route path="/referee" element={ <Referee side="right" /> }/>
        <Route path="/login" element={ <Login/> }/>
    </Routes>
    </BrowserRouter>
    </SocketProvider>
    </AuthProbider>
    )}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
export default App;