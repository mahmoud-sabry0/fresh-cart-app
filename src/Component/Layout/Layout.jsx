
import { Outlet } from 'react-router-dom';
import Footar from '../Footar/Footar';
import Navbar from '../Navbar/Navbar';
import'./Layout.module.css';

import React from 'react'

export default function Layout() {
  return<>
  <Navbar/>
  <div className=' container'>
  <Outlet></Outlet>
  </div>
  <Footar/>
  </>
}
