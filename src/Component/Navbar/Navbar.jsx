import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import logo from "../../imges/logo-main.png";

import "./navbar.css";
import { UserContext } from "../Context/UserContext";
import { useSelector } from "react-redux";
import { CartContext } from "../Context/CartContext";

export default function Navbar() {
  const { numOfCartItems} =useContext(CartContext)
  let {count}= useSelector(({counter})=>counter)
  let { userToken, setUserToken } = useContext(UserContext);
  let navigate = useNavigate();
  function logOut() {
    localStorage.removeItem("userToken");
    setUserToken(null);
    navigate("/login");
  }

  return (
    <nav className="navbar-expand-lg bg-body-tertiary d-flex  fixed-top">
      <div className="navbar-brand">
        <img className="imgs " src={logo} alt="fresh cart" />
      </div>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mb-2 mb-lg-0 ">
          {userToken != null ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to={"/"}>
                  {count}
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"Cart"}>
                  Cart
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to={"Products"}>
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"Categories"}>
                  Categories
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"Brands"}>
                  Brands
                </Link>
              </li>
             
            </>
          ) : (
            ""
          )}
        </ul>
        <ul className="navbar-nav ms-auto  mb-lg-0 ">
        <li className="nav-item icon">
            <Link className=" text-decoration-none" to={'/cart'}>
            <i class="bi bi-cart-fill"></i>
            <span>{ numOfCartItems}</span>
            </Link>
         
          </li>
          {userToken != null ? (
            <>
              <li className="nav-item">
                <span onClick={logOut} className="nav-link logOut cursor-pointer">
                  logOut
                </span>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item ">
                <Link className="nav-link" to={"Register"}>
                  Register
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"Login"}>
                  login
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
