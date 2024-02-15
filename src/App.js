import React from 'react'
import Products from './Component/Products/Products'
import Home from './Component/Home/Home'
import Cart from './Component/Cart/Cart'
import Categorirs from './Component/Categorirs/Categorirs'
import Brands from './Component/Brands/Brands'
import Register from './Component/Register/Register'
import Login from './Component/Login/Login'
import Notfound from './Component/Notfound/Notfound'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Component/Layout/Layout'
import CounterContextProvider from './Component/Context/CounterContext'



export default function App() {
  let routers = createBrowserRouter([{
    path:'' ,element:<Layout/>, children: [
      {index: true , element: <Home/>}, 
      {path:'Cart' ,element:<Cart/>},
      {path:'Products' ,element:<Products/>},
      {path:'Categories' ,element:< Categorirs />},
       {path:'Brands' ,element:<Brands/>},
       {path:'Register' ,element:<Register/>},
       {path:'Login' ,element:<Login/>},
       {path:'*' ,element:<Notfound/>},
    ]
  }])
  return  <>
   
  <CounterContextProvider>

  <RouterProvider router={routers}></RouterProvider>
  
  </CounterContextProvider>
    </>
  
}

