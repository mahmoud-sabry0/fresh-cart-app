import { Outlet } from "react-router-dom";
import Footar from "../Footar/Footar";
import Navbar from "../Navbar/Navbar";
import "./Layout.module.css";
import React from "react";
import { Offline } from "react-detect-offline";

export default function Layout() {
  return (
    <>
      <Navbar />

      <div className=" container">
        <Offline>
          <div className="alert alert-warning mt-5 mb-0 text-center fw-bold">
            You are offline, check your internet connection.
          </div>
        </Offline>
        <Outlet></Outlet>
      </div>

      <Footar />
    </>
  );
}
