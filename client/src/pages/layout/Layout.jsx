import React from 'react'
import { Outlet } from 'react-router-dom'
import MainNavbar from '../../components/MainNavbar'


const Layout = () => {
  return (
    <div>
        
        <MainNavbar/>
        
        <main>
        <Outlet/>
        </main>
    </div>
  )
}

export default Layout