import React from 'react'
import { Outlet } from 'react-router-dom'

const LayoutUser = () => {
  return (
    <div>
        
        <h1>Sidebar</h1>
        <h1>Hearder</h1>
        <hr/>
        <Outlet/>
    </div>
  )
}

export default LayoutUser
