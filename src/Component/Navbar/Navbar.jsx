import React, { useContext } from 'react'
import { Link } from 'react-router-dom';

import logo from '../../imges/logo-main.png'

import  './navbar.css';


export default function Navbar() {
  
 
  return (
    <nav className="navbar-expand-lg bg-body-tertiary d-flex">
      
    

  
    < Link className="navbar-brand">
        <img className='imgs ' src={logo} alt='fresh cart'/>
      </Link>
     
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mb-2 mb-lg-0 ">
        
          <li className="nav-item">
            <Link className="nav-link" to={'/'} >Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={'Cart'}>Cart</Link>
          </li>
          
          <li className="nav-item">
            <Link className="nav-link" to={'Products'}>Products</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={'Categories'}>Categories</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={'Brands'}>Brands</Link>
          </li>
       
        </ul>
        <ul className="navbar-nav ms-auto mb-lg-0  ">
          <li className='nav-item'>
          <i className="bi bi-facebook mb-2 "></i>
          <i className="bi bi-twitter mb-2 " ></i>
          <i className="bi bi-instagram mb-2 "></i>
          <i className="bi bi-youtube mb-2 "></i>
          </li>
        
          <li className="nav-item ">
            <Link className="nav-link" to={'Register'}>Register</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={'Login'}>login</Link>
          </li>
          
          <li className="nav-item">
            <span className="nav-link cursor-pointer" to={'Products'}>logOut</span>
          </li>
          
       
        </ul>
     
      </div>
    
  </nav>
  )
}
