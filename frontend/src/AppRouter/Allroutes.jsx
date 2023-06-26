import React from 'react'
import { Routes, Route } from "react-router-dom"

const Allroutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Signup />} ></Route>
            <Route path='/login' element={<Login />} ></Route>
            {/* <Route path='/dashboard' element={<Sidebar/>} ></Route> */}
            <Route path='/dashboard' element={<DashboardBody />} ></Route>
        </Routes>
    )
}

export default Allroutes

