import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import logo from "../../imges/logo-main.png";

import "./navbar.css";
import { UserContext } from "../Context/UserContext";
import { CartContext } from "../Context/CartContext";

const pages = [
  { to: "/", label: "Home" },
  { to: "/cart", label: "Cart" },
  { to: "/products", label: "Products" },
  { to: "/categories", label: "Categories" },
  { to: "/brands", label: "Brands" },
  { to: "/allorders", label: "Orders" },
];

export default function Navbar() {
  const { numOfCartItems } = useContext(CartContext);
  let { userToken, setUserToken } = useContext(UserContext);
  let navigate = useNavigate();
  // the mobile menu is toggled in React so it also closes after a link is tapped
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  function logOut() {
    closeMenu();
    localStorage.removeItem("userToken");
    setUserToken(null);
    navigate("/login");
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top shadow-sm">
      <div className="container">
        <Link className="navbar-brand" to={"/"} onClick={closeMenu}>
          <img className="imgs" src={logo} alt="fresh cart" />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-controls="navbarSupportedContent"
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse${menuOpen ? " show" : ""}`}
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav mb-2 mb-lg-0">
            {userToken
              ? pages.map(({ to, label }) => (
                  <li key={to} className="nav-item">
                    <Link className="nav-link" to={to} onClick={closeMenu}>
                      {label}
                    </Link>
                  </li>
                ))
              : null}
          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">
            {userToken ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link cart-link" to={"/cart"} onClick={closeMenu}>
                    <i className="bi bi-cart-fill"></i>
                    <span className="badge rounded-pill bg-primary ms-1">
                      {numOfCartItems}
                    </span>
                  </Link>
                </li>
                <li className="nav-item">
                  <span onClick={logOut} className="nav-link logOut cursor-pointer">
                    logOut
                  </span>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item ">
                  <Link className="nav-link" to={"/register"} onClick={closeMenu}>
                    Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/login"} onClick={closeMenu}>
                    login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
