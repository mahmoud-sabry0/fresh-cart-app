import React from "react";
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
import ProtectedRoute from "./Component/ProtectedRoute/ProtectedRoute";
import ProductInfo from "./Component/ProductInfo/ProductInfo";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "./Redux/Store";
import ShippingAddress from "./Component/ShippingAddress/ShippingAddress";
import AllOrders from "./Component/AllOrders/AllOrders";

// created once, outside the component, so it isn't rebuilt on every render
const routers = createBrowserRouter(
  [
    {
      path: "",
      element: <Layout />,
      children: [
        { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
        { path: "cart", element: <ProtectedRoute><Cart /></ProtectedRoute> },
        { path: "products", element: <ProtectedRoute><Products /></ProtectedRoute> },
        { path: "productinfo/:id", element: <ProtectedRoute><ProductInfo /></ProtectedRoute> },
        { path: "shippingaddress/:cartId", element: <ProtectedRoute><ShippingAddress /></ProtectedRoute> },
        { path: "allorders", element: <ProtectedRoute><AllOrders /></ProtectedRoute> },
        { path: "categories", element: <ProtectedRoute><Categorirs /></ProtectedRoute> },
        { path: "brands", element: <ProtectedRoute><Brands /></ProtectedRoute> },
        { path: "register", element: <Register /> },
        { path: "login", element: <Login /> },
        { path: "*", element: <Notfound /> },
      ],
    },
  ],
  // the app is served from /fresh-cart-app on GitHub Pages
  { basename: process.env.PUBLIC_URL || "/" }
);

export default function App() {
  return (
    <CounterContextProvider>
      <Provider store={store}>
        <RouterProvider router={routers} />
        <Toaster />
      </Provider>
    </CounterContextProvider>
  );
}
