import { Outlet } from "react-router-dom";
import Footar from "../Footar/Footar";
import Navbar from "../Navbar/Navbar";
import "./Layout.module.css";
import React from "react";
import { Offline, Online } from "react-detect-offline";

export default function Layout() {
  return (
    <>
      <Navbar />

      <div className=" container">

      <Online>Only shown when you're online</Online>
    <Offline><div className="loadeng"><h2 className="fw-bold pt-5">Only shown offline (surprise!)</h2></div></Offline>
        <Outlet></Outlet>
      </div>

      <Footar />
    </>
  );
}
