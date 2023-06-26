import React from 'react'
import { Routes, Route } from "react-router-dom"
import CreatePost from '../Component/CreatePost'
import Home from '../Component/Home'
import Login from '../Component/Login'
import Signup from '../Component/Signup'

const Allroutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Signup />} ></Route>
            <Route path='/login' element={<Login />} ></Route>
            <Route path='/home' element={<Home />} ></Route>
            <Route path='/create' element={<CreatePost />} ></Route>
        </Routes>
    )
}

export default Allroutes

