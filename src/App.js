import React, { useContext, useEffect } from "react";
import Products from "./Component/Products/Products";
import Home from "./Component/Home/Home";
import Cart from "./Component/Cart/Cart";
import Categorirs from "./Component/Categorirs/Categorirs";
import Brands from "./Component/Brands/Brands";
import Register from "./Component/Register/Register";
import Login from "./Component/Login/Login";
import Notfound from "./Component/Notfound/Notfound";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Component/Layout/Layout";
import CounterContextProvider from "./Component/Context/CounterContext";
import UserContextProvider, {
  UserContext,
} from "./Component/Context/UserContext";
import ProtectedRoute from "./Component/ProtectedRoute/ProtectedRoute";
import ProductInfo from "./Component/ProductInfo/ProductInfo";
import img from './imges/moonlightn_eyhx4uy9.gif'
import BrandsPi from "./Component/BrandsPi/BrandsPi";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "./Redux/Store";
import ShippingAddress from "./Component/ShippingAddress/ShippingAddress";
import AllOrders from "./Component/AllOrders/AllOrders";



export default function App() {

  let routers = createBrowserRouter([
    {
      
      path: "",
      element: <Layout />,
      children: [
        { index: true, element:< ProtectedRoute><Home/></ProtectedRoute> },
        { path: "Cart", element: <ProtectedRoute><Cart /></ProtectedRoute> },
        { path: "Products", element: <ProtectedRoute><Products /></ProtectedRoute> },
        { path: "productinfo/:id", element: <ProtectedRoute><ProductInfo/></ProtectedRoute> },
        { path: "shippingaddress", element: <ProtectedRoute><ShippingAddress/></ProtectedRoute> },
        { path: "allorders", element: <ProtectedRoute><AllOrders/></ProtectedRoute> },
        { path: "Categories", element: <ProtectedRoute><Categorirs /></ProtectedRoute> },
        { path: "Brands", element:<ProtectedRoute> <Brands /></ProtectedRoute> },
       
        { path: "Register", element:<Register/> },
        { path: "Login", element:<Login /> },
        { path: "*", element: <Notfound /> },
      ],
    },
  ]);

  let { setUserToken } = useContext(UserContext);
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      setUserToken(localStorage.getItem("userToken"));
    }
  }, []);

  return (
    <>
    
      <CounterContextProvider>
        <Provider store={store}>
        <RouterProvider router={routers}></RouterProvider>
        <Toaster/>
        
        </Provider>
       
      </CounterContextProvider>
      
    </>
  );

}
