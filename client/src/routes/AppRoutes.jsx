import React from 'react'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Home from '../pages/Home'
import Shop from '../pages/Shop' 
import Cart from '../pages/Cart'
import History from '../pages/History'
import Checkout from '../pages/Checkout'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
//layout
import Layout from '../pages/layout/Layout'
import Layoutadmin from '../pages/layout/Layoutadmin'
import LayoutUser  from '../pages/layout/LayoutUser'
//admin
import Dashboard from '../pages/admin/Dashboard'
import Category from '../pages/admin/Category'
import Product from '../pages/admin/Product'
import Homeuser from '../pages/user/Homeuser'
import Manage from '../pages/admin/manage'




const router = createBrowserRouter([
    { 
      path:'/', 
      element:<Layout />,
      children:[

        { index:true , element:<Home/> },
        { path:'shop', element:<Shop/> },
        { path:'cart', element:<Cart/> },
        { path:'history', element:<History/> },
        { path:'checkout', element:<Checkout/> },
        { path:'login',element:<Login/> },
        { path:'register',element:<Register/>}

      ]
    },
    {
        path:'/admin',
        element: <Layoutadmin/>,
        children:[
            { index:true , element : <Dashboard/>},
            { path:'category', element : <Category/>},
            { path:'product', element : <Product/>},
            { path:'manage', element : <Manage/>},

        ]

    },
    {
        path:'/user',
        element: <LayoutUser/>,
        children:[
            { index:true , element : <Homeuser/>},

        ]

    }
])
const AppRoutes = () => {
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default AppRoutes