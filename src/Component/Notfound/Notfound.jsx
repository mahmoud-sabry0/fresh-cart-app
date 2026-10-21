import "./Notfound.module.css";

import React from "react";
import { Link } from "react-router-dom";

export default function Notfound() {
  return (
    <div className="text-center pt-5">
      <h2 className="fw-bold pt-5">404 - Page not found</h2>
      <Link to={"/"} className="btn bg-primary text-light mt-3">
        Back to Home
      </Link>
    </div>
  );
}
